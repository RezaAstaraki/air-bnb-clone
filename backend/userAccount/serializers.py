# serializers.py
from djoser.serializers import UserSerializer as DjoserUserSerializer
from rest_framework import serializers
from property.serializer import PropertySerializer
from .models import User


class CustomUserSerializer(DjoserUserSerializer):
    avatar = serializers.ImageField()

    class Meta(DjoserUserSerializer.Meta):
        fields = DjoserUserSerializer.Meta.fields + ('avatar',)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['avatar'] = instance.avatar.url if instance.avatar else None
        return data


# from property.serializer import LandlordSerializer
class LandLordDetailSerializer(serializers.ModelSerializer):

    properties = PropertySerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'name', 'avatar', 'properties']
