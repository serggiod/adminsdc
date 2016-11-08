from django.conf.urls import url
from actividad import views
from rest_framework import routers

urlpatterns = [
    url(r'^$',views.index),
    url(r'^login',views.login),
    url(r'^actividad/eventos',views.actividadEventos),
    url(r'^actividad/evento/(?P<id>[0-9]{1,11})',.actividadEvento),
    url(r'^actividad/archivos',.actividadArchivos),
    url(r'^actividad/archivo/(?P<id>[0-9]{1,11})',views.actividadArchivo),
    url(r'^actividad/tipos',views.actividadTipos),
    url(r'^actividad/tipo/(?P<id>[0-9]{1,11})',views.actividadTipo),
]