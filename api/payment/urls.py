from django.urls import path
from .views import StripeCheckoutView

urlpatterns = [
    path(r'checkout-session/', StripeCheckoutView.as_view()),
]