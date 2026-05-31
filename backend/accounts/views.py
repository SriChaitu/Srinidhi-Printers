"""
Views for the accounts app.

Endpoints:
    POST /api/accounts/login/   → JWT token pair + user info
    GET  /api/accounts/me/      → Current authenticated user info
"""
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import CustomTokenObtainPairSerializer, UserSerializer


class LoginView(TokenObtainPairView):
    """
    Custom login endpoint.

    Accepts username/password credentials and returns JWT access & refresh
    tokens along with the user's profile data (including is_owner).
    """
    serializer_class = CustomTokenObtainPairSerializer


class MeView(APIView):
    """
    Returns the profile of the currently authenticated user.

    Requires a valid JWT Bearer token in the Authorization header.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
