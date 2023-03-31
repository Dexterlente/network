from rest_framework.serializers import ModelSerializer
from .models import User, Profile, Post
from rest_framework import serializers


class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'