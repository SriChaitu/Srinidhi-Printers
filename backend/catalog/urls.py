"""
URL configuration for the catalog app.

Uses DRF's DefaultRouter to auto-generate RESTful routes:
    /api/categories/            → CategoryViewSet (list, create)
    /api/categories/{slug}/     → CategoryViewSet (retrieve, update, destroy)
    /api/products/              → ProductViewSet  (list, create)
    /api/products/{pk}/         → ProductViewSet  (retrieve, update, destroy)
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import CategoryViewSet, ProductViewSet

app_name = 'catalog'

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'products', ProductViewSet, basename='product')

urlpatterns = [
    path('', include(router.urls)),
]
