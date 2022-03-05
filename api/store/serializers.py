from rest_framework import serializers
from .models import Category, Product, Promotion, Review
from customer.serializers import CustomerSerializer

class CategoryNameSerializer(serializers.ModelSerializer):
    class Meta:
        model= Category
        fields = ['name']

class PromotionNameSerializer(serializers.ModelSerializer):
    class Meta:
        model= Promotion
        fields = ['name']

class ProductSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='product-detail',
        lookup_field='slug'
    )
    category = CategoryNameSerializer(read_only=True)
    promotion = PromotionNameSerializer(read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "url",
            "slug",
            "name",
            "tag",
            "description",
            "category",
            "price",
            "promotion",
            "is_featured",
            "image"
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
            "slug",
            "name",
            "description",
            "product_set"
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
            "product_set"
        ]

class ShortProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name', 'slug']

class ReviewSerializer(serializers.ModelSerializer):
    product = ShortProductSerializer(read_only=True)
    customer = CustomerSerializer(read_only=True)

    class Meta:
        model = Review
        read_only_fields = ('on_site',)
        fields = [
            'id',
            'date',
            'description',
            'product',
            'customer',
            'rating',
            'on_site',
        ]
