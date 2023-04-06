from . import views
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.views import APIView


urlpatterns = [
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('login/', views.LoginAPIView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('register/', views.register, name='register'),
    # profile
    path('profile/', views.profile_list.as_view()),
    path('profile/<int:id>', views.profile_detail.as_view()),

    # path('posts/', views.post_list.as_view(), name='posts'),
    # need to work on this api first
]
