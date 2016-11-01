from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Tipos(models.Model):
    nombre = models.CharField(max_length=25)

class Eventos(models.Model):
    estados = (('ACTIVO','ACTIVO'),('INACTIVO','INACTIVO'))
    tipo = models.ForeignKey(Tipos)
    titulo = models.CharField(max_length=100)
    actividad = models.TextField()
    fecha = models.DateTimeField()
    requisitos = models.CharField(max_length=100)
    estado = models.CharField('INACTIVO',max_length=7,choices=estados)

class Archivos(models.Model):
    evento = models.ForeignKey(Eventos)
    archivo = models.TextField()
    tipo = models.CharField(max_length=15)