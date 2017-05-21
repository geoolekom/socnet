from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from chats.admin import ChatsInline, Chat


@admin.register(get_user_model())
class UserAdmin(BaseUserAdmin):
    add_fieldsets = (
        (None, {
            'fields': ('username', 'email', 'password1', 'password2'),
        }),
    )
    inlines = ChatsInline,


class AccountsInline(admin.StackedInline):
    model = Chat.participants.through
    extra = 0
