from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


from rest_framework.response import Response
from .serializer import PropertySerializer
from .models import Property
from .forms import AddPropertyForm

from django.http import JsonResponse


from rest_framework.request import Request

# Create your views here.


@api_view(['GET'])
def properties(request):
    all_properties = Property.objects.all()
    p = PropertySerializer(all_properties, many=True)

    # p.is_valid()
    # print('>>>>>>>>>>>>>>')
    # print(p)
    # print('>>>>>>>>>>>>>>')

    return Response(data=p.data)


@api_view(['POST', 'File'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def add_property(request: Request):

    print('///////////////////')
    # print('request headers', request.META.get('HTTP_AUTHORIZATION'))
    print('user', request.user)
    print('type of user', type(request.user))
    print('>>>>>>>>>>>>>>>>>>>')

    form = AddPropertyForm(request.POST, request.FILES)
    if form.is_valid():
        property = form.save(commit=False)
        property.landlord = request.user
        property.save()

        return JsonResponse({'success': True})
    else:

        print('errors', form.errors, form.non_field_errors)

        return JsonResponse({'errors': form.errors.as_json()})
