from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

class User(AbstractUser):
    pass

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    followers_count = models.PositiveIntegerField(default=0)
    following_count = models.PositiveIntegerField(default=0)
    following = models.ManyToManyField('self', symmetrical=False, related_name='followers')
    followers = models.ManyToManyField('self', symmetrical=False, related_name='following_profiles')

    def __str__(self):
        return self.user.username

class Post(models.Model):
    content = models.CharField(max_length=280)
    created_date = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="get_all_posts")
    likes = models.ManyToManyField(Profile, blank=True, related_name="get_all_liked_posts")
