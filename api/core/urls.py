from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

admin.site.site_header = 'Code with Mike Admin'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('customer.urls')),
    path('api/', include('store.urls')),
    path('api/', include('order.urls')),
    path('api/', include('djoser.urls')),
    path('api/', include('djoser.urls.jwt')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
