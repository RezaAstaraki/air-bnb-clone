from django.urls import path
from .views import properties, add_property, property, book_property, reservations_list, user_reservations_list


urlpatterns = [
    path('properties/', properties),
    path('properties/create/', add_property),
    path('properties/<uuid:id>/', property),
    path('properties/<uuid:id>/book/', book_property, name='api_book_property'),
    path('properties/<uuid:id>/reservations/',
         reservations_list, name='api_book_reservations'),
    path('myreservations/',
         user_reservations_list, name='user_reservations'),


]
