from actividad.controllers import indexController
from actividad.controllers import autenticationController

def index(request):
    return indexController.index(request)

def login(request):
    return autenticationController.login(request)

def logout(request):
    return autenticationController.logout(request)

def status(request):
    return autenticationController.status(request)
