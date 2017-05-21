from django.db.models import signals, Q
from django.dispatch import receiver

from relations.models import FriendshipRequest, Friendship


@receiver(signals.post_save, sender=FriendshipRequest)
def add_friendship_if_accepted(instance, created=False, *args, **kwargs):
    if instance.accepted:
        Friendship.objects.create(person=instance.author, friend=instance.target)


@receiver(signals.post_save, sender=Friendship)
def duplicate_friendship(instance, created=False, *args, **kwargs):
    Friendship.objects.get_or_create(person=instance.friend, friend=instance.person)


@receiver(signals.post_delete, sender=Friendship)
def delete_on_friendship_delete(instance, *args, **kwargs):
    Friendship.objects.filter(person=instance.friend, friend=instance.person).delete()
    FriendshipRequest.objects \
        .filter(Q(author=instance.person, target=instance.friend) | Q(author=instance.friend, target=instance.person)) \
        .delete()
