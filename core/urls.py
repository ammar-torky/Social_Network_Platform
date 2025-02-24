from django.urls import path
from .views import * 

urlpatterns = [
    path('',login_page,name='login_page'),
    path('profile/', Profile.as_view(), name='profile_page'),
    path('signup/', signup.as_view(), name='signup_page'),
    path('logout/', logout_me, name='logout_page'),
    path('settings/',AcoountSettingView.as_view(), name='accountsettings'),
    path('newpost/',CreateNewPost.as_view(), name='newpost'),

]
