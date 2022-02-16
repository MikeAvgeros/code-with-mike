from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

admin.site.site_header = 'Code with Mike Admin'

urlpatterns = [
    path(r'admin/', admin.site.urls),
    path(r'', TemplateView.as_view(template_name='index.html')),
    path(r'api/store/', include('store.urls')),
    path(r'api/order/', include('order.urls')),
    path(r'api/payment/', include('payment.urls')),
    path(r'api/profile/', include('customer.urls')),
    path(r'auth/', include('djoser.urls')),
    path(r'auth/', include('djoser.urls.authtoken')),
]
