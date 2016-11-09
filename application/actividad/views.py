from actividad.controllers import indexController
from actividad.controllers import autenticationController
from actividad.controllers import actividadEventosController
from actividad.controllers import actividadArchivosController
from actividad.controllers import actividadTiposController

# Index.
def index(request):
    return indexController.index(request)

# Login.
def login(request):
    if request.method=='POST':
        return autenticationController.post(request)
    if request.method=='GET':
        return autenticationController.get(request)
    if request.method=='DELETE':
        return autenticationController.delete(request)

# Actividad.
def actividadEventos(request):
    return actividadEventosController.all(request)

def actividadTipos(request):
    return actividadTiposController.all(request)

def actividadArchivos(request):
    return actividadArchivosController.all(request)

def actividadEvento(request,id):
    if request.method=='GET':
        return actividadEventosController.get(request,id)
    if request.method=='POST':
        return actividadEventosController.post(request,id)
    if request.method=='PUT':
        return actividadEventosController.put(request,id)
    if request.method=='DELETE':
        return actividadEventosController.delete(request,id)

def actividadTipo(request,id):
    if request.method=='GET':
        return actividadTiposController.get(request,id)
    if request.method=='POST':
        return actividadTiposController.post(request,id)
    if request.method=='PUT':
        return actividadTiposController.put(request,id)
    if request.method=='DELETE':
        return actividadTiposController.delete(request,id)

def actividadArchivo(request,id):
    if request.method=='GET':
        return actividadArchivosController.get(request,id)
    if request.method=='POST':
        return actividadArchivosController.post(request,id)
    if request.method=='PUT':
        return actividadArchivosController.put(request,id)
    if request.method=='DELETE':
        return actividadArchivosController.delete(request,id)