from django.urls import path
from .views import StripeCheckoutView

urlpatterns = [
    path(r'checkout/', StripeCheckoutView.as_view()),
]