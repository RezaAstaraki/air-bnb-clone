"""
ASGI config for django_backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

from chat.token_auth import TokenAuthMiddleware
from chat import routing
import os

from channels.auth import AuthMiddleware
from channels.routing import ProtocolTypeRouter
from channels.security.websocket import AllowedHostsOriginValidator

from django.core.asgi import get_asgi_application


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_backend.settings')

application = get_asgi_application()

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': TokenAuthMiddleware(
        URLROUTER(
            routing.websoket_urlpatterns
        )
    )
})
