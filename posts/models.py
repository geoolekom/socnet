from django.db import models
from core.models import Authored, Dated, Titled, Deletable, Consumed, BoundAble
from likes.models import LikeAble


class Post(Authored, Dated, Titled, Deletable, LikeAble):
    content = models.TextField(verbose_name=u'Содержание')

    class Meta:
        verbose_name = 'Пост'
        verbose_name_plural = 'Посты'

    def __str__(self):
        return 'пост "{0}: {1}"'.format(self.author.username, self.title)
