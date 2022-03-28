from django.contrib.auth.models import AbstractUser
from django.db import models
from io import BytesIO
from PIL import Image
from django.core.files import File
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    email = models.EmailField(_('email address'), unique=True)


class Customer(models.Model):
    CUSTOMER_TYPE = [
        ('Professional', 'Professional'),
        ('Student', 'Student'),
        ('Hobbyist', 'Hobbyist'),
    ]

    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=255, blank=True, null=True)
    birth_date = models.CharField(max_length=255, blank=True, null=True)
    country = models.CharField(max_length=255, blank=True, null=True)
    image = models.ImageField(blank=True, null=True)
    customer_type = models.CharField(blank=True, null=True,
                                     max_length=12, choices=CUSTOMER_TYPE
                                     )
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
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

    def resize(self, image, size=(512, 512)):
        img = Image.open(image)
        img.thumbnail(size, Image.ANTIALIAS)
        thumb_io = BytesIO()
        img.save(thumb_io, img.format)
        resized = File(thumb_io, name=image.name)
        return resized
