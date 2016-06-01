from django.apps import AppConfig
from rest_framework.authentication import SessionAuthentication as RestSessionAuthentication


class AuthenticationConfig(AppConfig):
    name = 'authentication'


class SessionAuthentication(RestSessionAuthentication):
    def authenticate_header(self, request):
        return "session"
