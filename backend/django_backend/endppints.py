from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET'])
def endpoints_view(request):
    endpoints = {
        '/api/':'you can see all endpoints here',
        '/api/properties/':'you can see all properties there',
    }
    return Response(data=endpoints)


