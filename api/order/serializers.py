from django.db import transaction
from rest_framework import serializers
from customer.serializers import UserSerializer
from store.models import Product
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
    item = ShortProductSerializer()

    class Meta:
        model = CartItem
        fields = ['id', 'item', 'quantity']

class OrderItemSerializer(serializers.ModelSerializer):
    item = ShortProductSerializer()

    class Meta:
        model = OrderItem
        fields = ['id', 'item', 'quantity']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'items', 'created_at']

class OrderSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'items', 
        'created_at', 'payment_status']

class CreateOrderSerializer(serializers.Serializer):
    cart_id = serializers.CharField()

    def validate_cart_id(self, cart_id):
        if not Cart.objects.filter(pk=cart_id).exists():
            raise serializers.ValidationError(
                'No cart with the given id was found')
        if CartItem.objects.filter(cart_id=cart_id).count() == 0:
            raise serializers.ValidationError('The cart is empty')
        return cart_id

    def save(self, **kwargs):
        with transaction.atomic():
            cart_id = self.validated_data['cart_id']
            order = Order.objects.create(user_id=self.context['id'])
            cart_items = CartItem.objects\
                .select_related('item').filter(cart_id=cart_id)
            order_items = [
                OrderItem(
                    order=order,
                    item=cart_item.item,
                    quantity=cart_item.quantity,
                ) for cart_item in cart_items
            ]
            OrderItem.objects.bulk_create(order_items)
            Cart.objects.filter(pk=cart_id).delete()
            return order

class UpdateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['payment_status']
