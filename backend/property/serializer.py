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

    class Meta:
        model = Reservation
        fields = '__all__'
