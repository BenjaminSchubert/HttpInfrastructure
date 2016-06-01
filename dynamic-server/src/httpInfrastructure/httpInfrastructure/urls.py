"""httpInfrastructure URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from simpleTODO.views import TodoList, TodoDetails
from authentication.views import UserRegistration, get_csrf_token, login_view, logout_view

urlpatterns = [
    url(r'^auth/csrf$', get_csrf_token),
    url(r'^auth/register/$', UserRegistration.as_view()),
    url(r'^auth/login/$', login_view),
    url(r'^auth/logout/$', logout_view),
    url(r'^todo/$', TodoList.as_view()),
    url(r'^todo/(?P<pk>[0-9]+)/$', TodoDetails.as_view()),
]
