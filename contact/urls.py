from django.urls import path
from .views import ContactView

urlpatterns = [
    path('email', ContactView.as_view()),
]
