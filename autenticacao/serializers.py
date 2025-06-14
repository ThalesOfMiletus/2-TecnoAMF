from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.models import User


class UsuarioAppSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    