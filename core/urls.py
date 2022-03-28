from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

admin.site.site_header = 'codewithmike Admin Page'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/store/', include('store.urls')),
    path('api/order/', include('order.urls')),
    path('api/payment/', include('payment.urls')),
    path('api/contact/', include('contact.urls')),
    path('api/profile/', include('customer.urls')),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.authtoken')),
    path('', TemplateView.as_view(template_name='index.html')),
    re_path(r'^(?P<path>.*)$', TemplateView.as_view(template_name='index.html')),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
