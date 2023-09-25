from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from ...serializers.UserSerializer import UserSerializer

class UpdateUserView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    def put(self, request, pk=None):
        try:
            user = User.objects.get(id=pk)
        except User.DoesNotExist:
            user = None

        if user:
            serializer = self.serializer_class(user, request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'message': 'Your changes have been saved.'})
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'User does not exist.'}, status=status.HTTP_404_NOT_FOUND)

update_user_view = UpdateUserView.as_view()
