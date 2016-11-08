from actividad.models import JujuyPersonas as personas
from actividad.models import JujuyUsuarios as jusuarios
from actividad.models import Usuarios      as usuarios
from django.http      import HttpResponse,HttpResponseNotFound
import json as JSON
import time as date

"""
Inicia una sesion.
Parametros: usuario y password.
"""
def post(request):
    try:
        body = JSON.loads(request.body)
        user  = body['user']
        passw = body['passw']
        u  = usuarios.objects.get(per_cuil=user,app='adminadd')
        ju = jusuarios.objects.get(per_cuil=u.per_cuil,usu_pass=passw,usu_estado=1)
        jp = personas.objects.get(per_cuil=ju.per_cuil)
        p  = jp.per_nombres+' '+jp.per_apellidos
        request.session['lastr']   = date.strftime('%Y%m%d%H%M%S')
        request.session['usuario'] = p
        request.session['status']  = True
        return HttpResponse(JSON.dumps({'result':True,'rows':p}))
    except:
        return HttpResponseNotFound('')

"""
Elimina una sesion.
Parametros: Id de la session.
"""
def delete(request):
    try:
        request.session.clear()
        return HttpResponse(JSON.dumps({'result':True,'rows':{}}))
    except:
        return HttpResponseNotFound('')

"""
Informa el estado de una sesion.
Parametros: Id de la session.
"""
def get(request):
    try:
        if request.session['status']==True:
            lastime = (int(request.session['lastr'])) +1800
            curtime = int(date.strftime('%Y%m%d%H%M%S'))
            if curtime<=lastime:
                request.session['lastr'] = date.strftime('%Y%m%d%H%M%S')
                return HttpResponse(JSON.dumps({'result':True,'rows':{}}))
            else:
                return HttpResponseNotFound('')
        else:
            return HttpResponseNotFound('')
    except:
        return HttpResponseNotFound('')