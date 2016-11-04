from actividad.models import JujuyPersonas as personas
from actividad.models import JujuyUsuarios as jusuarios
from actividad.models import Usuarios      as usuarios
import json as JSON
import time as date

"""
Inicia una sesion.
Parametros: usuario y password.
"""
def login(request,user,passw):
    
    # Definicion.
    json = {'result':False,'rows':{}}

    #Proceso.
    try: 
        u  = usuarios.objects.get(per_cuil=user,app='adminadd')
        ju = jusuarios.objects.get(per_cuil=u.per_cuil,usu_pass=passw,usu_estado=1)
        jp = personas.objects.get(per_cuil=ju.per_cuil)
        json['rows']['usuario'] = jp.per_nombres+' '+jp.per_apellidos
        request.session['lastr']   = date.strftime('%Y%m%d%H%M%S')
        request.session['usuario'] = json['rows']['usuario']
        request.session['status']  = True
        json['result'] = True

        # Salida.
        return JSON.dumps(json)
    except:

        # Salida.
        return JSON.dumps(json)

"""
Elimina una sesion.
Parametros: Id de la session.
"""
def logout(request):

    # Definicion.
    json={'result':True,'rows':{}}
    request.session.clear()

    # Salida.
    return JSON.dumps(json)

"""
Informa el estado de una sesion.
Parametros: Id de la session.
"""
def status(request):
    
    # Definicion.
    json={'result':False,'rows':{}}

    # Proceso.
    try:
        if request.session['status'] == True:
            lastime = (int(request.session['lastr'])) +1800
            curtime = int(date.strftime('%Y%m%d%H%M%S'))
            if curtime<=lastime:
                request.session['lastr'] = date.strftime('%Y%m%d%H%M%S')
                json['result'] = True

        # Salida.
        return JSON.dumps(json)
    except:

       # Salida.
       return JSON.dumps(json)