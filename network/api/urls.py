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

    # # followers
    # path('profile/<int:id>/followers/', views.FollowerListAPIView.as_view(), name='follower_list'),
    # path('profile/<int:id>/followers/', views.FollowingListAPIView.as_view(), name='following_list'),
    # path('posts/', views.post_list.as_view(), name='posts'),
    # need to work on this api first
]
