from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)
from .views import (
    home_view,
    user_view,
    register_view,
    posts_view
)

urlpatterns = [
    path('', home_view, name='home'),
    path('api/login', TokenObtainPairView.as_view(), name='api-login'),
    path('api/register', register_view, name='api-register'),
    path('api/user', user_view, name='api-user'),
    path('api/posts', posts_view, name='api-posts')
]
