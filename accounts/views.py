from django.http import HttpResponseBadRequest, HttpResponseForbidden
from django.views.generic import RedirectView
from django.core.urlresolvers import reverse_lazy
from django.shortcuts import get_object_or_404

from accounts.tools import get_activation_token
from accounts.models import User


class ActivateView(RedirectView):
    url = reverse_lazy('core:index')

    def get(self, request, *args, **kwargs):
        user_id = int(request.GET.get('uid'))
        if user_id == 0:
            return HttpResponseBadRequest()

        request_token = request.GET.get('token')
        if not request_token:
            return HttpResponseBadRequest()

        user = get_object_or_404(User, id=user_id)
        user_token = get_activation_token(user)
        if request_token != user_token:
            return HttpResponseForbidden()

        if not user.is_active:
            user.is_active = True
            user.save()
        else:
            return HttpResponseForbidden()
        return super(ActivateView, self).get(request, *args, **kwargs)
