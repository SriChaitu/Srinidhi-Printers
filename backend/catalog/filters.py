"""
Filters for the catalog app.

Provides django-filter FilterSets for the Product model so the frontend
can filter by category, color printing, active/stock status, etc.
"""
import django_filters

from .models import Product


class ProductFilter(django_filters.FilterSet):
    """
    FilterSet for Product.

    Supported query parameters:
        ?category__name=Business Cards      (exact match)
        ?category__slug=business-cards       (exact match)
        ?is_color_printing=true              (boolean)
        ?is_active=true                      (boolean)
        ?is_in_stock=true                    (boolean)
    """
    category__name = django_filters.CharFilter(
        field_name='category__name',
        lookup_expr='exact',
        label='Category name (exact)',
    )
    category__slug = django_filters.CharFilter(
        field_name='category__slug',
        lookup_expr='exact',
        label='Category slug (exact)',
    )
    is_color_printing = django_filters.BooleanFilter(
        field_name='is_color_printing',
        label='Color printing',
    )
    is_active = django_filters.BooleanFilter(
        field_name='is_active',
        label='Active',
    )
    is_in_stock = django_filters.BooleanFilter(
        field_name='is_in_stock',
        label='In stock',
    )

    class Meta:
        model = Product
        fields = [
            'category__name',
            'category__slug',
            'is_color_printing',
            'is_active',
            'is_in_stock',
        ]
