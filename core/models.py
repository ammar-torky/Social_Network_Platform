from django.db import models
from django.contrib.auth.models import AbstractUser 
# Create your models here.

# here we are inherit from user model and add what we need
class User(AbstractUser):
    profile_pic = models.ImageField(default='profile_pics/default.jpg',upload_to='profile_pics')
    bio = models.TextField(null = True ,max_length=500,blank=True)