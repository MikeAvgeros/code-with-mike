from django.db import models
from uuid import uuid4
from store.models import Product
from customer.models import Customer

class Cart(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4)
    created_at = models.DateTimeField(auto_now_add=True)

class CartItem(models.Model):
    cart = models.ForeignKey(
        Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveSmallIntegerField(default=1)

    def __str__(self):
        return self.product.name

    class Meta:
        unique_together = [['cart', 'product']]

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
        max_length=1, choices=PAYMENT_STATUS, default=PAYMENT_PENDING
    )
    customer = models.ForeignKey(
        Customer, related_name='orders', on_delete=models.PROTECT)

    def __str__(self):
        return f'Order #{self.id} for {self.customer}'

    class Meta:
        permissions = [
            ('cancel_order', 'Can cancel order')
        ]

class OrderItem(models.Model):
    order = models.ForeignKey(
        Order, on_delete=models.PROTECT, related_name='items')
    product = models.ForeignKey(
        Product, on_delete=models.PROTECT)
    quantity = models.PositiveSmallIntegerField(default=1)
    total_price = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return self.product.name