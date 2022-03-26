from django.urls import path
from .views import StripePayment

urlpatterns = [
    path('stripe', StripePayment.as_view()),
]