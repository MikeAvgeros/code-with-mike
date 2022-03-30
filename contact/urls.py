from django.urls import path
from .views import ContactView, ReceiptView

urlpatterns = [
    path('contact', ContactView.as_view()),
    path('receipt', ReceiptView.as_view()),
]
