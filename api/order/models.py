from django.db import models
from uuid import uuid4
from store.models import Product
from customer.models import User
from django.core.validators import MinValueValidator

class Cart(models.Model):
    id = models.CharField(primary_key=True, 
    max_length=250, default=uuid4)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Cart {self.id}'

class WishList(models.Model):
    user = models.ForeignKey(User,
    on_delete=models.PROTECT, related_name='wishlist')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = ("Wish list")

    def __str__(self):
        return f'Wishlist {self.id} from {self.user.username}'

class Order(models.Model):
    PAYMENT_PENDING = 'P'
    PAYMENT_SUCCESS = 'S'
    PAYMENT_FAILED = 'F'
    PAYMENT_STATUS = [
        (PAYMENT_PENDING, 'Pending'),
        (PAYMENT_SUCCESS, 'Success'),
        (PAYMENT_FAILED, 'Failed')
    ]

    created_at = models.DateTimeField(auto_now_add=True)
    payment_status = models.CharField(
        max_length=1, choices=PAYMENT_STATUS, 
        default=PAYMENT_PENDING
    )
    user = models.ForeignKey(User,
    on_delete=models.PROTECT, related_name='orders')

    class Meta:
        permissions = [
            ('cancel_order', 'Can cancel order')
        ]

    def __str__(self):
        return f'Order {self.id} from {self.user.username}'

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, 
    blank=True, null=True, related_name='items')
    item = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveSmallIntegerField(default=1,
            validators=[MinValueValidator(1)])

    class Meta:
        unique_together = [['cart', 'item']]

    def __str__(self):
        return f'{self.quantity} {self.item}'

class WishListItem(models.Model):
    wishlist = models.ForeignKey(WishList, on_delete=models.CASCADE, 
    blank=True, null=True, related_name='items')
    item = models.ForeignKey(Product, on_delete=models.CASCADE)

    class Meta:
        verbose_name = ("Wish list item")

    def __str__(self):
        return f'{self.item}'

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, 
    blank=True, null=True, related_name='items')
    item = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveSmallIntegerField(default=1)

    def __str__(self):
        return f'{self.quantity} items of {self.item}'

    class Meta:
        unique_together = [['order', 'item']]
