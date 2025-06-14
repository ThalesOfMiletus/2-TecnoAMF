from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path
from .views import *

urlpatterns = [

    path('dentista/', DentistaListCreateView.as_view(), name='create-list-dentista'),
    path('dentista/me/', PacienteUpdateRetrieveView.as_view(), name='retrieve-update-dentista'),
    path('dentista/<int:pk>/', PacienteDestroyView.as_view(), name='dentista-delete'),

    path('pacientes/', PacienteListCreateView.as_view(), name='create-list-paciente'),
    path('pacientes/me/', PacienteUpdateRetrieveView.as_view(), name='retrieve-update-paciente'),
    path('pacientes/<int:pk>/', PacienteDestroyView.as_view(), name='paciente-delete'),
    path('token/', TokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
]
