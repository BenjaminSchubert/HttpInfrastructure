from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.views.decorators.debug import sensitive_post_parameters
from django.views.decorators.http import require_POST, require_GET, require_safe
from rest_framework import generics, permissions

from authentication.serializers import UserSerializer


@require_safe
@ensure_csrf_cookie
def get_csrf_token(request):
    return HttpResponse('')


@require_POST
@sensitive_post_parameters("password")
@csrf_protect
@never_cache
def login_view(request, authentication_form=AuthenticationForm):
    form = authentication_form(request, data=request.POST)

    if form.is_valid():
        login(request, form.get_user())

        return HttpResponse('')

    if form.non_field_errors() is None:
        errors = form.errors
    else:
        errors = {"global": "Username not recognized or password incorrect"}
    return JsonResponse(errors, status=401)


@require_GET
def logout_view(request):
    logout(request)
    return HttpResponse("")


class UserRegistration(generics.CreateAPIView):
    permission_classes = [
        permissions.AllowAny  # Or anonymous users can't register
    ]

    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)

        user = authenticate(**request.data)

        if user.is_active:
            login(request, user)

        return response
