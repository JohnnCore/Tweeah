from django.db import models

from users.models import NewUser

# Create your models here.
class Tweeah(models.Model):
    body = models.TextField(max_length=280)
    user = models.ForeignKey(NewUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    parent_tweet = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies')
    retweeted_by = models.ManyToManyField(NewUser, related_name='retweets', blank=True)
    liked_by = models.ManyToManyField(NewUser, related_name='likes', blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.id} - {self.body[:10]}"

    # def retweet(self, user):
    #     if user != self.user:
    #         self.retweeted_by.add(user)
    #         self.retweet_count += 1
    #         self.save()

    # def unretweet(self, user):
    #     if user in self.retweeted_by.all():
    #         self.retweeted_by.remove(user)
    #         self.retweet_count -= 1
    #         self.save()

    @property
    def is_parent(self):
        return True if self.parent_tweet is None else False
    
    @property
    def likes_count(self):
        return self.liked_by.count()

    @property
    def replies_count(self):
        return self.replies.count()

    def get_tweet_thread(self):
        thread = []
        tweet = self.parent_tweet
        while tweet is not None:
            thread.insert(0, tweet)  # Insere o tweet pai no início da lista
            tweet = tweet.parent_tweet
        return thread
    

"""
# Create your models here.
class Tweeah(models.Model):
    body = models.TextField()

class Comment(models.Model):
    tweeah = models.ForeignKey(Tweeah, on_delete=models.SET_NULL, null=True)
    body = models.TextField()

class Retweeah(models.Model):
    tweeah = models.ForeignKey(Tweeah, on_delete=models.CASCADE)
"""
