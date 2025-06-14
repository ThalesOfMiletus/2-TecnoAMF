import google.generativeai as genai
import base64
from django.conf import settings

genai.configure(api_key=settings.GEMINI_API_KEY)

def gerar_comparacao_com_gemini(imagem_atual_base64, imagem_anterior_base64):
    prompt = """
Você é um radiologista odontológico especializado em análise comparativa de imagens dentárias. 

Ao receber duas radiografias panorâmicas (uma atual e uma anterior) do mesmo paciente, gere um laudo técnico detalhado seguindo esta estrutura:

**DADOS DO PACIENTE** (preencher com informações disponíveis)
- Nome: [preencher]
- Idade: [preencher]
- Datas dos exames: Anterior: [data] | Atual: [data]

**COMPARAÇÃO TÉCNICA**

1. **Dentição:**
   - Extrações/Perdas dentárias
   - Novos elementos restaurados/implantes
   - Cáries evidentes
   - Alterações de posicionamento

2. **Estruturas Ósseas:**
   - Lesões periapicais
   - Alterações trabeculares
   - Cistos ou outras patologias
   - Terceiros molares (posição/erupção)

3. **Regiões Específicas:**
   - Seios maxilares (aeração/espessamento)
   - ATM (forma/condilo)
   - Canal mandibular

4. **Achados Relevantes:**
   - Itens que chamaram atenção
   - Progressão/regressão de condições
   - Novos achados

**CONCLUSÃO**
- Resumo das principais alterações
- Estabilidade observada
- Progressão de condições

**RECOMENDAÇÕES** (numeração clara)
1. Exames complementares sugeridos
2. Acompanhamentos necessários
3. Condutas indicadas

Formatação requerida:
- Use markdown para organização
- Títulos em negrito
- Listas com marcadores
- Linguagem técnica mas acessível
- Destaque para achados relevantes
- Espaçamento adequado entre seções

Observações:
- Se algum ponto não for avaliável, indique "Não avaliável nesta imagem"
- Destaque qualquer alteração significativa
- Mantenha padrão profissional mas com clareza
"""

    imagem_atual_bytes = base64.b64decode(imagem_atual_base64.split(',')[-1])
    imagem_anterior_bytes = base64.b64decode(imagem_anterior_base64.split(',')[-1])

    model = genai.GenerativeModel('gemini-2.0-flash')

    parts = [
        prompt,
        {"mime_type": "image/jpeg", "data": imagem_anterior_bytes},
        {"mime_type": "image/jpeg", "data": imagem_atual_bytes}
    ]

    response = model.generate_content(parts)
    return response.text
