from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.exceptions import APIException
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse

from .models import Panoramica, Relatorio, Comparacao
from .services.gemini_service import gerar_relatorio_com_gemini
from .services.pdf_service import gerar_pdf_relatorio
from .services.gemini_comparacao import gerar_comparacao_com_gemini



class DentistaListCreateView(generics.ListCreateAPIView):
    queryset = Dentista.objects.all()
    serializer_class = DentistaSerializer


class DentistaUpdateRetrieveView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Dentista.objects.all()
    serializer_class = DentistaSerializer


class DentistaDestroyView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Dentista.objects.all()
    serializer_class = DentistaSerializer


class PacienteListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PacienteSerializer
    queryset = Paciente.objects.all()


class PacienteUpdateRetrieveView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PacienteSerializer
    queryset = Paciente.objects.all()


class PacienteDestroyView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PacienteSerializer
    queryset = Paciente.objects.all()


class PanoramicaCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Panoramica.objects.all()
    serializer_class = PanoramicaSerializer


class PanoramicaListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Panoramica.objects.all()
    serializer_class = PanoramicaSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'paciente']

class GerarRelatorioView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, panoramica_id):
        try:
            panoramica = Panoramica.objects.get(id=panoramica_id)
        except Panoramica.DoesNotExist:
            return Response(
                {"erro": "Panorâmica não encontrada."},
                status=status.HTTP_404_NOT_FOUND
            )

        # (1) Pegue dados antigos
        anteriores = Panoramica.objects.filter(
            paciente=panoramica.paciente,
            data__lt=panoramica.data
        ).order_by('-data')

        # (2) Gere o relatório
        try:
            texto_anterior = None
            if anteriores.exists():
                ant = anteriores.first()
                rel_ant = Relatorio.objects.filter(panoramica=ant).first()
                if rel_ant:
                    texto_anterior = (
                        f"{rel_ant.enfermidade}\n"
                        f"{rel_ant.descricao}\n"
                        f"{rel_ant.solucao}"
                    )
            resultado = gerar_relatorio_com_gemini(
                panoramica.foto,  # deve ser um File ou caminho válido
                anteriores.first().foto if anteriores.exists() else None,
                texto_anterior
            )
        except Exception as e:
            raise APIException(f"Falha ao gerar IA: {e}")

        # (3) Salve o relatório
        rel = Relatorio.objects.create(
            panoramica=panoramica,
            enfermidade="Diagnóstico Gerado por IA",
            descricao=resultado,
            solucao="Consultar o profissional para validação clínica."
        )

        return Response(
            {"mensagem": "Relatório gerado com sucesso.", "relatorio_id": rel.id},
            status=status.HTTP_201_CREATED
        )


class ExportarRelatorioPDFView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, relatorio_id):
        try:
            relatorio = Relatorio.objects.get(id=relatorio_id)
            paciente_nome = relatorio.panoramica.paciente.nome
            data = relatorio.panoramica.data

            pdf_file = gerar_pdf_relatorio(
                enfermidade=relatorio.enfermidade,
                descricao=relatorio.descricao,
                solucao=relatorio.solucao,
                paciente_nome=paciente_nome,
                data=data
            )

            response = HttpResponse(pdf_file.read(), content_type='application/pdf')
            response['Content-Disposition'] = f'attachment; filename="relatorio_{paciente_nome.replace(" ", "_")}.pdf"'
            return response

        except Relatorio.DoesNotExist:
            return Response({"erro": "Relatório não encontrado."}, status=status.HTTP_404_NOT_FOUND)
        
class CompararPanoramicasView(APIView):
    def post(self, request, paciente_id):
        try:
            panoramicas = Panoramica.objects.filter(paciente_id=paciente_id).order_by('-data')
            if panoramicas.count() < 2:
                return Response({"erro": "O paciente precisa ter pelo menos duas panorâmicas para comparação."}, status=400)

            atual = panoramicas[0]
            anterior = panoramicas[1]

            if not atual.foto or not anterior.foto:
                return Response({"erro": "Imagens ausentes para comparação."}, status=400)

            comparacao_texto = gerar_comparacao_com_gemini(atual.foto, anterior.foto)

            comparacao = Comparacao.objects.create(
                atual_panoramica=atual,
                anterior_panoramica=anterior,
                progressao=comparacao_texto
            )

            return Response({
                "mensagem": "Comparação realizada com sucesso.",
                "comparacao_id": comparacao.id,
                "progressao": comparacao.progressao
            }, status=201)

        except Exception as e:
            return Response({"erro": f"Erro interno: {str(e)}"}, status=500)
        
class RelatorioListAPIView(generics.ListAPIView):
    serializer_class = RelatorioSerializer

    def get_queryset(self):
        queryset = Relatorio.objects.all()
        
        # Filtro apenas por ID do relatório se fornecido
        relatorio_id = self.request.query_params.get('id')
        if relatorio_id:
            queryset = queryset.filter(id=relatorio_id)
            
        return queryset.order_by('-data')

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        
        # Se filtrar por ID e não encontrar, retorne 404
        relatorio_id = request.query_params.get('id')
        if relatorio_id and not queryset.exists():
            return Response(
                {"error": "Nenhum relatório encontrado com o ID especificado"},
                status=404
            )
            
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'count': queryset.count(),
            'results': serializer.data
        })

class ComparacaoListAPIView(generics.ListAPIView):
    serializer_class = ComparacaoSerializer

    def get_queryset(self):
        queryset = Comparacao.objects.select_related(
            'atual_panoramica',
            'atual_panoramica__paciente',
            'anterior_panoramica'
        ).all()
        
        # Filtro por ID do paciente
        paciente_id = self.request.query_params.get('paciente_id')
        if paciente_id:
            queryset = queryset.filter(atual_panoramica__paciente__id=paciente_id)
        
        # Filtro por ID da comparação
        comparacao_id = self.request.query_params.get('id')
        if comparacao_id:
            queryset = queryset.filter(id=comparacao_id)
            
        return queryset.order_by('-atual_panoramica__data')

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        
        response_data = {
            'count': queryset.count(),
            'results': serializer.data
        }
        
        # Se filtrar por paciente_id, adiciona info do paciente
        paciente_id = request.query_params.get('paciente_id')
        if paciente_id and queryset.exists():
            paciente = queryset.first().atual_panoramica.paciente
            response_data['paciente'] = {
                'id': paciente.id,
                'nome': paciente.nome
            }
        
        return Response(response_data)


