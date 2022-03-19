from django.urls import path
from .views import StripeCheckoutView

urlpatterns = [
    path('checkout/', StripeCheckoutView.as_view()),
]