from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from . import services
from .serializers import TextInputSerializer, ImageInputSerializer, AudioInputSerializer


class GeminiTextView(APIView):
    def post(self, request):
        serializer = TextInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = services.analyze_text_input(serializer.validated_data['text'])
        return Response(result)


class GeminiImageView(APIView):
    def post(self, request):
        serializer = ImageInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = services.analyze_image_input(serializer.validated_data['image'])
        return Response(result)


class GeminiAudioView(APIView):
    def post(self, request):
        serializer = AudioInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = services.analyze_audio_input(serializer.validated_data['audio'])
        return Response(result)
