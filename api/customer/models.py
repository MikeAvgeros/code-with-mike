import os
from django.contrib.auth.models import AbstractUser
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django_countries.fields import CountryField
from io import BytesIO
from PIL import Image
from django.core.files import File

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
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    thumbnail = models.ImageField(upload_to='images/', blank=True, null=True)
    customer_type = models.CharField(
        max_length=1, choices=CUSTOMER_TYPE, default=STUDENT
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

    class Meta:
        ordering = ['user__first_name', 'user__last_name']
        permissions = [
            ('view_history', 'Can view history')
        ]

    def get_image(self):
        if self.image:
            return os.environ.get('DOMAIN') + self.image.url
        return ''
    
    def get_thumbnail(self):
        if self.thumbnail:
            return os.environ.get('DOMAIN') + self.thumbnail.url
        else:
            if self.image:
                self.thumbnail = self.make_thumbnail(self.image)
                self.save()

                return os.environ.get('DOMAIN') + self.thumbnail.url
            else:
                return ''

    def make_thumbnail(self, image, size=(300, 200)):
        img = Image.open(image)
        img.thumbnail(size, Image.ANTIALIAS)
        img_file = BytesIO()
        img.save(img_file, img.format)

        thumbnail = File(img_file, name=image.name)

        return thumbnail
