from rest_framework.serializers import Serializer, ModelSerializer
from .models import Property


class PropertySerializer(ModelSerializer):
    # model = Property

    class Meta:
        model = Property

        fields = ['id', 'title', 'price_per_night', 'image_url']


class PropertyItemSerializer(ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'
