from rest_framework.routers import DefaultRouter
from . import views
from django.urls import path, include

router = DefaultRouter()

router.register(r'products', views.ProductViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'promotions', views.PromotionViewSet)
router.register(r'reviews', views.ReviewViewSet)

urlpatterns = [
    path(r'', include(router.urls)),
]
