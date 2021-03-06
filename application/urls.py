"""application URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
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
from django.conf.urls import url, include
from django.contrib import admin
from django.conf import settings

from api.routers import router
from rest_framework.authtoken import views
from api.views import ProfileAPIView

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/v1/', include(router.urls, namespace='api')),
    url(r'^api/v1/auth/', views.obtain_auth_token),
    url(r'^api/v1/profile/', ProfileAPIView.as_view()),
    url(r'^accounts/', include('accounts.urls', namespace='accounts')),
    url(r'^social/', include('social_django.urls', namespace='social')),
    url(r'^search/', include('search.urls', namespace='search')),
    url(r'^', include('core.urls', namespace='core')),
]

if settings.DEBUG:
    import debug_toolbar

    urlpatterns += [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ]

