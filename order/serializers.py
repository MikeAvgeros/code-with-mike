from django.db import transaction
from rest_framework import serializers
from store.models import Product
from .models import Cart, CartItem, Order, OrderItem, WishList, WishListItem


class ShortProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['slug', 'name', 'image', 'price']


class CartItemSerializer(serializers.ModelSerializer):
    item = ShortProductSerializer()
    total_price = serializers.SerializerMethodField()

    def get_total_price(self, cart_item: CartItem):
        return cart_item.quantity * cart_item.item.price

    class Meta:
        model = CartItem
        fields = ['id', 'item', 'quantity', 'total_price']


class AddCartItemSerializer(serializers.ModelSerializer):
    item_id = serializers.IntegerField()

    def validate_item_id(self, value):
        if not Product.objects.filter(pk=value).exists():
            raise serializers.ValidationError(
                'No product with the given id was found.')
        return value

    def save(self, **kwargs):
        cart_id = self.context['cart_id']
        item_id = self.validated_data['item_id']
        quantity = self.validated_data['quantity']

        try:
            cart_item = CartItem.objects.get(
                cart_id=cart_id, item_id=item_id)
            cart_item.quantity += quantity
            cart_item.save()
            self.instance = cart_item
        except CartItem.DoesNotExist:
            self.instance = CartItem.objects.create(
                cart_id=cart_id, **self.validated_data)
        return self.instance

    class Meta:
        model = CartItem
        fields = ['id', 'item_id', 'quantity']


class UpdateCartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['quantity']


class WishListItemSerializer(serializers.ModelSerializer):
    item = ShortProductSerializer()

    class Meta:
        model = WishListItem
        fields = ['id', 'item']


class AddWishListItemSerializer(serializers.ModelSerializer):
    item_id = serializers.IntegerField()

    def validate_item_id(self, value):
        if not Product.objects.filter(pk=value).exists():
            raise serializers.ValidationError(
                'No product with the given id was found.')
        return value

    def save(self, **kwargs):
        wishlist_id = self.context['wishlist_id']
        item_id = self.validated_data['item_id']

        try:
            wishlist_item = WishListItem.objects.get(
                wishlist_id=wishlist_id, item_id=item_id)
            wishlist_item.save()
            self.instance = wishlist_item
        except WishListItem.DoesNotExist:
            self.instance = WishListItem.objects.create(
                wishlist_id=wishlist_id, **self.validated_data)
        return self.instance

    class Meta:
        model = WishListItem
        fields = ['id', 'item_id']


class OrderItemSerializer(serializers.ModelSerializer):
    item = ShortProductSerializer()
    total_price = serializers.SerializerMethodField()

    def get_total_price(self, order_item: OrderItem):
        return order_item.quantity * order_item.item.price

    class Meta:
        model = OrderItem
        fields = ['id', 'item', 'quantity', 'total_price']


class CartSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()

    def get_total_price(self, cart):
        return sum([item.quantity * item.item.price for item in cart.items.all()])

    class Meta:
        model = Cart
        fields = ['id', 'items', 'total_price']


class WishListSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    items = WishListItemSerializer(many=True, read_only=True)

    class Meta:
        model = WishList
        fields = ['id', 'customer', 'items']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    total_price = serializers.SerializerMethodField()

    def get_total_price(self, order):
        return sum([item.quantity * item.item.price for item in order.items.all()])

    class Meta:
        model = Order
        fields = ['id', 'customer', 'items', 'created_at',
                'total_price', 'payment_status']


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
            order = Order.objects.create(customer_id=self.context['id'])
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
