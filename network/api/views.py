from django.shortcuts import render
from .models import User, Profile, Post
from rest_framework import permissions
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics, status, serializers
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from .serializers import UserSerializer, LoginSerializer, ProfileSerializer, LogoutSerializer, PostSerializer
from rest_framework.permissions import BasePermission
from rest_framework.generics import ListAPIView


class UserViewSet(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
class IsOwner(BasePermission):
    """
    Custom permission to only allow owners of an object to access it.
    """
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user

class LoginAPIView(ObtainAuthToken):
    def post(self, request):
        if request.user.is_authenticated:
            return Response({'error': 'User is already authenticated.'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'success': 'Logged in successfully'})
        else:
            return Response({'error': 'Invalid login credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        print(user)
        token = Token.objects.create(user=user)
        return Response({'message': 'Successfully registered', 'token': token.key})
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class profile_list(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    # authentication_classes =  [TokenAuthentication] 
    # permission_classes = [IsAdminUser]
    """get request needs to be a user
    and other request needs to be an admin"""
    # def get_permissions(self):
    #     if self.request.method == 'GET':
    #         return [IsAuthenticated()]
    #     else:
    #         return [IsOwner()]

class profile_detail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'id'
    authentication_classes =  [TokenAuthentication] 

    def get_queryset(self):
        # return Profile.objects.filter(user=self.request.user)
        return Profile.objects.filter(id=self.kwargs['id'])

    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        else:
            return [IsAdminUser(), IsOwner()]

class FollowerListAPIView(generics.ListAPIView):
    serializer_class = ProfileSerializer
    
    def get_queryset(self):
        user_id = self.kwargs['id']
        # user_id = self.kwargs.get('id')
        profile = Profile.objects.get(user_id=user_id)
        return profile.followers.all()

class FollowingListAPIView(generics.ListAPIView):
    serializer_class = ProfileSerializer
    
    def get_queryset(self):
        user_id = self.kwargs['id']
        profile = Profile.objects.get(user_id=user_id)
        return profile.user.following.all()

class UpdateFollowAPIView(APIView):
    serializer_class = ProfileSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, profile_id):
        # this post method wont trigger if the same user is the same as the profile
        if str(request.user.id) == str(profile_id):
            return Response({'detail': "You can't follow/unfollow yourself."}, status=400)
        else:
            profile = Profile.objects.get(user_id=profile_id)
            if profile in request.user.following.all():
                newStatus = False
                profile.followers.remove(request.user)
            else:
                newStatus = True
                profile.followers.add(request.user)
            profile.save()
            return Response({"newFollower": newStatus, "new follow or unfollow count": profile.followers.count()}, status=200)

class post_detail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'id'
    authentication_classes =  [TokenAuthentication] 

    def get_queryset(self):
        return Post.objects.filter(id=self.kwargs['id'])

class UpdateLikeAPIView(APIView):
    serializer_class = ProfileSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        profile = Profile.objects.filter(user=request.user).first()
        post = Post.objects.get(id=post_id)
        if post in profile.get_all_liked_posts.all():
            newStatus = False
            post.likes.remove(profile)
        else:
            newStatus = True
            post.likes.add(profile)
        post.save()
        return Response({"liked": newStatus, "Count": post.likes.count()}, status=200)



class post_list(generics.ListCreateAPIView):
    queryset = Post.objects.all().order_by('-created_date')
    serializer_class = PostSerializer
    authentication_classes =  [TokenAuthentication] 

    # def get_permissions(self):
    #     permission_classes = []
    #     # if self.request.method != 'GET':
    #     #     permission_classes = [IsAuthenticated]
    #     if self.request.method == 'GET':
    #         permission_classes = [AllowAny]
    #     else:
    #         permission_classes = [IsAuthenticated]

    #     return [permission() for permission in permission_classes]

# class FollowedPostsView(generics.ListCreateAPIView):
#     serializer_class = PostSerializer

#     def get_queryset(self):
#         followed_profiles = self.request.user.get_followed_profiles.all()
#         queryset = Post.objects.filter(poster__in=followed_profiles).all()
#         return queryset

#     def list(self, request, *args, **kwargs):
#         queryset = self.get_queryset()
#         serializer = self.get_serializer(queryset, many=True)
#         return Response(serializer.data)