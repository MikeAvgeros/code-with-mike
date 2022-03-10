from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Customer, User
from order.models import WishList

@receiver(post_save, sender=User)
def create_customer_from_user(sender, **kwargs):
    if kwargs['created']:
        Customer.objects.create(user=kwargs['instance'])

@receiver(post_save, sender=Customer)
def create_wishlist_from_customer(sender, **kwargs):
    if kwargs['created']:
        WishList.objects.create(customer=kwargs['instance'])
