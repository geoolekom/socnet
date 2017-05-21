from django.db import models
from core.models import Dated, Deletable

# Create your models here.


class SystemEmail(Dated, Deletable):

    class Meta:
        verbose_name = 'Текст email приложения'
        verbose_name_plural = 'тексты email-ов приложения'

    subject = models.CharField(verbose_name='Заголовок', max_length=128)
    message_text = models.TextField(verbose_name='Сообщение')
    type = models.CharField(max_length=128)

    def __str__(self):
        return '[{0}] {1}'.format(self.type, self.subject)
