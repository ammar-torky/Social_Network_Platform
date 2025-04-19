from django.contrib.auth.forms import UserCreationForm
from .models import *
from django import forms


class SignUpForm(UserCreationForm):
    class Meta : 
        # here we are telling django that we want to use the User model and wanna show these fields 
        model = User
        fields =['username', 'email', 'password1', 'password2']
    
class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['caption', 'target_url', 'description']