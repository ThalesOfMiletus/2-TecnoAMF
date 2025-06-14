
from django.urls import path
from .views import *


urlpatterns = [
    path('dentista/', DentistaListCreateView.as_view(), name='create-list-dentista'),
    path('dentista/me/', DentistaUpdateRetrieveView.as_view(), name='retrieve-update-dentista'),
    path('dentista/<int:pk>/', PacienteDestroyView.as_view(), name='dentista-delete'),

    path('pacientes/', PacienteListCreateView.as_view(), name='create-list-paciente'),
    path('pacientes/<int:pk>/', PacienteUpdateRetrieveView.as_view(), name='retrieve-update-paciente'),
    path('pacientes/<int:pk>/', PacienteDestroyView.as_view(), name='paciente-delete'),

    path('panoramicas/', PanoramicaListView.as_view(), name='listar-panoramicas'),
    path('panoramicas/criar/', PanoramicaCreateView.as_view(), name='criar-panoramica'),

    path('panoramicas/<int:panoramica_id>/gerar-relatorio/', GerarRelatorioView.as_view(), name='gerar-relatorio'),
    path('relatorios/<int:relatorio_id>/exportar-pdf/', ExportarRelatorioPDFView.as_view(), name='exportar-relatorio-pdf'),

    path('pacientes/<int:paciente_id>/comparar-panoramicas/', CompararPanoramicasView.as_view(), name='comparar-panoramicas'),

    path('relatorios/', RelatorioListAPIView.as_view(), name='relatorios-list'),
    path('comparacoes/', ComparacaoListAPIView.as_view(), name='comparacoes-list'),
]

