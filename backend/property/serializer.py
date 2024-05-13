from rest_framework.serializers import Serializer,ModelSerializer
from .models import Property

class PropertySerializer(ModelSerializer):
    # model = Property

    class Meta:
        model = Property

        fields ='__all__'