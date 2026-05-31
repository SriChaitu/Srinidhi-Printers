"""
Custom User model for Srinidhi Printers.

Extends Django's AbstractUser with an `is_owner` flag that is automatically
set to True when the user's email matches any entry in settings.OWNER_EMAILS.
"""
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db import models


class User(AbstractUser):
    """
    Custom user with owner privileges.

    The `is_owner` flag controls access to admin/management features such as
    creating, updating, and deleting products and categories.
    """
    is_owner = models.BooleanField(
        default=False,
        help_text='Designates whether this user has owner privileges for the storefront.',
    )

    def save(self, *args, **kwargs):
        """Auto-promote user to owner if their email is in OWNER_EMAILS."""
        if self.email and self.email.lower() in [
            e.lower() for e in getattr(settings, 'OWNER_EMAILS', [])
        ]:
            self.is_owner = True
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email or self.username

    class Meta:
        ordering = ['-date_joined']
