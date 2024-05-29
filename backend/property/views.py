from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from rest_framework import status


from rest_framework.response import Response
from .serializer import PropertySerializer, PropertyItemSerializer
from .models import Property
from .forms import AddPropertyForm

from django.http import JsonResponse


from rest_framework.request import Request

# Create your views here.


@api_view(['GET'])
def property(request, id):
    try:
        # Retrieve the property instance based on the provided UUID
        property_instance = Property.objects.get(id=id)

        # Serialize the property instance
        serializer = PropertyItemSerializer(property_instance)

        # Return the serialized data
        return Response(data=serializer.data)
    except Property.DoesNotExist:
        # Return a 404 response if the property is not found
        return Response({'error': 'Property not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        # Log the exception and return a 500 response for any unexpected errors
        print(f"Exception: {e}")
        return Response({'error': 'An unexpected error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def properties(request):
    all_properties = Property.objects.all()
    p = PropertySerializer(all_properties, many=True)

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
