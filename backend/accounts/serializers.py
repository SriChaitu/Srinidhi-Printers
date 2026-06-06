"""
Serializers for the accounts app.

Provides:
    - UserSerializer: read-only user representation
    - CustomTokenObtainPairSerializer: JWT login that includes user info
"""
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User


class UserSerializer(serializers.ModelSerializer):
    """Public-facing user representation."""

    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'is_owner', 'is_superuser')
        read_only_fields = fields


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Extends the default JWT login to embed `is_owner` in the token claims
    and return user info alongside the tokens in the response body.
    """

    @classmethod
    def get_token(cls, user):
        """Add custom claims to the JWT payload."""
        token = super().get_token(user)
        token['is_owner'] = user.is_owner
        token['email'] = user.email or ''
        return token

    def validate(self, attrs):
        """Include user data in the response alongside access/refresh tokens."""
        data = super().validate(attrs)
        data['user'] = UserSerializer(self.user).data
        return data
