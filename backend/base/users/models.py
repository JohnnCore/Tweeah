from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class NewUser(AbstractUser):
    email = models.EmailField(unique=True, blank=False, max_length=255, verbose_name="email")

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['username']

    # EMAIL_FIELD = "email"

    def __str__(self):
        return f"{self.id} - {self.username[:10]}"
