"""
URL configuration for Srinidhi Printers backend.

Routes:
    /admin/          → Django Admin
    /api/accounts/   → Auth endpoints (login, me)
    /api/            → Catalog endpoints (categories, products)
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
    path('api/', include('catalog.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
