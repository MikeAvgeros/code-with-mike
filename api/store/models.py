import os
from io import BytesIO
from PIL import Image
from django.core.files import File
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)
    slug = models.SlugField(max_length=255, unique=True)

    class Meta:
        ordering = ('name',)
    
    def __str__(self):
        return self.name
    
    def get_absolute_url(self):
        return f'/{self.slug}/'

class Promotion(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    discount = models.FloatField(validators = [MinValueValidator(0.01, MaxValueValidator(1))])
    starts_at = models.DateTimeField()
    ends_at = models.DateTimeField()

    class Meta:
        ordering = ('discount',)

    def __str__(self):
        return self.name

class Product(models.Model):
    category = models.ForeignKey(Category, related_name='products', on_delete=models.PROTECT)
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField()
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(
        max_digits=6, decimal_places=2, validators=[MinValueValidator(1), MaxValueValidator(9999)])
    promotion = models.ForeignKey(Promotion, null=True, related_name='products', on_delete=models.PROTECT)
    is_featured = models.BooleanField(default=False)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    thumbnail = models.ImageField(upload_to='images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    last_update = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-last_update',)
    
    def __str__(self):
        return self.name
    
    def get_absolute_url(self):
        return f'/{self.slug}/'

    def get_image(self):
        if self.image:
            return 'http://localhost:8000' + self.image.url
        return ''
    
    def get_thumbnail(self):
        if self.thumbnail:
            return 'http://localhost:8000' + self.thumbnail.url
        else:
            if self.image:
                self.thumbnail = self.make_thumbnail(self.image)
                self.save()

                return 'http://localhost:8000' + self.thumbnail.url
            else:
                return ''
    
    def make_thumbnail(self, image, size=(300, 200)):
        img = Image.open(image)
        img.convert('RGB')
        img.thumbnail(size)

        thumb_io = BytesIO()
        img.save(thumb_io, 'JPEG', quality=85)

        thumbnail = File(thumb_io, name=image.name)

        return thumbnail
