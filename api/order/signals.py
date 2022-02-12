from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Order, Cart

@receiver(post_save, sender=Order)
def delete_cart(sender, **kwargs):
    if kwargs['created']:
        order = kwargs['instance']
        cart_id = order.cart_id
        Cart.objects.filter(pk=cart_id).delete()