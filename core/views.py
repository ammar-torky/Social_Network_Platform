from django.shortcuts import render , redirect
from django.http import * 
from .forms import *
from django.contrib.auth.models import User

# we gonna use a django decorator to show the selecteed page for only logged in users 
from django.contrib.auth.decorators import login_required

@login_required(login_url='login_page')
def profile(request):

    return render(request , 'profile.html')


from django.views.generic.edit import CreateView
from django.views.generic.edit import CreateView

class signup (CreateView):
    model = User
    form_class = SignUpForm
    template_name = 'signup.html'
    
    def form_valid(self, form):
        user = form.save()
        login(self.request, user)
        return redirect('profile_page')
    
    def get(self, request, *args, **kwargs):
        if self.request.user.is_authenticated:
            return redirect('profile_page')
        return super(signup, self).get(request, *args, **kwargs)
    
# we gonna use this function to check if the user & password is correct or no
from django.contrib.auth import authenticate
# we gonna use this function to login the user
from django.contrib.auth import login
# we gonna use this function to write a message to user then redierct him to the page he want
from django.contrib import messages
def login_page(request):
    if request.user.is_authenticated:
        return redirect('profile_page')
    else:
        if request.method == "GET":
            return render (request, 'login.html')
        elif request.method == "POST":
            username = request.POST.get('username')
            password = request.POST.get('password')
            our_user = authenticate(request,username=username,password=password)
            if our_user is not None:
                login(request,our_user)
                return redirect('profile_page')
            else:
                messages.error(request, "Invalid username or password")
                return redirect('login_page')
        
# now we are gonna work on logut page 
from django.contrib.auth import logout
def logout_me(request):
    logout(request)
    return redirect('login_page')