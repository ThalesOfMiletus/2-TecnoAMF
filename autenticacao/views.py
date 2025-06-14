from rest_framework import generics
from rest_framework.views import APIView
from django.contrib.auth import login, logout, authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .serializers import UsuarioAppSerializer
#from django.contrib.auth import get_user_model


class DentistaListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UsuarioAppSerializer


class DentistaUpdateRetrieveView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UsuarioAppSerializer

    def get_object(self):
        return self.request.user
    
    
class DentistaDestroyView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UsuarioAppSerializer



class PacienteListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UsuarioAppSerializer


class PacienteUpdateRetrieveView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UsuarioAppSerializer

    def get_object(self):
        return self.request.user
    
    
class PacienteDestroyView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UsuarioAppSerializer


class LoginAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return Response({'message': 'Login realizado com sucesso.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Credenciais inválidas.'}, status=status.HTTP_400_BAD_REQUEST)


class LogoutAPIView(APIView):
    
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({'message': 'Logout realizado com sucesso.'}, status=status.HTTP_200_OK)
