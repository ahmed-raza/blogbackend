from django.views.generic import TemplateView
from django.shortcuts import redirect

class HomeView(TemplateView):
    template_name = 'main/home.html'
    def get(self, request):
        return redirect('/admin')

home_view = HomeView.as_view()
