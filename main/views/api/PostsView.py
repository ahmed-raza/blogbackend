from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from ...serializers.PostsSerializer import PostsSerializer
from ...models import Post

class PostsView(APIView):
    permission_classes = [AllowAny]
    serializer_class = PostsSerializer
    def get(self, request, format=None):
        posts = self.serializer_class(Post.objects.all(), many=True)
        return Response(posts.data)

posts_view = PostsView.as_view()
