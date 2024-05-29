from django.urls import path
from .views import properties, add_property, property


urlpatterns = [
    path('properties/', properties),
    path('properties/create/', add_property),
    path('properties/<uuid:id>/', property),

]
