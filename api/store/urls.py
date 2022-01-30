from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('products', views.ProductViewSet)
router.register('categories', views.CategoryViewSet)
router.register('promotions', views.PromotionViewSet)

urlpatterns = router.urls