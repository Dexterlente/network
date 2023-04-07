from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

class User(AbstractUser):
    pass

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    following = models.ManyToManyField('self', symmetrical=False, related_name='followers')
    
    def __str__(self):
        return self.user.username


class Post(models.Model):
    content = models.CharField(max_length=280)
    created_date = models.DateTimeField(auto_now_add=True)
    poster = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="get_all_posts")
    likes = models.ManyToManyField(Profile, blank=True, related_name="get_all_liked_posts")

    def __str__(self):
        return self.poster