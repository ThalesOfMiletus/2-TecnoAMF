import google.generativeai as genai
import json
from django.conf import settings

# Configura a API do Gemini
genai.configure(api_key=settings.GEMINI_API_KEY)

def analyze_text_input(text_input):
    model = genai.GenerativeModel('gemini-2.0-flash')
    response = model.generate_content(
        f"Descreva o conteúdo abaixo de forma objetiva e retorne em JSON com a chave 'description':\n{text_input}"
    )
    try:
        return json.loads(response.text)
    except json.JSONDecodeError:
        return {"description": response.text.strip()}

def analyze_audio_input(audio_file):
    model = genai.GenerativeModel("gemini-2.0-flash")
    prompt = (
        "Este é um arquivo de áudio. Interprete e descreva brevemente o que está sendo dito, "
        "retornando apenas um JSON com a chave 'description'."
    )

    response = model.generate_content([
        prompt,
        {
            "mime_type": "audio/mpeg",
            "data": audio_file.read()
        }
    ])

    try:
        return json.loads(response.text)
    except json.JSONDecodeError:
        return {"description": response.text.strip()}

def analyze_image_input(image_file):
    model = genai.GenerativeModel("gemini-2.0-flash")
    prompt = (
        "Esta é uma imagem. Descreva brevemente o que ela mostra e retorne apenas um JSON com a chave 'description'."
    )

    response = model.generate_content([
        {
            "mime_type": image_file.content_type,
            "data": image_file.read()
        },
        prompt
    ])

    try:
        return json.loads(response.text)
    except json.JSONDecodeError:
        return {"description": response.text.strip()}
