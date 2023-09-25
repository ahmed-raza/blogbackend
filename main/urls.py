from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)
from .views import (
    home_view,
    user_view,
    update_user_view,
    register_view,
    posts_view
)

urlpatterns = [
    path('', home_view, name='home'),
    path('api/login', TokenObtainPairView.as_view(), name='api-login'),
    path('api/register', register_view, name='api-register'),
    path('api/user', user_view, name='api-user'),
    path('api/user/<int:pk>/update', update_user_view, name='api-user-update'),
    path('api/posts', posts_view, name='api-posts')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
