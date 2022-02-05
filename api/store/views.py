from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework import status
from store.permissions import IsAdminOrReadOnly
from rest_framework.permissions import IsAuthenticated
from .filters import ProductFilter
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.pagination import PageNumberPagination
from .models import Product, Category, Promotion, Review
from .serializers import (
    ProductSerializer, CategorySerializer, PromotionSerializer, ReviewSerializer)

class ProductViewSet(ModelViewSet):
    """
    API endpoint that allows products to be viewed or edited.
    """

    lookup_field = "slug"
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = ProductFilter
    pagination_class = PageNumberPagination
    permission_classes = [IsAdminOrReadOnly]
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'last_update']

    def get_serializer_context(self):
        return {'request': self.request}

class CategoryViewSet(ModelViewSet):
    """
    API endpoint that allows product categories to be viewed or edited.
    """

    lookup_field = "slug"
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_serializer_context(self):
        return {'request': self.request}

    def delete(self, request, pk):
        category = get_object_or_404(Category, pk=pk)
        if category.products.count() > 0:
            return Response({
                'error': 'Category cannot be deleted as it contains products'
            })
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PromotionViewSet(ModelViewSet):
    """
    API endpoint that allows promotions to be viewed or edited.
    """

    queryset = Promotion.objects.all().order_by('discount')
    serializer_class = PromotionSerializer
    permission_classes = [IsAdminOrReadOnly]

class ReviewViewSet(ModelViewSet):
    """
    API endpoint that allows product reviews to be viewed or edited.
    """

    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes=[IsAuthenticated]
