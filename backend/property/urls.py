from django.urls import path
from .views import properties


urlpatterns = [
    path('properties/', properties),
]
