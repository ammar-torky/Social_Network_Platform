from django.db import models
from django.contrib.auth.models import AbstractUser 
# Create your models here.

# here we are inherit from user model and add what we need
class User(AbstractUser):
    profile_pic = models.ImageField(default='profile_pics/default.jpg',upload_to='profile_pics')
    bio = models.TextField(null = True ,max_length=500,blank=True,default='')
    # this is a function to return number of posts
    def get_num_posts(self):
        return Post.objects.filter(user=self).count()

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    caption = models.TextField(max_length=600 , null=False)
    date = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.caption 