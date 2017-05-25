from rest_framework import serializers

from accounts.models import User
from chats.models import Chat, Message
from comments.models import Comment
from likes.models import Like
from relations.models import Friendship, FriendshipRequest
from posts.models import Post


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'description', )


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'password', 'description', )


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('id', 'author', 'chat', 'pub_time', 'upd_time', 'content', 'created', )


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ('id', 'title', 'participants', )


class PostSerializer(serializers.ModelSerializer):
    like_count = serializers.ReadOnlyField(source='likes.count')
    author = serializers.ReadOnlyField(source='author.id')

    class Meta:
        model = Post
        fields = ('id', 'author', 'title', 'content', 'like_count', 'created', )


class CommentSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.id')
    post = serializers.ReadOnlyField(source='post.id')
    like_count = serializers.ReadOnlyField(source='likes.count')

    class Meta:
        model = Comment
        fields = ('id', 'author', 'post', 'content', 'like_count', 'created', )


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ('id', 'author', 'target_content_type', 'target_id', )


class FriendshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friendship
        fields = ('id', 'person', 'friend', 'created')


class FriendshipRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendshipRequest
        fields = ('id', 'author', 'target', 'accepted', )
