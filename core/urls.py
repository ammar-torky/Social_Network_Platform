from django.urls import path
from .views import * 

urlpatterns = [
    path('',login_page,name='login_page'),
    path('profile/', profile, name='profile_page'),
    path('signup/', signup.as_view(), name='signup_page'),

]
