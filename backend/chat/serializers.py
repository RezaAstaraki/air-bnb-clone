from rest_framework import serializers
from userAccount.models import User
from .models import Conversation, Messages
from property.serializer import LandlordSerializer


class ConversationListSerializer(serializers.ModelSerializer):
    users = LandlordSerializer(many=True)

    class Meta:
        model = Conversation
        fields = '__all__'
