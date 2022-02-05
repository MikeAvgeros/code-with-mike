from rest_framework_nested import routers
from . import views
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'products', views.ProductViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'promotions', views.PromotionViewSet)
router.register(r'reviews', views.ReviewViewSet)

products_router = routers.NestedDefaultRouter(router, 'products', lookup='product')
products_router.register('reviews', views.ReviewViewSet, basename='product-reviews')

urlpatterns = [
    path(r'', include(router.urls)),
    path(r'', include(products_router.urls))
]