from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.mixins import (
    CreateModelMixin, RetrieveModelMixin, DestroyModelMixin)
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from .models import Cart, CartItem, Order, OrderItem
from customer.models import User
from .serializers import (
    CartSerializer, CartItemSerializer, 
    OrderSerializer, UpdateOrderSerializer, 
    CreateOrderSerializer, OrderItemSerializer)

class CartViewSet(
    CreateModelMixin, RetrieveModelMixin, 
    DestroyModelMixin, GenericViewSet):
    queryset = Cart.objects.prefetch_related('items__item').all()
    serializer_class = CartSerializer

class OrderViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 
                        'delete', 'head', 'options']

    def get_permissions(self):
        if self.request.method in ['PATCH', 'DELETE']:
            return [IsAdminUser()]
        return [IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Order.objects.all()
        else:
            user_id = User.objects.only('id')\
                .get(id=self.request.user.id)
            return Order.objects.filter(user_id=user_id)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateOrderSerializer
        elif self.request.method == 'PATCH':
            return UpdateOrderSerializer
        else:
            return OrderSerializer

    def create(self, request, *args, **kwargs):
        serializer = CreateOrderSerializer(
            data = request.data,
            context={'id': self.request.user.id})
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        serializer = OrderSerializer(order, 
        context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class CartItemViewSet(ModelViewSet):
    serializer_class = CartItemSerializer

    def get_queryset(self):
        return CartItem.objects\
            .filter(cart_id=self.kwargs['cart_pk'])\
            .select_related('items')

class OrderItemViewSet(ModelViewSet):
    serializer_class = OrderItemSerializer

    def get_queryset(self):
        return OrderItem.objects\
            .filter(order_id=self.kwargs['order_pk'])\
            .select_related('items')