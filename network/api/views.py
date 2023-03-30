from django.shortcuts import render
from .models import User, Profile, Post
from rest_framework.permissions import AllowAny, IsAuthenticated

class profile_list(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAdminUser]

class profile_detail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'id'
    # authentication_classes =  [TokenAuthentication] 

    # def get_permissions(self):
    #     permission_classes = []
    #     if self.request.method == 'GET':
    #         permission_classes = [AllowAny]
    #     else:
    #         permission_classes = [IsAuthenticated]

    #     return [permission() for permission in permission_classes]

class FollowerListAPIView(generics.ListAPIView):
    serializer_class = ProfileSerializer
    
    def get_queryset(self):
        user_id = self.kwargs['user_id']
        profile = Profile.objects.get(user_id=user_id)
        return profile.followers.all()

class FollowingListAPIView(generics.ListAPIView):
    serializer_class = ProfileSerializer
    
    def get_queryset(self):
        user_id = self.kwargs['user_id']
        profile = Profile.objects.get(user_id=user_id)
        return profile.following.all()