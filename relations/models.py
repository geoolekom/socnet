from django.db import models
from django.conf import settings

from core.models import Authored, Dated


class FriendshipRequest(Authored, Dated):
    target = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='Цель')
    accepted = models.NullBooleanField(verbose_name='Принят?', null=True, blank=True)

    class Meta:
        verbose_name = 'Запрос в друзья'
        verbose_name_plural = 'Запросы в друзья'
        unique_together = (('author', 'target'),)

    def __str__(self):
        return '{0} хочет подружиться с {1}'.format(self.author, self.target)


class Friendship(Dated):
    person = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        verbose_name='Пользователь',
        related_name='friends'
    )
    friend = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        verbose_name='Друг',
        related_name='+'
    )

    class Meta:
        verbose_name = 'Запись о дружбе'
        verbose_name_plural = 'Записи о дружбе'
        unique_together = (('person', 'friend'),)
        default_permissions = ('add', 'delete',)

    def __str__(self):
        return '{0} дружит с {1}'.format(self.person, self.friend)
