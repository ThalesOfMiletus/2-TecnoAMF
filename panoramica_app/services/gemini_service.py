import google.generativeai as genai
import base64
from django.conf import settings


genai.configure(api_key=settings.GEMINI_API_KEY)


def gerar_prompt_relatorio(panoramica_atual, panoramica_anterior=None, relatorio_anterior=None):
    prompt = """
Você é um cirurgião-dentista especialista em radiologia odontológica.
A imagem a seguir é uma radiografia panorâmica (ortopantomografia) de um paciente.
Seu objetivo é gerar um relatório técnico e detalhado com base na imagem.

O relatório deve conter os seguintes tópicos:

- Estado da dentição
- Avaliação dos terceiros molares (sisos)
- Estrutura óssea mandibular e maxilar
- Seios maxilares
- Espaços periodontais e ápices radiculares
- ATMs
- Observações adicionais relevantes

Finalize com recomendações clínicas como extrações, tomografia, implantes ou encaminhamentos.
A análise deve ser objetiva, técnica e precisa, como um laudo profissional.
    """
    if panoramica_anterior and relatorio_anterior:
        prompt += f"\n\nSegue também a imagem {panoramica_anterior} do relatorio anterior. Compare a mudança entre as imagens."

    return prompt


def gerar_relatorio_com_gemini(imagem_base64, imagem_anterior_base64=None, texto_anterior=None):
    model = genai.GenerativeModel('gemini-2.0-flash')
    imagem_bytes = base64.b64decode(imagem_base64.split(',')[-1])
    
    parts = [
        gerar_prompt_relatorio(imagem_base64, imagem_anterior_base64, texto_anterior),
        {"mime_type": "image/jpeg", "data": imagem_bytes}
    ]

    if imagem_anterior_base64:
        imagem_anterior_bytes = base64.b64decode(imagem_anterior_base64.split(',')[-1])
        parts.append({"mime_type": "image/jpeg", "data": imagem_anterior_bytes})

    response = model.generate_content(parts)
    return response.text
