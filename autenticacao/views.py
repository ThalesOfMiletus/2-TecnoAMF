from rest_framework.views import APIView
from django.contrib.auth import login, logout, authenticate
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
#from django.contrib.auth import get_user_model

class LoginAPIView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if not user:
            return Response({'error': 'Credenciais inválidas.'}, status=400)

        login(request, user)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=200)

class LogoutAPIView(APIView):
    
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({'message': 'Logout realizado com sucesso.'}, status=status.HTTP_200_OK)
