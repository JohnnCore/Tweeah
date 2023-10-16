from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import views

urlpatterns = [

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), #login
    path('logout/', views.logout, name='logout'),
    path('register/', views.register, name='register'),

    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]