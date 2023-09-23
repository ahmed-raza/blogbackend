from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ...serializers.UserSerializer import UserSerializer

class UserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        user = UserSerializer(request.user)
        return Response(user.data)

user_view = UserView.as_view()
