"""
URL patterns for the accounts app.

    POST /api/accounts/login/          → JWT login (access + refresh + user info)
    POST /api/accounts/token/refresh/  → Refresh an expired access token
    GET  /api/accounts/me/             → Current user profile
"""
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import LoginView, MeView

app_name = 'accounts'

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', MeView.as_view(), name='me'),
]
