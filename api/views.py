from django.db.models import Q
from rest_framework import viewsets, views

from rest_framework.permissions import IsAuthenticated
from api.permissions import IsChatParticipantOrAuthor, IsAuthor, IsAuthorOrReadOnly, IsAdminOrReadOnly, IsConsumer, \
    IsAdminOrCanRegister, IsPersonOrReadOnly, IsAuthorOrTargetOrReadOnly
import api.serializers

from accounts.models import User
from chats.models import Chat, Message
from comments.models import Comment
from posts.models import Post
from likes.models import Like
from relations.models import Friendship, FriendshipRequest


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = IsAdminOrCanRegister,

    def get_serializer_class(self):
        if self.action == 'retrieve' and self.get_object() == self.request.user or self.action == 'create':
            return api.serializers.ProfileSerializer
        else:
            return api.serializers.UserSerializer

    def perform_create(self, serializer):
        user = User(**serializer.validated_data)
        user.set_password(serializer.validated_data['password'])
        user.save()


class ChatViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = api.serializers.ChatSerializer
    permission_classes = IsChatParticipantOrAuthor,

    def get_queryset(self):
        uid = self.request.user.id
        return Chat.objects.filter(participants__id=uid).prefetch_related('author')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = api.serializers.MessageSerializer
    permission_classes = (IsAuthor, IsAuthenticated,)

    def get_queryset(self):
        return Message.objects.filter(
            Q(author_id=self.request.user.id) | Q(chat_id__in=self.request.user.chat_set.all())
        ).prefetch_related('author')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = api.serializers.PostSerializer
    permission_classes = IsAuthorOrReadOnly,

    def get_queryset(self):
        return self.queryset.prefetch_related('author')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = api.serializers.CommentSerializer
    permission_classes = IsAuthorOrReadOnly,

    def get_queryset(self):
        return self.queryset.prefetch_related('author')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = api.serializers.LikeSerializer
    permission_classes = IsAuthorOrReadOnly,


class FriendshipViewSet(viewsets.ModelViewSet):
    queryset = Friendship.objects.all()
    serializer_class = api.serializers.FriendshipSerializer
    permission_classes = IsPersonOrReadOnly,

    def get_queryset(self):
        if self.request.user.is_authenticated():
            return self.queryset.filter(person=self.request.user)
        return self.queryset.none()


class FriendshipRequestViewSet(viewsets.ModelViewSet):
    queryset = FriendshipRequest.objects.all()
    serializer_class = api.serializers.FriendshipRequestSerializer
    permission_classes = (IsAuthorOrTargetOrReadOnly, )

    def get_queryset(self):
        if self.request.user.is_authenticated():
            return self.queryset.filter(Q(author_id=self.request.user.id) | Q(target_id=self.request.user.id))
        return self.queryset.none()

from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response


class LoginView(views.APIView):
    authentication_classes = SessionAuthentication,
    permission_classes = IsAuthenticated,

    def get(self, request, format=None):
        content = {
            'user': str(request.user),  # `django.contrib.auth.User` instance.
            'auth': str(request.auth),  # None
        }
        return Response(content)
