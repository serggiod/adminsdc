from django.http      import HttpResponse,HttpResponseNotFound
import json as JSON

def all(request):
    return HttpResponse(JSON.dumps({'result':True,'rows':'ALL'}))

def get(request,id):
    return HttpResponse(JSON.dumps({'result':True,'rows':'GET'}))

def post(request,id):
    return HttpResponse(JSON.dumps({'result':True,'rows':'POST'}))

def put(request,id):
    return HttpResponse(JSON.dumps({'result':True,'rows':'PUT'}))

def delete(request,id):
    return HttpResponse(JSON.dumps({'result':True,'rows':'DELETE'}))