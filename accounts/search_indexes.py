from haystack import indexes
from accounts.models import User


class AccountIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    pub_date = indexes.DateTimeField(model_attr='created')

    def get_model(self):
        return User

    def index_queryset(self, using=None):
        return self.get_model().objects.filter(is_active=True)
