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

class UpdateLikeAPIView(APIView):
    serializer_class = ProfileSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
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
        return Response({"liked": newStatus, "newAmount": post.likes.count()}, status=200)


class UpdateFollowAPIView(APIView):
    serializer_class = ProfileSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, profile_id):
        profile = Profile.objects.get(id=profile_id)
        if profile in request.user.get_followed_profiles.all():
            newStatus = False
            profile.followers.remove(request.user)
        else:
            newStatus = True
            profile.followers.add(request.user)
        profile.save()
        return Response({"newFollower": newStatus, "newAmount": profile.followers.count()}, status=200)

class post_list(generics.ListCreateAPIView):
    queryset = Post.objects.all().order_by('-time_created_post')
    serializer_class = PostSerializer
    authentication_classes =  [TokenAuthentication] 

    def get_permissions(self):
        permission_classes = []
        # if self.request.method != 'GET':
        #     permission_classes = [IsAuthenticated]
        if self.request.method == 'GET':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]

        return [permission() for permission in permission_classes]

class FollowedPostsView(generics.ListCreateAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        followed_profiles = self.request.user.get_followed_profiles.all()
        queryset = Post.objects.filter(poster__in=followed_profiles).all()
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)