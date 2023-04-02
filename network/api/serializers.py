from rest_framework.serializers import ModelSerializer
from .models import User, Profile, Post
from rest_framework import serializers

class ProfileSerializer(serializers.ModelSerializer):
    profile_id = serializers.ReadOnlyField(source='user.id')
    profile_username = serializers.ReadOnlyField(source='user.username')
    followers = serializers.SerializerMethodField()
    following = serializers.SerializerMethodField()
    currently_following = serializers.SerializerMethodField()
    follow_available = serializers.SerializerMethodField()
    followers_list = serializers.SerializerMethodField()
    following_list = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ('profile_id', 'profile_username', 'followers', 'following', 'currently_following', 'follow_available', 'followers_list', 'following_list')

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