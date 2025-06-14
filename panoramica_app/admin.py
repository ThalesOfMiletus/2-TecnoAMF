from django.contrib import admin
from .models import *

admin.site.register(Dentista)
admin.site.register(Paciente)
admin.site.register(Panoramica)
admin.site.register(Comparacao)
admin.site.register(Relatorio)