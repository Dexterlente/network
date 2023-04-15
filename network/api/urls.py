from . import views
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.views import APIView


urlpatterns = [
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('login/', views.LoginAPIView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('register/', views.register, name='register'),

    path('users/', views.UserViewSet.as_view()),
    # profile
    path('profile/', views.profile_list.as_view()),
    path('profile/<int:id>', views.profile_detail.as_view()),
    path('my-profile/', views.my_profile.as_view()),

    # followers
    path('profile/<int:id>/followers', views.FollowerListAPIView.as_view()),
    path('profile/<int:id>/following', views.FollowingListAPIView.as_view()),

    #follow or unfollow profile
    path("profile/<int:profile_id>/update-follow", views.UpdateFollowAPIView.as_view()),
    #Post list endpoint
    path('posts/', views.post_list.as_view(), name='posts'),
    path('postbody/', views.post_random.as_view()),
    #detailed post
    path('posts/<int:id>', views.post_detail.as_view()),
    #to like add count and boolean tru ur pulse
    path('posts/<int:post_id>/like', views.UpdateLikeAPIView.as_view()),
    # get followed profiles post
    path('posts/followed-post', views.FollowedPostsView.as_view()),
]
