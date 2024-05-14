from django.urls import path, include, re_path

urlpatterns = [
    re_path(r'^auth/', include('djoser.urls')),
]
