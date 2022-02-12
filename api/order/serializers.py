from django.db import transaction
from rest_framework import serializers
from store.models import Product
from customer.models import Customer
from .models import Cart, CartItem, Order, OrderItem

class ShortProductSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='product-detail',
        lookup_field='slug'
    )

    class Meta:
        model = Product
        fields = ['url', 'name', 'price']

class CartItemSerializer(serializers.ModelSerializer):
    product = ShortProductSerializer()
    total_price = serializers.SerializerMethodField()

    def get_total_price(self, **kwargs):
        return self.quantity * self.product.price

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'total_price']

class CartSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    items = CartItemSerializer(many=True, read_only=True)
    grand_total = serializers.SerializerMethodField()

    def get_grand_total(self, **kwargs):
        return sum(
            [item.total_price \
                for item in self.items.all()]
        )

    class Meta:
        model = Cart
        fields = ['id', 'items', 'grand_total']

class OrderItemSerializer(serializers.ModelSerializer):
    product = ShortProductSerializer()

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'total_price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'customer', 'created_at', 'payment_status', 'items']

class CreateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['cart_id']

    def validate_cart_id(self, cart_id):
        if not Cart.objects.filter(pk=cart_id).exists():
            raise serializers.ValidationError('No cart with the given id was found')
        if CartItem.objects.filter(cart_id=cart_id).count() == 0:
            raise serializers.ValidationError('The cart is empty')
        return cart_id

    def save(self, **kwargs):
        with transaction.atomic():
            cart_id = self.validated_data['cart_id']
            customer = Customer.objects.get(user_id=self.context['user_id'])
            order = Order.objects.create(customer=customer)
            cart_items = CartItem.objects.select_related('product').filter(cart_id=cart_id)
            order_items = [
                OrderItem(
                    order=order,
                    product=item.product,
                    quantity=item.quantity,
                    total_price=item.total_price
                ) for item in cart_items
            ]
            OrderItem.objects.bulk_create(order_items) 
            return order

class UpdateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['payment_status']
