from rest_framework import serializers

from .models import Tweeah
from users.serializers import UserSerializer

class CreateTweeahSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tweeah
        fields = ('id','body','user','parent_tweet')


class TweeahSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True, many=False)
    iliked = serializers.SerializerMethodField(read_only=True)
    likes_count = serializers.SerializerMethodField(read_only=True)
    replies_count = serializers.SerializerMethodField(read_only=True)
    bookmarks_count = serializers.SerializerMethodField(read_only=True)
    ibookmarked = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Tweeah
        fields = ('id','body','created_at','user','iliked','likes_count','replies_count', 'bookmarks_count', 'ibookmarked')

    def get_iliked(self, obj):
        request = self.context.get('request')
        if request:
            return True if request.user in obj.liked_by.all() else False
        
    def likes_count(self, obj):
        return obj.get_likes_count()

    def replies_count(self, obj):
        return obj.replies_count()
    
    def bookmarks_count(self, obj):
        return obj.bookmarks_count()
    
    def get_ibookmarked(self, obj):
        request = self.context.get('request')
        if request:
            return True if request.user in obj.bookmarked_by.all() else False