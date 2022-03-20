from django.urls import path
from .views import StripeCheckout

urlpatterns = [
    path('stripe/checkout', StripeCheckout.as_view()),
]