import os
from django.contrib.auth.models import AbstractUser
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django_countries.fields import CountryField
from io import BytesIO
from PIL import Image
from django.core.files import File
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    email = models.EmailField(_('email address'), unique=True)

class Customer(models.Model):
    PROFESSIONAL = 'P'
    STUDENT = 'S'
    HOBBYIST = 'H'

    CUSTOMER_TYPE = [
        (PROFESSIONAL, 'Professional'),
        (STUDENT, 'Student'),
        (HOBBYIST, 'Hobbyist'),
    ]

    phone = PhoneNumberField(blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    country = CountryField(blank=True, null=True)
    image = models.ImageField(blank=True, null=True)
    customer_type = models.CharField( blank=True, null=True,
        max_length=1, choices=CUSTOMER_TYPE
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

    class Meta:
        ordering = ['user__username']
        permissions = [
            ('view_history', 'Can view history')
        ]

    def save(self, *args, **kwargs):
        if self.image:
            self.image = self.resize(self.image)
        super().save(*args, **kwargs)

    def resize(self, image, size=(640, 480)):
        img = Image.open(image)
        img.thumbnail(size, Image.ANTIALIAS)
        thumb_io = BytesIO()
        img.save(thumb_io, img.format)
        resized = File(thumb_io, name=image.name)
        return resized
