from django.db import models
from customer.models import Customer
from io import BytesIO
from PIL import Image
from django.core.files import File
from django.utils.text import slugify
from django.core.validators import MinValueValidator, MaxValueValidator


class Promotion(models.Model):
    slug = models.SlugField(blank=True, null=True)
    name = models.CharField(max_length=255)
    discount = models.FloatField(
        validators=[MinValueValidator(0.01, MaxValueValidator(1))])

    def __str__(self) -> str:
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name, allow_unicode=True)
        super().save(*args, **kwargs)


class Category(models.Model):
    slug = models.SlugField(blank=True, null=True)
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField()

    class Meta:
        ordering = ['name']
        verbose_name_plural = ('Categories')

    def __str__(self) -> str:
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name, allow_unicode=True)
        super().save(*args, **kwargs)


class Product(models.Model):
    slug = models.SlugField(blank=True, null=True)
    name = models.CharField(max_length=255, unique=True)
    tagline = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(
        max_digits=6, decimal_places=2,
        validators=[MinValueValidator(1)])
    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, related_name='products')
    promotion = models.ForeignKey(
        Promotion, on_delete=models.PROTECT, null=True, blank=True, related_name='products')
    image = models.ImageField(blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    last_update = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name, allow_unicode=True)
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


class Review(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name='reviews')
    customer = models.ForeignKey(
        Customer, on_delete=models.CASCADE, related_name='reviews')
    name = models.CharField(max_length=255)
    description = models.TextField()
    rating = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)])
    last_update = models.DateField(auto_now=True)

    def __str__(self):
        return f'Review for {self.product.name} from {self.customer.user.username}'

