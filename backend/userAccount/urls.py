from django.urls import path, include, re_path

urlpatterns = [
    path('auth/', include('djoser.urls')),
]
