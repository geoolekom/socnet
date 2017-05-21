# coding=utf-8
from django.conf import settings
from hashlib import sha256


def get_activation_token(user):
    user_string = (str(user.id) + str(user.email) + settings.SECRET_KEY).encode('utf-8')
    return sha256(user_string).hexdigest()
