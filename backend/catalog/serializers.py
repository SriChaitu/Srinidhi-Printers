"""
Serializers for the catalog app.

Provides:
    - CategorySerializer: full category representation
    - ProductListSerializer: lightweight product data for list/grid views
    - ProductDetailSerializer: full product data for the detail modal
"""
from rest_framework import serializers

from .models import Category, Product


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for Category — exposes all fields."""

    class Meta:
        model = Category
        fields = '__all__'


class ProductListSerializer(serializers.ModelSerializer):
    """
    Lightweight product serializer used in list/grid views.

    Nests the category name (read-only) and omits detailed_specifications
    to keep payload small.
    """
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)

    class Meta:
        model = Product
        fields = (
            'id',
            'category',
            'category_name',
            'category_slug',
            'title',
            'price',
            'abstract',
            'image',
            'is_color_printing',
            'is_in_stock',
        )


class ProductDetailSerializer(serializers.ModelSerializer):
    """
    Full product serializer used in the detail modal.

    Includes all fields plus a nested category name for display.
    """
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)

    class Meta:
        model = Product
        fields = (
            'id',
            'category',
            'category_name',
            'category_slug',
            'title',
            'price',
            'abstract',
            'detailed_specifications',
            'image',
            'is_color_printing',
            'is_active',
            'is_in_stock',
            'created_at',
        )
        read_only_fields = ('created_at',)
