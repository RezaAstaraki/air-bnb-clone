from django.urls import path, include, re_path

from .views import landlordsDetail

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('landlords/<uuid:id>', landlordsDetail),
]
