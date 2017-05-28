from django.db import models

from core.models import Authored, Dated, BoundAble, Deletable
from posts.models import Post
from likes.models import LikeAble


class Comment(Authored, Dated, Deletable, LikeAble):
    post = models.ForeignKey(Post, verbose_name='Пост')
    content = models.TextField(verbose_name='Содержание')

    class Meta:
        verbose_name = 'Комментарий'
        verbose_name_plural = 'Комментарии'

    def __str__(self):
        return 'Коммент {0} на посте с id = {1}: {2}'.format(self.author, self.post.id, self.content)

