from rest_framework.viewsets import ModelViewSet
from .models import Product, Category, Promotion
from .serializers import ProductSerializer, CategorySerializer, PromotionSerializer

class ProductViewSet(ModelViewSet):
    """
    API endpoint that allows products to be viewed or edited.
    """

    lookup_field = "slug"
    queryset = Product.objects.all().order_by('-last_update')
    serializer_class = ProductSerializer

    def get_serializer_context(self):
        return {'request': self.request}

class CategoryViewSet(ModelViewSet):
    """
    API endpoint that allows product categories to be viewed or edited.
    """

    lookup_field = "slug"
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer

    def get_serializer_context(self):
        return {'request': self.request}

class PromotionViewSet(ModelViewSet):
    """
    API endpoint that allows promotions to be viewed or edited.
    """

    queryset = Promotion.objects.all().order_by('discount')
    serializer_class = PromotionSerializer
