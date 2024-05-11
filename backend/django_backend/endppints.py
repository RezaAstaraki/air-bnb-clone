from rest_framework.response import Response

def endpoints_view(request):
    endpoints = {
        'hello':'dddd',
    }
    return Response(data=endpoints)


