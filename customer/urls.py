from rest_framework.routers import DefaultRouter
from . import views
from django.urls import path, include


router = DefaultRouter()
router.register(r'customers', views.CustomerViewSet)


urlpatterns = [
    path(r'', include(router.urls)),
]
