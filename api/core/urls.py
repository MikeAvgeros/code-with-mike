from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView

admin.site.site_header = 'Code with Mike Admin'

urlpatterns = [
    path(r'admin/', admin.site.urls),
    path(r'api/', include('store.urls')),
    path(r'api/', include('order.urls')),
    path(r'api/', include('payment.urls')),
    path(r'api/', include('customer.urls')),
    path(r'auth/', include('djoser.urls')),
    path(r'auth/', include('djoser.urls.authtoken')),
    re_path(".*", TemplateView.as_view(template_name="index.html")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
