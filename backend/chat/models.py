from django.db import models
import uuid
from userAccount.models import User


# Create your models here.
class Conversation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    users = models.ManyToManyField(User, related_name='conversations')
    created_at = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)


class Messages(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    conversation = models.ForeignKey(
        Conversation, on_delete=models.CASCADE, related_name='messages')
    sent_to = models.ForeignKey(
        User, related_name='received_messages', on_delete=models.CASCADE)
    created_by = models.ForeignKey(
        User, related_name='sent_messages', on_delete=models.CASCADE)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
