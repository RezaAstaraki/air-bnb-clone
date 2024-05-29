from django.db import models
import uuid
from django.conf import settings
from userAccount.models import User

# Create your models here.


class Property(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)

    landlord = models.ForeignKey(User, on_delete=models.CASCADE)

    title = models.CharField(max_length=255)
    descriptions = models.CharField(max_length=255)
    price_per_night = models.IntegerField()
    bedrooms = models.IntegerField()
    bathrooms = models.IntegerField()
    guests = models.IntegerField()
    country = models.CharField(max_length=255)
    country_code = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    # favorited

    image = models.ImageField(null=True,
                              upload_to='property',
                              height_field=None, width_field=None, max_length=None)

    # landlord
    created_at = models.DateTimeField(auto_now_add=True)

    def image_url(self):
        url = f'{settings.WEBSITE_URL}{self.image.url}'
        return url
