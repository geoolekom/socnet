"""
Django settings for application project.

Generated by 'django-admin startproject' using Django 1.11.1.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.11/ref/settings/
"""

import os
from configparser import ConfigParser
import djcelery
from kombu import Queue

# BASE SETTINGS
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJECT_NAME = os.path.basename(os.path.dirname(BASE_DIR))
VERSION = '1.1.4'

SITE_URL = 'http://socnet.local'
ADMINS = (
    ('Egor', 'geoolekom@gmail.com'),
)

# CONFIG
config = ConfigParser()
config.read(os.path.join(BASE_DIR, '../{0}.conf'.format(PROJECT_NAME)))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config.get('security', 'SECRET')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config.get('debug', 'DEBUG')
INTERNAL_IPS = []
DEBUG_APPS = []
ALLOWED_HOSTS = []

if DEBUG:
    INTERNAL_IPS = ['127.0.0.1', ]
    DEBUG_APPS = ['debug_toolbar', ]
    DEV_HOSTS = ['socnet.local', 'localhost', ]


# REST API
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DATETIME_FORMAT': '%d.%m.%Y, %H:%M:%S',
    'DEFAULT_FILTER_BACKENDS': ('django_filters.rest_framework.DjangoFilterBackend',)
    # 'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    # 'PAGE_SIZE': 5
}

# Application definition
AUTH_USER_MODEL = 'accounts.User'

PROJECT_APPS = [
    'social_django',
    'rest_framework',
    'django_filters',
    'rest_framework.authtoken',
    'djcelery',
    'haystack',
    'core.apps.CoreConfig',
    'accounts.apps.AccountsConfig',
    'posts.apps.PostsConfig',
    'comments.apps.CommentsConfig',
    'likes.apps.LikesConfig',
    'chats.apps.ChatsConfig',
    'relations.apps.RelationsConfig',
    'mailing.apps.MailingConfig',
    'react',
]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

INSTALLED_APPS += DEBUG_APPS
INSTALLED_APPS += PROJECT_APPS

SOCIAL_AUTH_VK_OAUTH2_KEY = config.get('oauth', 'VK_KEY')
SOCIAL_AUTH_VK_OAUTH2_SECRET = config.get('oauth', 'VK_SECRET')
SOCIAL_AUTH_VK_SCOPE = ['email', 'password']

AUTHENTICATION_BACKENDS = [
    'social_core.backends.vk.VKOAuth2',
    'django.contrib.auth.backends.ModelBackend'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'debug_toolbar.middleware.DebugToolbarMiddleware',
]

ROOT_URLCONF = 'application.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'core.processors.static'
            ],
        },
    },
]

# WSGI
WSGI_APPLICATION = 'application.wsgi.application'

# DATABASES
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config.get('db', 'NAME'),
        'USER': config.get('db', 'USER'),
        'PASSWORD': config.get('db', 'PASSWORD'),
        'HOST': config.get('db', 'HOST'),
        'PORT': config.get('db', 'PORT'),
    }
}

# PASSWORD VALIDATION
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# I18N
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# MAILING
EMAIL_HOST = config.get('mailing', 'HOST')
EMAIL_PORT = config.get('mailing', 'PORT')
SENDER_EMAIL = config.get('mailing', 'SENDER')
SERVER_EMAIL = config.get('mailing', 'SERVER')
UNSUBSCRIBE_TOKEN = config.get('security', 'UNSUBSCRIBE_TOKEN')

# CELERY
djcelery.setup_loader()

BROKER_URL = 'redis://localhost:6379/0'

CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
CELERY_TASK_RESULT_EXPIRES = 7 * 86400

CELERY_SEND_EVENTS = True
CELERY_SEND_TASK_ERROR_EMAILS = True

CELERYBEAT_SCHEDULER = "djcelery.schedulers.DatabaseScheduler"
CELERY_ALWAYS_EAGER = False
CELERY_TIMEZONE = 'Europe/Moscow'

CELERY_DEFAULT_QUEUE = 'default'

CELERY_QUEUES = (
    Queue('default', routing_key='task.#'),
)

TEST_RUNNER = 'djcelery.contrib.test_runner.CeleryTestSuiteRunner'

# Static files (CSS, JavaScript, Images)

STATIC_URL = '/static/'
STATIC_ROOT = '/home/geoolekom/code/socnet/collected_static/'

# DATE AND TIME
DATETIME_FORMAT = '%Y-%m-%dT%H:%M:%S'

# HAYSTACK
HAYSTACK_CONNECTIONS = {
    'default': {
        'ENGINE': 'haystack.backends.whoosh_backend.WhooshEngine',
        'PATH': os.path.join(BASE_DIR, '../whoosh_index'),
    }
}

HAYSTACK_SIGNAL_PROCESSOR = 'haystack.signals.RealtimeSignalProcessor'
