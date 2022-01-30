from rest_framework import serializers

from .models import Category, Product, Promotion

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "description",
            "price",
            "promotion",
            "image",
            "is_featured",
            "get_absolute_url",
            "get_image",
            "get_thumbnail",
        )

class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)

    class Meta:
        model = Category
        fields = (
            "id",
            "name",
            "description",
            "get_absolute_url",
            "products",
        )

class PromotionSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)

    class Meta:
        model = Promotion
        fields = (
            "id",
            "name",
            "description",
            "products",
        )