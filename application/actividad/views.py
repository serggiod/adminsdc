from django.shortcuts      import render
from django.http           import HttpResponse
from actividad.controllers import indexController
from actividad.controllers import autenticationController

# Create your views here.

def index(response):
    json = indexController.index()
    return HttpResponse(json)

def login(request,user,passw):
    json = autenticationController.login(user,passw)
    return HttpResponse(json)

def logout(request,sessId):
    json = autenticationController.logout(sessId)
    return HttpResponse(json)

def status(request,sessId):
    json = autenticationController.status(sessId)
    return HttpResponse(json)
