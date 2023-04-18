from rest_framework.serializers import ModelSerializer
from .models import User, Profile, Post
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError


class ProfileSerializer(serializers.ModelSerializer):
    pk = serializers.IntegerField(source='id', read_only=True)
    user_id = serializers.ReadOnlyField(source='user.id')
    profile_username = serializers.ReadOnlyField(source='user.username', read_only=True)
    followers = serializers.SerializerMethodField()
    following = serializers.SerializerMethodField()
    is_following = serializers.SerializerMethodField()
    currently_following = serializers.SerializerMethodField()
    follow_available = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['pk', 'user_id', 'profile_username', 'first_name', 'last_name', 'followers','currently_following', 'is_following', 'follow_available', 'following', 'image', 'joined_date', 'isVerified']
        # fields = ['__all__']
    def get_followers(self, obj):
        #edit
        if isinstance(obj, Profile):
            return obj.followers.count()
        return 0


    def get_following(self, obj):
        #edit
        if isinstance(obj, Profile):
            return obj.user.following.count()
        return 0


    # def get_following(self, obj):
    #     if isinstance(obj, Profile):
    #         following = obj.user.following.all()
    #         following_serializer = self.__class__(following, many=True, context=self.context)
    #         return following_serializer.data
    #     return []
    # def get_following(self, obj):
    #     return obj.user.following.count()
    def get_is_following(self, profile):
        request = self.context.get('request')
        if request.user.is_authenticated:
            return profile.followers.filter(id=request.user.id).exists()
        return False

    def get_currently_following(self, obj):
        user = self.context.get('request').user
        return not user.is_anonymous and obj in user.following.all()
    # def get_currently_following(self, obj):
    #     user = self.context.get('request').user
    #     return user.is_authenticated and user.profile.following.filter(pk=obj.user.pk).exists()

    def get_follow_available(self, obj):
        user = self.context.get('request').user
        return (not user.is_anonymous) and obj.user != user

    # def get_followers_list(self, obj):
    #     followers = obj.followers.all()
    #     serializer = ProfileSerializer(followers, many=True, context=self.context, fields=['__all__'])
    #     return serializer.data

    def get_following_list(self, obj):
        following = obj.following.all()
        serializer = self.__class__(following, many=True, context=self.context, fields=['__all__'])
        # serializer = ProfileSerializer(following, many=True, context=self.context, fields=['__all__'])
        return serializer.data
    # def get_followers_list(self, obj):
    #     follower_profiles = obj.followers.all()
    #     serializer = ProfileSerializer(follower_profiles, many=True, context=self.context)
    #     return serializer.data
    
    # def get_followers_list(self, obj):
    #     if isinstance(obj, Profile):
    #         follower_profiles = obj.followers.all()
    #         serializer = ProfileSerializer(follower_profiles, many=True, context=self.context)
    #         return serializer.data
    #     return []


    # def get_following_list(self, obj):
    #     following_profiles = obj.user.following.all()
    #     serializer = ProfileSerializer(following_profiles, many=True, context=self.context)
    #     return serializer.data


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

# post serializer
class PostSerializer(serializers.ModelSerializer):
    poster_username = serializers.ReadOnlyField(source='poster.user.username')
    poster_id = serializers.ReadOnlyField(source='poster.id')
    likes = serializers.SerializerMethodField()
    liked = serializers.SerializerMethodField()
    poster = ProfileSerializer(read_only=True)
    poster_first_name = serializers.ReadOnlyField(source='poster.user.first_name')
    poster_last_name = serializers.ReadOnlyField(source='poster.user.last_name')
    poster_image = serializers.ReadOnlyField(source='poster.user.userprofile.image')

    class Meta:
        model = Post
        fields = ['id', 'content', 'poster', 'poster_username', 'poster_id', 'created_date', 'likes', 'liked', 'poster_first_name', 'poster_last_name','poster_image']

    # def create(self, validated_data):
    #     validated_data['poster'] = self.context['request'].user
    #     return super().create(validated_data)
    def create(self, validated_data):
        # Get the authenticated user's profile instance
        profile = self.context['request'].user.userprofile
        # Set the profile instance as the poster for the new post
        validated_data['poster'] = profile
        return super().create(validated_data)


    def get_likes(self, obj):
        return obj.likes.count()

    def get_liked(self, obj):
        user = self.context.get('request').user
        return not user.is_anonymous and obj in Profile.objects.filter(user=user).first().get_all_liked_posts.all()
    
