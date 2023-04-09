from rest_framework.serializers import ModelSerializer
from .models import User, Profile, Post
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError


class ProfileSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField(source='user.id')
    profile_username = serializers.ReadOnlyField(source='user.username')
    followers = serializers.SerializerMethodField()
    following = serializers.SerializerMethodField()
    currently_following = serializers.SerializerMethodField()
    follow_available = serializers.SerializerMethodField()
    followers_list = serializers.SerializerMethodField()
    following_list = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ('id', 'profile_username', 'first_name', 'last_name', 'followers', 'following', 'currently_following', 'follow_available', 'followers_list', 'following_list')

    def get_followers(self, obj):
        return obj.followers.count()

    def get_following(self, obj):
        return obj.user.following.count()

    def get_currently_following(self, obj):
        user = self.context.get('request').user
        return not user.is_anonymous and obj in user.following.all()

    def get_follow_available(self, obj):
        user = self.context.get('request').user
        return (not user.is_anonymous) and obj.user != user

    def get_followers_list(self, obj):
        follower_profiles = obj.followers.all()
        serializer = ProfileSerializer(follower_profiles, many=True, context=self.context)
        return serializer.data

    def get_following_list(self, obj):
        following_profiles = obj.user.following.all()
        serializer = ProfileSerializer(following_profiles, many=True, context=self.context)
        return serializer.data

class UserSerializer(serializers.ModelSerializer):
    password_confirm = serializers.CharField(write_only=True)
    profile = ProfileSerializer(required=False)

    class Meta:
        model = User
        fields = ['id','username', 'email', 'password', 'password_confirm', 'first_name', 'last_name', 'profile']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        password_confirm = validated_data.pop('password_confirm')
        if password != password_confirm:
            raise serializers.ValidationError({'password': 'Passwords do not match'})
        profile_data = validated_data.pop('profile', None)

        user = User(**validated_data)
        user.set_password(password)
        user.save()

         # Create the profile object if profile data is provided
        if profile_data:
            profile_serializer = ProfileSerializer(data=profile_data)
            profile_serializer.is_valid(raise_exception=True)
            profile_serializer.save(user=user)
        return user


    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        password_confirm = validated_data.pop('password_confirm', None)
        if password is not None and password != password_confirm:
            raise serializers.ValidationError({'password': 'Passwords do not match'})
        if 'profile' in validated_data:
            profile_data = validated_data.pop('profile')
            profile = instance.profile
            for key, value in profile_data.items():
                setattr(profile, key, value)
            profile.save()
        return super().update(instance, validated_data)

        
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'})

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                if user.is_active:
                    data['user'] = user
                else:
                    raise serializers.ValidationError('User account is disabled.')
            else:
                raise serializers.ValidationError('Unable to log in with provided credentials.')
        else:
            raise serializers.ValidationError('Must include "username" and "password".')

        return data


class LogoutSerializer(serializers.Serializer):
    pass
