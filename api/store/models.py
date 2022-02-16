import os
from django.db import models
from customer.models import Customer
from io import BytesIO
from PIL import Image
from django.core.files import File
from django.utils.text import slugify
from django.core.validators import MinValueValidator, MaxValueValidator

class Category(models.Model):
    slug = models.SlugField(blank=True, null=True)
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
    image = models.ImageField(blank=True, null=True)
    last_update = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name, allow_unicode=True)
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

class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='reviews')
    description = models.TextField()
    rating = models.PositiveSmallIntegerField(default=5,
        validators=[MinValueValidator(1), MaxValueValidator(5)])
    date = models.DateField(auto_now=True)
