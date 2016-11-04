from django.http           import HttpResponse              as response
from actividad.controllers import indexController           as index
from actividad.controllers import autenticationController   as auth

def index(request):
    json = index.index()
    return response(json)

def login(request,user,passw):
    json = auth.login(request,user,passw)
    return response(json)

def logout(request):
    json = auth.logout(request)
    return response(json)

def status(request):
    json = auth.status(request)
    return response(json)
