from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

class User(AbstractUser):
    # following = models.ManyToManyField('self', symmetrical=False, related_name='followers')

    groups = models.ManyToManyField(
        'auth.Group',
        blank=True,
        related_name='custom_user_set',
        related_query_name='custom_user'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        blank=True,
        related_name='custom_user_set',
        related_query_name='custom_user'
    )
    def save(self, *args, **kwargs):
        created = not self.pk
        super().save(*args, **kwargs)
        if created:
            Profile.objects.create(user=self)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    following = models.ManyToManyField('self', symmetrical=False, related_name='followers')
    first_name = models.CharField(max_length=30, default='')
    last_name = models.CharField(max_length=30, default='')
    
    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance, first_name=instance.first_name, last_name=instance.last_name)
        else:
            instance.profile.save()
    
    def __str__(self):
        return self.user.username

    def save(self, *args, **kwargs):
        if not self.first_name:
            self.first_name = self.user.first_name
        if not self.last_name:
            self.last_name = self.user.last_name
        super(Profile, self).save(*args, **kwargs)

class Post(models.Model):
    content = models.CharField(max_length=280)
    created_date = models.DateTimeField(auto_now_add=True)
    poster = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="get_all_posts")
    likes = models.ManyToManyField(Profile, blank=True, related_name="get_all_liked_posts")

    def __str__(self):
        return self.poster