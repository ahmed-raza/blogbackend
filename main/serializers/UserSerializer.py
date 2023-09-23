from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'is_active', 'date_joined')
    date_joined = serializers.SerializerMethodField('_get_date_joined')
    def _get_date_joined(self, user_object):
        return user_object.date_joined.strftime('%Y-%m-%d %I:%M%p')
