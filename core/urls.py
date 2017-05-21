from django.conf.urls import url

from core.views import IndexView
from accounts.views import ActivateView

urlpatterns = [
    url(r'^', IndexView.as_view(), name='index'),
]
