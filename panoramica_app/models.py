from django.db import models
from django.contrib.auth.models import User


class Dentista(models.Model):
    user  = models.OneToOneField(User, on_delete=models.CASCADE, related_name='dentista_profile')
    cro = models.CharField(max_length=200)
    pacientes = models.ManyToManyField("Paciente", related_name="pacientes_do_dentista")

    def __str__(self):
        return self.user

class Paciente(models.Model):
    nome = models.CharField(max_length=200)
    cpf = models.CharField(max_length=11)
    celular = models.IntegerField()
    email = models.CharField()
    endereco = models.CharField(max_length=200)
    imagens = models.ForeignKey("Panoramica", on_delete=models.PROTECT, related_name='pacientes_imagens')

    def __str__(self):
        return self.nome
    
class Panoramica(models.Model):
    foto = models.ImageField()
    paciente = models.ForeignKey(Paciente, on_delete=models.PROTECT)
    data = models.DateTimeField()
    relatorio = models.ForeignKey('Relatorio', blank=True, null=True, on_delete=models.PROTECT, related_name='relatorios_da_panoramica')


class Relatorio(models.Model):
    panoramica = models.ForeignKey(Panoramica, on_delete=models.PROTECT, related_name='panoramicas_dos_relatorios')
    enfermidade = models.CharField(max_length=200)
    descricao = models.TextField(verbose_name="Descrição")
    solucao = models.TextField(verbose_name="Solução")

    def __str__(self):
        return "relatorio" + self.enfermidade

class Comparacao(models.Model):
    atual_panoramica = models.ForeignKey(Panoramica, verbose_name="Panoramica atual", on_delete=models.PROTECT, related_name='panoramica_atual')
    anterior_panoramica = models.ForeignKey(Panoramica, verbose_name="Panoramica anterior", on_delete=models.PROTECT, related_name='panoramica_anterior')
    progressao = models.TextField(verbose_name="Progressão")




