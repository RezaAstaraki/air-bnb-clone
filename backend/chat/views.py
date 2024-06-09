from django.http import JsonResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .serializers import ConversationListSerializer
from .models import Conversation
from userAccount.models import User
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

# Create your views here.


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def conversations(request):

    user = request.user
    conversation = user.conversations.all()

    serializer = ConversationListSerializer(conversation, many=True)
    return JsonResponse(data=serializer.data, safe=False)
