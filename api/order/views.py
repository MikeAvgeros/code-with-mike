from rest_framework.mixins import (
    CreateModelMixin, RetrieveModelMixin, DestroyModelMixin)
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer

class CartViewSet(
    CreateModelMixin, RetrieveModelMixin, DestroyModelMixin, GenericViewSet):
    queryset = Cart.objects.prefetch_related('items__product').all()
    serializer_class = CartSerializer

class CartItemViewSet(ModelViewSet):
    serializer_class = CartItemSerializer

    def get_queryset(self):
        return CartItem.objects.filter(cart_id=self.kwargs['cart_pk']).select_related('product')

