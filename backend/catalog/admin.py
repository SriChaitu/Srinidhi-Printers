"""
Admin configuration for the catalog app.

Provides a rich admin interface for managing categories and products,
including inline editing of stock and active status.
"""
from django.contrib import admin

from .models import Category, Product


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """Admin for product categories."""
    list_display = ('name', 'slug', 'product_count')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}

    def product_count(self, obj):
        """Display the number of products in this category."""
        return obj.products.count()
    product_count.short_description = 'Products'


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    """
    Rich admin for products.

    Features:
        - list_editable for quick toggling of is_active and is_in_stock
        - Filters by category, active/stock status, and color printing
        - Search by title and abstract
    """
    list_display = (
        'title',
        'category',
        'price',
        'is_active',
        'is_in_stock',
        'is_color_printing',
        'created_at',
    )
    list_filter = (
        'category',
        'is_active',
        'is_in_stock',
        'is_color_printing',
    )
    search_fields = ('title', 'abstract')
    list_editable = ('is_active', 'is_in_stock')
    list_per_page = 25
    readonly_fields = ('created_at',)
    fieldsets = (
        (None, {
            'fields': ('category', 'title', 'price', 'image'),
        }),
        ('Description', {
            'fields': ('abstract', 'detailed_specifications'),
        }),
        ('Status', {
            'fields': ('is_color_printing', 'is_active', 'is_in_stock'),
        }),
        ('Metadata', {
            'fields': ('created_at',),
        }),
    )
