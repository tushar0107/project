from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password']
        extra_kwargs = {'password':{'write_only':True}}

    # password validation
    def validate_password(self, password):
        try:
            validate_password(password)
        except ValidationError as ve:
            raise serializers.ValidationError(ve.messages)
        return password
    # 
    def create(self, validated_data):
        if validate_password(password=validated_data['password']) is None:
            user = User.objects.create_user(**validated_data)
            return user

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','password']


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        return token