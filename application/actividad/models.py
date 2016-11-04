# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models

class ActividadArchivos(models.Model):
    archivo = models.TextField()
    tipo = models.CharField(max_length=15)
    evento = models.ForeignKey('ActividadEventos', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'actividad_archivos'


class ActividadEventos(models.Model):
    titulo = models.CharField(max_length=100)
    actividad = models.TextField()
    fecha = models.DateTimeField()
    requisitos = models.CharField(max_length=100)
    estado = models.CharField(max_length=7)
    tipo = models.ForeignKey('ActividadTipos', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'actividad_eventos'


class ActividadTipos(models.Model):
    nombre = models.CharField(max_length=25)

    class Meta:
        managed = False
        db_table = 'actividad_tipos'


class JujuyPersonas(models.Model):
    per_cuil = models.CharField(max_length=13, primary_key=True, unique=True)
    per_apellidos = models.CharField(max_length=25)
    per_nombres = models.CharField(max_length=35)
    id_doctipo = models.IntegerField()
    per_docnro = models.CharField(max_length=9)
    per_celular = models.CharField(max_length=35)
    per_email = models.CharField(max_length=50)
    per_esdipu = models.IntegerField()
    id_bloque = models.IntegerField()
    per_activo = models.IntegerField()
    per_inicial = models.CharField(max_length=10, blank=True, null=True)
    per_iniciales = models.CharField(max_length=10, blank=True, null=True)
    per_legajo = models.CharField(max_length=10)
    per_hextras = models.IntegerField()
    per_hpartic = models.IntegerField()
    id_dpto = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'jujuy_personas'


class JujuyUsuarios(models.Model):
    usu_pass = models.CharField(max_length=35, blank=True, null=True)
    per_cuil = models.CharField(max_length=13, primary_key=True, unique=True)
    usu_estado = models.IntegerField(blank=True, null=True)
    usu_cambiar = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'jujuy_usuarios'

class Usuarios(models.Model):
    per_cuil = models.CharField(max_length=13, primary_key=True, unique=True)
    user_dir = models.CharField(max_length=50, blank=True, null=True)
    user_url = models.CharField(max_length=50, blank=True, null=True)
    app = models.CharField(max_length=15, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'usuarios'