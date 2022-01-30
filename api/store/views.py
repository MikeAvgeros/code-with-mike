from rest_framework.viewsets import ModelViewSet
from .models import Product, Category, Promotion
from .serializers import ProductSerializer, CategorySerializer, PromotionSerializer

class ProductViewSet(ModelViewSet):
    lookup_field = "slug"
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CategoryViewSet(ModelViewSet):
    lookup_field = "slug"
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class PromotionViewSet(ModelViewSet):
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer
