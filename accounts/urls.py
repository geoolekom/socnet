from django.conf.urls import url, include
from accounts.views import ActivateView

urlpatterns = [
    url(r'^activate/$', ActivateView.as_view(), name='activate'),
]