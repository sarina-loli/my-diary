from django.contrib.auth.models import AbstractUser
from django.db import models

from .managers import UserManager


class User(AbstractUser):
    """
    A diary owner.

    We drop Django's default `username` field and log in with email instead,
    since that's what the frontend's login form uses. `diary_name` matches
    the "diaryName" the user picks when registering (e.g. "My little book").
    """

    username = None
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=80)
    diary_name = models.CharField(max_length=80, default="My Diary")

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    objects = UserManager()

    def __str__(self):
        return self.email
