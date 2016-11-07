from django.conf.urls import url
from actividad import views
from rest_framework import routers

urlpatterns = [
    url(r'^$',views.index),
    url(r'^login',views.login),
    url(r'^logout',views.logout),
    url(r'^status',views.status)
]