from django.conf import settings


def static(request):
    return {
        'STATIC_VERSION': settings.VERSION
    }
