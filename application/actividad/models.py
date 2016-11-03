from __future__ import unicode_literals

from django.db import models

class JujuyUsuarios(models.Model):
    usu_pass    = models.CharField(max_length=35)
    per_cuil    = models.CharField(primary_key=True,max_length=13,db_column='per_cuil')
    usu_estado  = models.BooleanField(default=0)
    usu_cambiar = models.BooleanField(default=0)
    class Meta:
        db_table = 'jujuy_usuarios'

class Usuarios(models.Model):
    id = models.AutoField(primary_key=True)
    per_cuil = models.OneToOneField(JujuyUsuarios,db_column='per_cuil')
    user_dir = models.CharField(max_length=50)
    user_url = models.CharField(max_length=50)
    app      = models.CharField(max_length=15)
    class Meta:
        db_table = 'usuarios'

"""
class Tipos(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=25)

class Eventos(models.Model):
    id = models.AutoField(primary_key=True)
    estados = (('ACTIVO','ACTIVO'),('INACTIVO','INACTIVO'))
    tipo = models.ForeignKey(Tipos)
    titulo = models.CharField(max_length=100)
    actividad = models.TextField()
    fecha = models.DateTimeField()
    requisitos = models.CharField(max_length=100)
    estado = models.CharField('INACTIVO',max_length=7,choices=estados)

class Archivos(models.Model):
    id = models.AutoField(primary_key=True)
    evento = models.ForeignKey(Eventos)
    archivo = models.TextField()
    tipo = models.CharField(max_length=15)
"""