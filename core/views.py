from django.shortcuts import render , redirect
from django.http import * 
from .forms import *
from .models import *
from django.contrib.auth.decorators import login_required
from django.views.generic.edit import CreateView , UpdateView
from django.views.generic.list import ListView

# we gonna use this function to check if the user & password is correct or no
from django.contrib.auth import authenticate
# we gonna use this function to login the user
from django.contrib.auth import login
# we gonna use this function to write a message to user then redierct him to the page he want if needed 
from django.contrib import messages

from django.contrib.auth import logout

from django.utils.decorators import method_decorator

from django.shortcuts import render, get_object_or_404

@method_decorator(login_required(login_url='login_page'), name='dispatch')
class Profile(ListView):
    model = Post
    template_name = 'profile.html'
    paginate_by = 5
    def get_queryset(self):
        return Post.objects.filter(user = self.request.user).order_by('-date')


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
                return redirect('home_page')
            else:
                messages.error(request, "Invalid username or password")
                return redirect('login_page')
        
# now we are gonna work on logut page 
def logout_me(request):
    logout(request)
    return redirect('login_page')

# we are gonna work on profile page
@method_decorator(login_required(login_url='login_page'), name='dispatch')
class AcoountSettingView(UpdateView):
    model = User
    fields = ['first_name', 'last_name', 'profile_pic','bio' ]
    template_name = 'AccountSetting.html'
    success_url = '/profile'
    def get_object(self, queryset = None):
        return self.request.user
    

@method_decorator(login_required(login_url='login_page'), name='dispatch')
class CreateNewPost(CreateView):
    model = Post 
    template_name = 'new_post.html'
    fields = ['caption', 'target_url', 'description']
    success_url = '/profile'
    def form_valid(self, form):
        user = self.request.user
        form.instance.user = self.request.user
        return super().form_valid(form)
    
@method_decorator(login_required(login_url='login_page'), name='dispatch')
class FriendProfile(ListView):
    model = Post
    template_name = 'friend_profile.html'
    paginate_by = 5
    
    # this method check the logged in user are similar to the user we are trying to access and if it are same redirect it to profile page man 
    def get(self, *args, **kwargs):
        friend_username = self.kwargs['username'] # usernmae in url line 
        logged_in_username = self.request.user.username
        if friend_username == logged_in_username:
            return redirect('profile_page')
        else:
            return super(FriendProfile, self).get( *args, **kwargs) 


    # this method are used to send the data to the template
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # change condition to the onwer of the page
        friend_username = self.kwargs['username'] # usernmae in url line 
        friend = User.objects.get(username=friend_username) # to get the user from database
        context['friend'] = friend
        
        #  الجزء دا خاص بحتة اظهار واخفاء زرار المتابعة والغاء المتابعة
        is_following  = self.request.user.is_following(friend)
        context['is_following'] = is_following
        
        return context
        

    def get_queryset(self):
        # change condition to the onwer of the page
        friend_username = self.kwargs['username'] # usernmae in url line 
        friend = User.objects.get(username=friend_username) # to get the user from database
        return Post.objects.filter(user = friend).order_by('-date')
    
    # here we gonna create the list view for seaching the user
@method_decorator(login_required(login_url='login_page'), name='dispatch')
class SearchResult(ListView):
    model = User
    template_name = 'search_result.html'
    paginate_by = 5
    
    def get_queryset(self):
        searched_item = self.request.GET.get('search-term')
        returnd_from_Database = User.objects.filter(username__icontains=searched_item)
        return returnd_from_Database
    

@login_required(login_url='login_page')
def follow_user(request, id ):
    user_A = request.user
    user_B = User.objects.get(id=id) 
    new_friend = Friends(user_A = user_A , user_B = user_B)
    new_friend.save() #   كدا تم الحفظ فالداتا بيز 

    return redirect('/user/'+user_B.username)

@login_required(login_url='login_page')
def unfollow_user(request, id ):
    user_A = request.user
    user_B = User.objects.get(id=id)
    Friends.objects.filter(user_A=user_A, user_B=user_B).delete()

    return redirect('/user/'+user_B.username)


# working on home page 
@method_decorator(login_required(login_url='login_page'), name='dispatch')
class HomePage(ListView):
    model = Post
    template_name = 'home_page.html'
    paginate_by = 10

    def get_queryset(self):
        followings = self.request.user.get_followings()
        return Post.objects.filter(user_id__in = followings ).order_by('-date')

# this get post detail 
@login_required(login_url='login_page')
def post_detail(request, id):
    post = get_object_or_404(Post, id=id)
    return render(request, 'post_detail.html', {'post': post}) 