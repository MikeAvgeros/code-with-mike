from django.urls import path
from .views import ContactView

urlpatterns = [
    path(r'email/', ContactView.as_view()),
]
