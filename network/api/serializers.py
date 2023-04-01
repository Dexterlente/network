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

    class Meta:
        model = Profile
        fields = ('profile_id', 'profile_username', 'followers', 'following', 'currently_following', 'follow_available')

    def get_followers(self, obj):
        return obj.followers.count()

    def get_following(self, obj):
        return obj.user.get_followed_profiles.count()

    def get_currently_following(self, obj):
        user = self.context.get('request').user
        return not user.is_anonymous and obj in user.get_followed_profiles.all()

    def get_follow_available(self, obj):
        user = self.context.get('request').user
        return (not user.is_anonymous) and obj.user != user

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data.update(self.serialize(instance))
        return data

    def serialize(self, instance):
        return {
            "followers": instance.followers.count(),
            "following": instance.user.get_followed_profiles.count(),
            "currently_following": not self.context.get('request').user.is_anonymous and instance in self.context.get('request').user.get_followed_profiles.all(),
            "follow_available": (not self.context.get('request').user.is_anonymous) and instance.user != self.context.get('request').user
        }