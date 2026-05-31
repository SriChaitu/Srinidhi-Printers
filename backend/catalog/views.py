"""
Views for the catalog app.

Provides ModelViewSets for Category and Product with:
    - Read-only access for unauthenticated/non-owner users
    - Full CRUD for owners
    - Automatic filtering of inactive products for non-owners
"""
from rest_framework import viewsets, permissions

from .models import Category, Product
from .serializers import CategorySerializer, ProductListSerializer, ProductDetailSerializer
from .filters import ProductFilter


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission: read-only for everyone, write only for owners.

    - Safe methods (GET, HEAD, OPTIONS) are always allowed.
    - Unsafe methods (POST, PUT, PATCH, DELETE) require the user to be
      authenticated AND have is_owner=True.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return (
            request.user
            and request.user.is_authenticated
            and request.user.is_owner
        )


class CategoryViewSet(viewsets.ModelViewSet):
    """
    CRUD viewset for product categories.

    GET:    Anyone can list/retrieve categories.
    POST:   Only owners can create categories.
    PUT:    Only owners can update categories.
    DELETE: Only owners can delete categories.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsOwnerOrReadOnly]
    lookup_field = 'slug'


class ProductViewSet(viewsets.ModelViewSet):
    """
    CRUD viewset for products.

    GET (list):     Non-owners see only active products.
                    Owners see all products (including inactive).
    GET (retrieve): Same visibility logic as list.
    POST/PUT/DELETE: Only owners.

    Supports filtering via ProductFilter (category, color, stock, active).
    Uses ProductListSerializer for list and ProductDetailSerializer for retrieve.
    """
    permission_classes = [IsOwnerOrReadOnly]
    filterset_class = ProductFilter
    search_fields = ['title', 'abstract']
    ordering_fields = ['price', 'created_at', 'title']

    def get_queryset(self):
        """
        Return the product queryset based on the user's role.

        Owners see ALL products (including inactive) so they can manage them.
        Everyone else sees only active products.
        """
        qs = Product.objects.select_related('category')

        # Owners see everything; non-owners see only active products
        if self.request.user.is_authenticated and self.request.user.is_owner:
            return qs
        return qs.filter(is_active=True)

    def get_serializer_class(self):
        """
        Use a lightweight serializer for list, full serializer for detail.

        This keeps list responses fast by excluding detailed_specifications.
        """
        if self.action == 'retrieve':
            return ProductDetailSerializer
        return ProductListSerializer
