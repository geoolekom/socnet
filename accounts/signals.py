from django.db.models import signals
from django.dispatch import receiver

from accounts.models import User
from accounts.tasks import send_activation_email
from rest_framework.authtoken.models import Token


@receiver(signals.post_save, sender=User)
def send_activation_email_on_create(instance, created=False, *args, **kwargs):
    if created:
        send_activation_email.delay(instance)


@receiver(signals.post_save, sender=User)
def send_activation_email_on_create(instance, created=False, *args, **kwargs):
    if created:
        Token.objects.create(user=instance)
