from haystack.forms import ModelSearchForm
from django.http import JsonResponse
from django.views.generic import View


class JsonSearchView(View):
    http_method_names = ['get']
    form = None
    queryset = []

    def dispatch(self, request, *args, **kwargs):
        self.form = ModelSearchForm(request.GET)
        return super(JsonSearchView, self).dispatch(request, *args, **kwargs)

    def get(self, *args, **kwargs):
        if self.form.is_valid():
            self.queryset = self.form.search()

        response = {}
        for result in self.queryset:
            if result.model_name in response:
                response[result.model_name].append(result.object.id)
            else:
                response[result.model_name] = [result.object.id]
        return JsonResponse(response)
