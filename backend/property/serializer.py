from rest_framework.serializers import Serializer, ModelSerializer
from .models import Property, Reservation
from userAccount.models import User


class PropertySerializer(ModelSerializer):
    class Meta:
        model = Property

        fields = ['id', 'title', 'price_per_night', 'image_url']


class LandlordSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'name', 'avatar']


class PropertyItemSerializer(ModelSerializer):
    landlord = LandlordSerializer()

    class Meta:
        model = Property
        exclude = ['created_at']


class ReservationSerializer(ModelSerializer):
    property = PropertySerializer(read_only=True, many=False)

    class Meta:
        model = Reservation
        fields = ['property', 'start_date', 'end_date',
                  'number_of_guests', 'number_of_nights', 'total_price']
