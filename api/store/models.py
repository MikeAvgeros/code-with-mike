import os
from django.db import models
from customer.models import Customer
from io import BytesIO
from PIL import Image
from django.core.files import File
from django.utils.text import slugify
from django.core.validators import MinValueValidator, MaxValueValidator

class Category(models.Model):
    slug = models.SlugField()
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name_plural = ("Categories")
    
    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name, allow_unicode=True)
        super().save(*args, **kwargs)

class Promotion(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)
    discount = models.FloatField(
        validators = [MinValueValidator(0.01, MaxValueValidator(1))])
    starts_at = models.DateTimeField()
    ends_at = models.DateTimeField()

    def __str__(self):
        return self.name

class Product(models.Model):
    slug = models.SlugField(blank=True, null=True)
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(
        max_digits=6, decimal_places=2, 
        validators=[MinValueValidator(1), MaxValueValidator(9999.99)])
    category = models.ForeignKey(
        Category, null=True, blank=True, on_delete=models.SET_NULL)
    promotion = models.ForeignKey(
        Promotion, null=True, blank=True, on_delete=models.SET_NULL)
    is_featured = models.BooleanField(default=False)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    thumbnail = models.ImageField(upload_to='images/', blank=True, null=True)
    last_update = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name, allow_unicode=True)
        super().save(*args, **kwargs)

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

class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='reviews')
    description = models.TextField()
    rating = models.PositiveSmallIntegerField(null=True, blank=True,
        validators=[MinValueValidator(1), MaxValueValidator(5)])
    date = models.DateField(auto_now=True)
