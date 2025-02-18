from django.shortcuts import render , redirect
from django.http import * 
from .forms import *
from django.contrib.auth.models import User
# Create your views here.
def index(request):
    return HttpResponse("All is Done")



def profile(request):
    return HttpResponse("This is Profile Page")

from django.views.generic.edit import CreateView
class signup (CreateView):
    model = User
    form_class = SignUpForm
    template_name = 'signup.html'
    def form_valid(self, form):
        user = form.save()
        return redirect('profile_page')