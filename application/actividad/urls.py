from django.conf.urls import url
from actividad import views

urlpatterns = [
    url(r'^$',views.index),
    url(r'^login',views.login),
    url(r'^actividad/eventos',views.actividadEventos),
    url(r'^actividad/evento/(?P<id>[0-9]{1,11})',views.actividadEvento),
    url(r'^actividad/archivos',views.actividadArchivos),
    url(r'^actividad/archivo/(?P<id>[0-9]{1,11})',views.actividadArchivo),
    url(r'^actividad/tipos',views.actividadTipos),
    url(r'^actividad/tipo/(?P<id>[0-9]{1,11})',views.actividadTipo)
]