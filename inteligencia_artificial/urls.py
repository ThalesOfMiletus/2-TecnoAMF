from django.urls import path
from .views import GeminiTextView, GeminiImageView, GeminiAudioView

urlpatterns = [
    path('interpretar/texto/', GeminiTextView.as_view(), name='interpretar-texto'),
    path('interpretar/imagem/', GeminiImageView.as_view(), name='interpretar-imagem'),
    path('interpretar/audio/', GeminiAudioView.as_view(), name='interpretar-audio'),
]
