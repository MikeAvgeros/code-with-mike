from django.contrib import admin
from .models import Category, Product, Promotion, Review


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'category']


admin.site.register(Category)
admin.site.register(Promotion)
admin.site.register(Review)
