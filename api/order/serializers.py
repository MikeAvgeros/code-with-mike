from rest_framework import serializers
from store.models import Product
from .models import Cart, CartItem, Order, OrderItem

class ShortProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['url', 'name', 'price']

class CartItemSerializer(serializers.ModelSerializer):
    product = ShortProductSerializer()
    total_price = serializers.SerializerMethodField()

    def get_total_price(self, cart_item):
        return cart_item.quantity * cart_item.product.price

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'total_price']

class CartSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    items = CartItemSerializer(many=True, read_only=True)
    grand_total = serializers.SerializerMethodField()

    def get_grand_total(self, cart):
        return sum(
            [item.quantity * item.product.price for item in cart.items.all()])

    class Meta:
        model = Cart
        fields = ['id', 'items', 'grand_total']

class OrderItemSerializer(serializers.ModelSerializer):
    product = ShortProductSerializer()
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'price', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'created_at', 'payment_status']

class UpdateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['payment_status']

class CreateOrderSerializer(serializers.Serializer):
    cart_id = serializers.UUIDField()

    def validate_cart_id(self, cart_id):
        if not Cart.objects.filter(pk=cart_id).exists():
            raise serializers.ValidationError('There is no cart with the given id')
        if CartItem.objects.filter(cart_id=cart_id).count() == 0:
            raise serializers.ValidationError('The cart is empty')
        return cart_id