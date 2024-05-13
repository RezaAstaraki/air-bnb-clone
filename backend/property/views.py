from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import PropertySerializer
from .models import Property

# Create your views here.

@api_view(['GET'])
def properties(request):
    all_properties = Property.objects.all()
    p = PropertySerializer(all_properties,many=True)
    
    # p.is_valid()
    # print('>>>>>>>>>>>>>>')
    # print(p)
    # print('>>>>>>>>>>>>>>')

    
    return Response(data=p.data )


