from rest_framework import serializers
from .UserSerializer import UserSerializer
from ..models import Post

class PostsSerializer(serializers.ModelSerializer):
    short_description = serializers.SerializerMethodField('_get_short_description')
    created_at = serializers.SerializerMethodField('_get_created_at')
    user = serializers.SerializerMethodField('_get_user')
    class Meta:
        model = Post
        fields = '__all__'
    def _get_short_description(self, post_object):
        return str(post_object.body[:80] + '...')
    def _get_created_at(self, post_object):
        return post_object.created_at.strftime("%Y-%m-%d %I:%M%p")
    def _get_user(self, post_object):
        user = UserSerializer(post_object.user)
        return user.data
