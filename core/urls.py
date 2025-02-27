from django.urls import path
from .views import * 

urlpatterns = [
    path('',login_page,name='login_page'),
    path('profile/', Profile.as_view(), name='profile_page'),
    path('signup/', signup.as_view(), name='signup_page'),
    path('logout/', logout_me, name='logout_page'),
    path('settings/',AcoountSettingView.as_view(), name='accountsettings'),
    path('newpost/',CreateNewPost.as_view(), name='newpost'),
    path('user/<str:username>/', FriendProfile.as_view(), name='friend_profile_page'),
    path('search/', SearchResult.as_view(), name='search_page'),
    path('follow/<int:id>', follow_user, name='follow_user'),
    path('unfollow/<int:id>', unfollow_user, name='unfollow_user'),
    path('home/', HomePage.as_view(), name='home_page'),






]
