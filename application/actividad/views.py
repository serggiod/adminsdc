from django.shortcuts  import render
from django.http       import HttpResponse

# Create your views here.

def index(request):
    return HttpResponse("Hola Mundo.")

def login(request,user,passw):
    return HttpResponse('Usuario: '+user+' '+passw)

def logout(request,sessId):
    return HttpResponse('Logout Page: '+sessId)

def status(request,sessId):
    return HttpResponse('Status Page: '+sessId)
