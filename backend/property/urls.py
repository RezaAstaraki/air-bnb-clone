from django.urls import path
from .views import properties, add_property, property, book_property


urlpatterns = [
    path('properties/', properties),
    path('properties/create/', add_property),
    path('properties/<uuid:id>/', property),
    path('properties/<uuid:id>/book/', book_property, name='api_book_property'),

]
