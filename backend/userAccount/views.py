from django.shortcuts import get_object_or_404, render
from .serializers import LandLordDetailSerializer

from rest_framework.decorators import permission_classes, authentication_classes, api_view
from django.http import JsonResponse

from .models import User

# Create your views here.


def landlordsDetail(request, id):

    user_instance = get_object_or_404(User, pk=id)
    serializer = LandLordDetailSerializer(user_instance, many=False)
    return JsonResponse(serializer.data)
#
