from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User 


class SignUpForm(UserCreationForm):
    class Meta : 
        # here we are telling django that we want to use the User model and wanna show these fields 
        model = User
        fields =['username', 'email', 'password1', 'password2']