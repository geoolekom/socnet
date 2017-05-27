from django.db.models import Q
from django.core.exceptions import ValidationError
from rest_framework.exceptions import ValidationError as APIValidationError
from rest_framework import viewsets, generics, views

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


class GetParametersViewSet(viewsets.ModelViewSet):

    def filter_queryset(self, queryset):
        kwargs = {}
        serializer_fields = self.get_serializer().fields.keys()
        for field in queryset.model._meta.fields:
            if field.name in self.request.GET and field.name in serializer_fields:
                value = self.request.GET.getlist(field.name)
                errors = []
                for element in value:
                    try:
                        field.to_python(element)
                    except ValidationError as e:
                        errors.extend(e.messages)
                if errors:
                    raise APIValidationError(errors)

                if len(value) == 1:
                    kwargs[field.name] = value[0]
                elif len(value) > 1:
                    kwargs['{0}__in'.format(field.name)] = value
        return queryset.filter(**kwargs)


class ProfileAPIView(generics.ListAPIView):

    serializer_class = api.serializers.ProfileSerializer
    permission_classes = IsAuthenticated,

    def get_queryset(self):
        return [self.request.user]


class UserViewSet(GetParametersViewSet):
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
        return Chat.objects.filter(participants__id=uid)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class MessageViewSet(GetParametersViewSet):
    queryset = Message.objects.all()
    serializer_class = api.serializers.MessageSerializer
    permission_classes = (IsAuthor, IsAuthenticated, )

    def get_queryset(self):
        return super(MessageViewSet, self).get_queryset().filter(
            Q(author_id=self.request.user.id) | Q(chat_id__in=self.request.user.chat_set.all())
        ).prefetch_related('author')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostViewSet(GetParametersViewSet):
    queryset = Post.objects.all()
    serializer_class = api.serializers.PostSerializer
    permission_classes = IsAuthorOrReadOnly,

    def get_queryset(self):
        return super(PostViewSet, self).get_queryset().prefetch_related('author')

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
    permission_classes = IsPersonOrReadOnly, IsAuthenticated

    def get_queryset(self):
        return super(FriendshipViewSet, self).get_queryset().filter(person=self.request.user)


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
