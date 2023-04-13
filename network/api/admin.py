from django.contrib import admin

# Register your models here.
from .models import User, Profile, Post

admin.site.register(User)
admin.site.register(Profile)
admin.site.register(Post)