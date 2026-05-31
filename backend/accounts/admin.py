"""
Admin registration for the custom User model.
"""
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """
    Custom admin for the User model.
    Adds the is_owner field to the default UserAdmin layout.
    """
    list_display = ('email', 'username', 'is_owner', 'is_staff', 'is_active', 'date_joined')
    list_filter = ('is_owner', 'is_staff', 'is_active')
    search_fields = ('email', 'username', 'first_name', 'last_name')
    ordering = ('-date_joined',)

    # Add is_owner to the fieldsets so it appears in the edit form
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Owner Privileges', {'fields': ('is_owner',)}),
    )
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Owner Privileges', {'fields': ('is_owner',)}),
    )
