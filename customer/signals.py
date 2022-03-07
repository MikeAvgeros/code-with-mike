from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Customer, User

@receiver(post_save, sender=User)
def create_customer_from_user(sender, **kwargs):
    if kwargs['created']:
        Customer.objects.create(user=kwargs['instance'])
