from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedDefaultRouter
from . import views
from django.urls import path, include

router = DefaultRouter()
router.register(r'carts', views.CartViewSet)
router.register(r'wishlist', views.WishListViewSet, basename='wishlist')
router.register(r'checkout', views.OrderViewSet, basename='checkout')

carts_router = NestedDefaultRouter(router, 'carts', lookup='cart')
carts_router.register(r'items', views.CartItemViewSet, basename='cart-items')

wishlist_router = NestedDefaultRouter(router, 'wishlist', lookup='wishlist')
wishlist_router.register(
    r'items', views.WishListItemViewSet, basename='wishlist-items')

urlpatterns = [
    path(r'', include(router.urls)),
    path(r'', include(carts_router.urls)),
    path(r'', include(wishlist_router.urls)),
]
