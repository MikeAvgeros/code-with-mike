from rest_framework.routers import DefaultRouter
from . import views
from django.urls import path, include

router = DefaultRouter()

router.register('customers', views.CustomerViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
