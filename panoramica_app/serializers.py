from rest_framework import serializers
from .models import *


class DentistaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Dentista
        fields = '__all__'


class PacienteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Paciente
        fields = '__all__'


class PanoramicaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Panoramica
        fields = '__all__'


class RelatorioSerializer(serializers.ModelSerializer):
        
    class Meta:
        model = Relatorio
        fields = '__all__'


class ComparacaoSerializer(serializers.ModelSerializer):
        
    class Meta:
        model = Comparacao
        fields = '__all__'

