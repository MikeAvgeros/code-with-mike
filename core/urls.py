from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

admin.site.site_header = 'codewithmike Admin Page'

urlpatterns = [
    path(r'admin/', admin.site.urls),
    path(r'api/store/', include('store.urls')),
    path(r'api/order/', include('order.urls')),
    path(r'api/payment/', include('payment.urls')),
    path(r'api/contact/', include('contact.urls')),
    path(r'api/profile/', include('customer.urls')),
    path(r'api/auth/', include('djoser.urls')),
    path(r'api/auth/', include('djoser.urls.authtoken')),
    path(r'/*', TemplateView.as_view(template_name='index.html'))
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
