"""
Models for the catalog app.

Defines the product catalog structure for Srinidhi Printers:
    - Category: groups related products (e.g. "Business Cards", "Banners")
    - Product: individual printable product with pricing, specs, and status flags
"""
from django.db import models


class Category(models.Model):
    """A grouping of related products (e.g. "Business Cards", "Banners")."""

    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)

    class Meta:
        verbose_name_plural = 'categories'
        ordering = ['name']

    def __str__(self):
        return self.name


class Product(models.Model):
    """
    A printable product offered by Srinidhi Printers.

    Key fields:
        - abstract: short teaser shown on the product card (max 300 chars)
        - detailed_specifications: full specs shown in the detail modal
        - image_url: link to the product image (typically Firebase Storage)
        - is_color_printing: whether this product supports color printing
        - is_active: controls visibility in the storefront catalog
        - is_in_stock: controls the "Out of Stock" badge
    """

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='products',
    )
    title = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    abstract = models.TextField(
        max_length=300,
        help_text='Short description shown on the product card (max 300 characters).',
    )
    detailed_specifications = models.TextField(
        blank=True,
        help_text='Full specifications shown in the product detail modal.',
    )
    image = models.ImageField(
        upload_to='products/',
        blank=True,
        null=True,
        help_text='Upload the product image.',
    )
    is_color_printing = models.BooleanField(default=False)
    is_active = models.BooleanField(
        default=True,
        help_text='If unchecked, the product is hidden from the public catalog.',
    )
    is_in_stock = models.BooleanField(
        default=True,
        help_text='If unchecked, the product shows as "Out of Stock".',
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
