
from rest_framework.decorators import api_view
from django.db.models import Q
from rest_framework_simplejwt import tokens
from rest_framework.serializers import Serializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from userAccount.models import User


from rest_framework.response import Response
from .serializer import PropertySerializer, PropertyItemSerializer, ReservationSerializer, ReservationSerializer_, UserReservationSerializer
from .models import Property, Reservation
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
        serializer = PropertyItemSerializer(
            property_instance, context={'request': request})

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
def properties(request: Request):

    minPrice = request.GET.get('minPrice')
    maxPrice = request.GET.get('maxPrice')
    startDate = request.GET.get('startDate')
    endDate = request.GET.get('endDate')
    bedrooms = request.GET.get('bedrooms')
    bathrooms = request.GET.get('bathrooms')
    country = request.GET.get('country')
    guests = request.GET.get('guests')
    myfavorites = request.GET.get('myfavorites')
    access = request.COOKIES.get('session_access_token')
    categories = request.GET.get('category')

    if startDate and endDate:
        exact_matches = Reservation.objects.filter(
            Q(start_date=startDate) | Q(end_date=endDate)
        )
        overlap_matches = Reservation.objects.filter(
            start_date__lte=endDate, end_date__gte=startDate
        )
        all_matches = set(exact_matches.values_list('property_id', flat=True)) | \
            set(overlap_matches.values_list('property_id', flat=True))
        all_properties = Property.objects.exclude(id__in=all_matches)
    else:
        all_properties = Property.objects.all()

    query_object = Q()

    if categories:
        for q in categories.split(','):
            query_object |= Q(category=q)

    if minPrice:
        all_properties = all_properties.filter(price_per_night__gte=minPrice)
    if maxPrice:
        all_properties = all_properties.filter(price_per_night__lte=maxPrice)
    if guests:
        query_object &= Q(guests__gte=guests)
    if bedrooms:
        query_object &= Q(bedrooms__gte=bedrooms)
    if bathrooms:
        query_object &= Q(bathrooms__gte=bathrooms)
    if country:
        query_object &= Q(country=country)

    all_properties = all_properties.filter(query_object)

    if access:
        acc = tokens.AccessToken(access)
        user_id = acc.payload.get('user_id')
        if user_id:
            user = User.objects.get(pk=user_id)

            if myfavorites:
                all_properties = all_properties.filter(favorite=user)

            p = PropertySerializer(
                all_properties, many=True, context={'user': user})
        else:
            p = PropertySerializer(all_properties, many=True)
    else:
        p = PropertySerializer(all_properties, many=True)

    return Response(data=p.data)


@api_view(['POST', 'File'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def add_property(request: Request):

    form = AddPropertyForm(request.POST, request.FILES)
    if form.is_valid():
        property = form.save(commit=False)
        property.landlord = request.user
        property.save()

        return JsonResponse({'success': True})
    else:

        print('errors', form.errors, form.non_field_errors)

        return JsonResponse({'errors': form.errors.as_json()})


@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def book_property(request: Request, id):

    # request.POST.
    # print(request.POST)

    try:
        start_date = request.POST.get('start_date', '')
        end_date = request.POST.get('end_date', '')
        number_of_nights = request.POST.get('number_of_nights', '')
        number_of_guests = request.POST.get('number_of_guests', '')
        total_price = request.POST.get('total_price', '')
        reserver = request.user
        property = Property.objects.get(pk=id)
        Reservation.objects.create(
            property=property,
            reserver=reserver,
            start_date=start_date,
            end_date=end_date,
            number_of_guests=number_of_guests,
            number_of_nights=number_of_nights,
            total_price=total_price
        )

        return JsonResponse({'success': True})

    except Exception as e:
        print('Error', e)
        return JsonResponse({'success': False})


@api_view(['GET'])
def reservations_list(request, id):
    property = Property.objects.get(pk=id)
    all_reservations = property.reservations.all()
    serializer = ReservationSerializer(all_reservations, many=True)

    return JsonResponse(data=serializer.data, safe=False)


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def user_reservations_list(request):
    user: User = request.user
    # serializer = Serializer(instance=res, many=True)
    # user_reservations = user.reservations.all()
    serializer = UserReservationSerializer(user, many=False)

    return JsonResponse(serializer.data, safe=False)
    # return JsonResponse(data=serializer.data, safe=False)


@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def toggle_favorite(request: Request, id):
    user = request.user
    property = Property.objects.get(pk=id)

    if user in property.favorite.all():
        property.favorite.remove(user)
        return JsonResponse({'code': 'success', 'message': 'removed'})
    else:
        property.favorite.add(user)
        return JsonResponse({'code': 'success', 'message': 'add'})
