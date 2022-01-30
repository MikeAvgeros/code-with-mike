from rest_framework import serializers
from .models import Category, Product, Promotion

class ProductSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='product-detail',
        lookup_field='slug'
    )

    class Meta:
        model = Product
        fields = [
            "id",
            "url",
            "name",
            "description",
            "category",
            "price",
            "promotion",
            "is_featured",
            "image",
            "get_image",
            "get_thumbnail",
        ]

class CategorySerializer(serializers.ModelSerializer):
    product_set = serializers.HyperlinkedIdentityField(
        many=True,
        view_name='product-detail',
        lookup_field='slug',
        allow_null=True
    )

    url = serializers.HyperlinkedIdentityField(
        view_name='category-detail',
        lookup_field='slug'
    )

    class Meta:
        model = Category
        fields = [
            "id",
            "url",
            "name",
            "description",
            "product_set",
        ]

class PromotionSerializer(serializers.ModelSerializer):
    product_set = serializers.HyperlinkedIdentityField(
        many=True,
        view_name='product-detail',
        lookup_field='pk',
        allow_null=True
    )

    url = serializers.HyperlinkedIdentityField(
        view_name='category-detail',
        lookup_field='pk'
    )

    class Meta:
        model = Promotion
        fields = [
            "id",
            "url",
            "name",
            "description",
            "starts_at",
            "ends_at",
            "product_set",
        ]
