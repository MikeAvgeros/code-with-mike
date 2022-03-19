from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedDefaultRouter
from . import views
from django.urls import path, include

router = DefaultRouter()

router.register('carts', views.CartViewSet)
router.register('wishlist', views.WishListViewSet, basename='wishlist')
router.register('checkout', views.OrderViewSet, basename='checkout')

carts_router = NestedDefaultRouter(router, 'carts', lookup='cart')
carts_router.register('items', views.CartItemViewSet, basename='cart-items')

wishlist_router = NestedDefaultRouter(router, 'wishlist', lookup='wishlist')
wishlist_router.register(
    'items', views.WishListItemViewSet, basename='wishlist-items')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(carts_router.urls)),
    path('', include(wishlist_router.urls)),
]
