from django.urls import path
from .views import properties, add_property


urlpatterns = [
    path('properties/', properties),
    path('properties/create/', add_property),
]
