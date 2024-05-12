from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET'])
def endpoints_view(request):
    endpoints = {
        'hello':'dddd',
    }
    return Response(data=endpoints)


