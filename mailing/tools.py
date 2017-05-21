from django.template import Template, Context
from django.core.mail import EmailMessage
from django.conf import settings

from mailing.models import SystemEmail


def send_system_email(email_type, user, context):
    if not user.email:
        return
    email = SystemEmail.objects.filter(type=email_type, deleted=False).first()
    if not email:
        return
    else:
        subject, template_text = email.subject, email.message_text
    rendered_text = Template(template_text).render(Context(context))

    msg = EmailMessage(subject, rendered_text, settings.SENDER_EMAIL, [user.email])
    msg.content_subtype = "html"
    msg.send()
