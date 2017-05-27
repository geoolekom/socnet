from haystack import indexes
from relations.models import Friendship


class FriendshipIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    pub_date = indexes.DateTimeField(model_attr='created')

    def get_model(self):
        return Friendship

    def index_queryset(self, using=None):
        return self.get_model().objects.all()
