from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import cm
from reportlab.lib import colors
from io import BytesIO
from django.core.files.base import ContentFile
import textwrap


def gerar_pdf_relatorio(enfermidade, descricao, solucao, paciente_nome, data):
    buffer = BytesIO()
    c = canvas.Canvas(buffer, pagesize=A4)
    largura, altura = A4
    margem = 2 * cm
    max_largura_texto = largura - (2 * margem)
    y = altura - 3 * cm

    fonte_padrao = "Helvetica"
    fonte_negrito = "Helvetica-Bold"
    fonte_italico = "Helvetica-Oblique"
    tamanho_fonte = 11
    tamanho_titulo = 13
    max_caracteres_por_linha = 100  # ajustável conforme fonte/tamanho/margem

    def desenhar_texto(texto, quebra_linha=True):
        """Desenha texto com quebra automática de linha"""
        nonlocal y
        linhas = []
        for linha in texto.splitlines():
            if quebra_linha:
                linhas.extend(textwrap.wrap(linha, width=max_caracteres_por_linha))
            else:
                linhas.append(linha)

        for linha in linhas:
            if y < 2 * cm:
                c.showPage()
                y = altura - 3 * cm
                c.setFont(fonte_padrao, tamanho_fonte)
            c.drawString(margem + 0.5 * cm, y, linha)
            y -= 0.5 * cm
        y -= 0.3 * cm

    def desenhar_secao(titulo, texto):
        nonlocal y
        if y < 3 * cm:
            c.showPage()
            y = altura - 3 * cm
        c.setFont(fonte_negrito, tamanho_titulo)
        c.drawString(margem, y, titulo)
        y -= 0.6 * cm
        c.setFont(fonte_padrao, tamanho_fonte)
        desenhar_texto(texto)

    # Título
    c.setFont(fonte_negrito, 16)
    c.drawCentredString(largura / 2, y, "Relatório Odontológico")
    y -= 1.2 * cm

    # Paciente e data
    c.setFont(fonte_padrao, 12)
    c.drawString(margem, y, f"Paciente: {paciente_nome}")
    y -= 0.8 * cm
    c.drawString(margem, y, f"Data do Relatório: {data.strftime('%d/%m/%Y %H:%M')}")
    y -= 1.2 * cm

    # Seções
    desenhar_secao("Enfermidade", enfermidade)
    desenhar_secao("Descrição", descricao)
    desenhar_secao("Solução", solucao)

    # Rodapé
    if y < 4 * cm:
        c.showPage()
        y = altura - 3 * cm
    c.setFont(fonte_italico, 10)
    c.setFillColor(colors.grey)
    c.drawString(margem, y, "Este relatório foi gerado automaticamente com base em uma análise radiográfica.")
    y -= 0.4 * cm
    c.drawString(margem, y, "Consulte um profissional para validação clínica.")
    c.setFillColor(colors.black)

    c.showPage()
    c.save()
    pdf_content = buffer.getvalue()
    buffer.close()

    nome_arquivo = f"relatorio_{paciente_nome.replace(' ', '_')}.pdf"
    return ContentFile(pdf_content, name=nome_arquivo)
