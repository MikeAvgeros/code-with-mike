from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework import status
from store.permissions import IsAdminOrReadOnly
from rest_framework.permissions import IsAuthenticated, AllowAny
from .filters import ProductFilter
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Product, Category, Promotion, Review
from .serializers import (
    AddReviewSerializer, ProductSerializer, CategorySerializer, 
    PromotionSerializer, ReviewSerializer, UpdateReviewSerializer)


class ProductViewSet(ModelViewSet):
    lookup_field = "slug"
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = ProductFilter
    permission_classes = [IsAdminOrReadOnly]
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'last_update']

    def get_serializer_context(self):
        return {'request': self.request}


class CategoryViewSet(ModelViewSet):
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
                'error': 'Category cannot be deleted as it contains products.'
            })
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PromotionViewSet(ModelViewSet):
    lookup_field = "slug"
    queryset = Promotion.objects.all().order_by('discount')
    serializer_class = PromotionSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_serializer_context(self):
        return {'request': self.request}


class ReviewViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch',
                        'delete', 'head', 'options']

    queryset = Review.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AddReviewSerializer
        elif self.request.method == 'PATCH':
            return UpdateReviewSerializer
        return ReviewSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAuthenticated()]
