import json as JSON

def index():
    json = JSON.dumps({
        'result':1,
        'rows':'Hola mundo desde un archivo json.'
    })
    return json
