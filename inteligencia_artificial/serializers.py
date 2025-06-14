from rest_framework import serializers

class TextInputSerializer(serializers.Serializer):
    text = serializers.CharField(required=True)


class ImageInputSerializer(serializers.Serializer):
    image = serializers.ImageField(required=True)


class AudioInputSerializer(serializers.Serializer):
    audio = serializers.FileField(required=True)

    def validate_audio(self, value):
        if not value.content_type.startswith("audio/"):
            raise serializers.ValidationError("O arquivo deve ser um áudio válido.")
        return value
