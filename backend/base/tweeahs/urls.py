from django.urls import path

from . import views 

urlpatterns = [
    path('create/', views.tweeah_create_view, name='tweeah_create'),
    path('list/', views.tweeah_list_view, name='tweeah_list'),
    path('<int:pk>/', views.tweeah_details_view, name='tweeah_details'),
    path('<int:pk>/update/', views.tweeah_update_view, name='tweeah_update'),
    path('<int:pk>/delete/', views.tweeah_delete_view, name='tweeah_delete'),
    
    #
    path('<int:pk>/replies/create/', views.replies_create_view, name='tweeah_replies_create'),
    path('<int:pk>/replies/list/', views.replies_list_view, name='tweeah_replies_list'),

    #
    path('<int:pk>/like_unlike/', views.like_unlike_tweeah, name='tweeah_like_unlike'),

    #
    path('<int:pk>/bookmark/', views.bookmark, name='tweeah_bookmark'),

]

"""
from .views import TweeahList, TweeeahCreate, TweetDetailUpdateDelete
urlpatterns = [
    path('list/', TweeahList.as_view(), name='tweeh_list'),
    path('create/', TweeeahCreate.as_view(), name='tweeh_create'),
    path('tweeah/<int:pk>', TweetDetailUpdateDelete.as_view(), name='tweet_detail_update_delete'),

]
"""
