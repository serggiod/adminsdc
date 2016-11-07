from django.http import HttpRequest,HttpResponse,HttpResponseNotFound
import json as JSON

def index(request):
    if(request.method=="GET"):
        return HttpResponse(JSON.dumps({'result':True,'rows':''}))
    else:
        return HttpResponseNotFound('')