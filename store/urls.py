from rest_framework.routers import DefaultRouter
from . import views
from django.urls import path, include

router = DefaultRouter()

router.register('products', views.ProductViewSet)
router.register('categories', views.CategoryViewSet)
router.register('promotions', views.PromotionViewSet)
router.register('reviews', views.ReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
