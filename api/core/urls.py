from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

admin.site.site_header = 'Code with Mike Admin'

urlpatterns = [
    path(r'admin/', admin.site.urls),
    path(r'api/', include('store.urls')),
    path(r'api/', include('order.urls')),
    path(r'api/', include('customer.urls')),
    path(r'api/', include('djoser.urls')),
    path(r'api/', include('djoser.urls.authtoken')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
