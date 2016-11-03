import json as JSON
from actividad.models import JujuyUsuarios,Usuarios

"""
Inicia una sesion.
Parametros: usuario y password.
"""
def login(user,passw):
    dic = {
        'result':0,
        'rows':'Hola MNundo desde Login.'
    }
    usuario = Usuarios.objects.get(
        per_cuil=user,
        usu_pass=passw,
        app='adminapp',
        usu_estado=1
    )
    dic.rows = usuario
    json = JSON.dumps(dic)
    return json

"""
Elimina la sesion actual.
Parametros: Id de la session.
"""
def logout(sessionId):
    dic = {
        'result':0,
        'rows':'Hola mundo desde logout.'
    }
    json = JSON.dumps(dic)
    return json

"""
Chechear el estado de la session.
Parametro: Id de la session.
"""
def status(sessionId):
    dic = {
        'result':0,
        'rows':'Hola mundo desde status.'
    }
    json = JSON.dumps(dic)
    return json