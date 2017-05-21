from django.conf import settings
from django.core.urlresolvers import reverse

from urllib.parse import urljoin, urlencode

from application.celery import app
from accounts.tools import get_activation_token

from mailing.tools import send_system_email


@app.task
def send_activation_email(new_user):
    link_params = {
        'token': get_activation_token(new_user),
        'uid': new_user.id,
    }
    link = urljoin(settings.SITE_URL, reverse('accounts:activate')) + '?' + urlencode(link_params)
    context = {
        'user': new_user,
        'link': link,
    }
    send_system_email('activate', new_user, context)
