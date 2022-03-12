from rest_framework import serializers
from customer.serializers import CustomerSerializer
from .models import Category, Product, Promotion, Review


class ShortCustomerSerializer(CustomerSerializer):
    class Meta(CustomerSerializer.Meta):
        fields = ['user', 'image']


class ShortPromotionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promotion
        fields = ['name', 'slug', 'discount']


class ShortCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name', 'slug']


class ShortProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name', 'slug']


class PromotionSerializer(serializers.ModelSerializer):
    products = serializers.HyperlinkedIdentityField(
        many=True,
        view_name='product-detail',
        lookup_field='slug',
        allow_null=True
    )

    url = serializers.HyperlinkedIdentityField(
        view_name='promotion-detail',
        lookup_field='slug'
    )

    class Meta:
        model = Promotion
        fields = [
            'id',
            'url',
            'slug',
            'name',
            'discount',
            'products'
        ]


class CategorySerializer(serializers.ModelSerializer):
    products = serializers.HyperlinkedIdentityField(
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
            'id',
            'url',
            'slug',
            'name',
            'description',
            'products'
        ]


class ProductSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='product-detail',
        lookup_field='slug'
    )

    promotion = ShortPromotionSerializer(read_only=True)
    category = ShortCategorySerializer(read_only=True)

    class Meta:
        model = Product
        fields = [
            'id',
            'url',
            'slug',
            'name',
            'tagline',
            'description',
            'price',
            'category',
            'promotion',
            'reviews',
            'image',
            'is_featured',
        ]


class ReviewSerializer(serializers.ModelSerializer):
    product = ShortProductSerializer(read_only=True)
    customer = ShortCustomerSerializer(read_only=True)

    class Meta:
        model = Review
        fields = [
            'id',
            'name',
            'description',
            'rating',
            'last_update',
            'is_featured',
            'product',
            'customer',
        ]


class AddReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [
            'id',
            'name',
            'description',
            'rating',
            'last_update',
            'product',
            'customer',
        ]


class UpdateReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [
            'name',
            'description',
            'rating',
            'last_update'
        ]
