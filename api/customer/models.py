from django.contrib.auth.models import AbstractUser
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django_countries.fields import CountryField

class User(AbstractUser):
    email = models.EmailField(unique=True)

class Customer(models.Model):
    PROFESSIONAL = 'P'
    STUDENT = 'S'
    HOBBYIST = 'H'

    CUSTOMER_TYPE = [
        (PROFESSIONAL, 'Professional'),
        (STUDENT, 'Student'),
        (HOBBYIST, 'Hobbyist'),
    ]

    phone = PhoneNumberField(null=True, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    country = CountryField()
    customer_type = models.CharField(
        max_length=1, choices=CUSTOMER_TYPE, default=STUDENT
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'

    class Meta:
        ordering = ['user__first_name', 'user__last_name']
        permissions = [
            ('view_history', 'Can view history')
        ]
