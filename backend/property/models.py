from django.db import models

# Create your models here.
class Property(models.Model):
    name = models.CharField(max_length=255)
    price_per_night = models.IntegerField()
    descriptions = models.CharField(max_length=255)
    # image = models.ImageField()
