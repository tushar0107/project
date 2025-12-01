from django.shortcuts import render
from django.template.loader import render_to_string
from django.contrib.auth import authenticate,get_user_model

# Create your views here.

from rest_framework import generics
from rest_framework.views import APIView
from .serializers import UserSerializer, CustomTokenObtainPairSerializer
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.core.serializers import serialize
from rest_framework_simplejwt.views import TokenObtainPairView
from django.core.cache import cache
from rest_framework_simplejwt.tokens import AccessToken

User = get_user_model()

def home(request):
    return render(request, 'index.html')


def generate_pdf(reaquest,data):

    return render(reaquest)

def validate_token(token):
    cached_user = cache.get(f'token_{token}')
    if cached_user:
        return cached_user
    token = AccessToken(token)
    user_id = token['user_id']
    user = User.objects.get(id=user_id)
    return user



class UserView(APIView):
    def post(self, request):
        user = authenticate(username=request.data['username'], password=request.data['password'])
        if user and user.is_authenticated:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'message': 'Logged In Successfully',
                'token': token.key,
                'username':user.username,
                'first_name':user.first_name,
                'last_name':user.last_name,
                'email':user.email
            },status=status.HTTP_200_OK)
        else:
            return Response({
                'message': 'Invalid credentials',
            },status=status.HTTP_400_BAD_REQUEST)

class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
        

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer