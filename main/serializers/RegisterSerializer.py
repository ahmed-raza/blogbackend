from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

class RegisterSerializer(serializers.ModelSerializer):
    access_token = serializers.SerializerMethodField('_get_access_token')
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password', 'password2', 'access_token')
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.pop('password2')
        if password != password2:
            raise serializers.ValidationError('Password and Confirm Password do not match')
        return attrs
    def create(self, validated_data):
        user = User.objects.create(
            username = validated_data['username'],
            first_name = validated_data['first_name'] if 'first_name' in validated_data else '',
            last_name = validated_data['last_name'] if 'last_name' in validated_data else '',
            email = validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    def _get_access_token(self, user_object):
        refresh = RefreshToken.for_user(user_object)
        return str(refresh.access_token)
