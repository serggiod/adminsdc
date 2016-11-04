import json as JSON

def index():
    json = JSON.dumps({
        'result':1,
        'rows':'Hola mundo.'
    })
    return json
