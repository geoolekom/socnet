from django.contrib.auth.models import AbstractUser
from django.db import models
from core.models import Dated


class User(AbstractUser, Dated):
    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    is_active = models.BooleanField('Активирован?', default=False)
