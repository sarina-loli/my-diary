from django.conf import settings
from django.db import models

# Same mood emoji set offered on the "Add entry" page in the frontend.
MOOD_CHOICES = [
    ("😊", "Happy"),
    ("😢", "Sad"),
    ("❤️", "Loved"),
    ("✨", "Inspired"),
    ("🌿", "Calm"),
    ("😠", "Angry"),
    ("💭", "Thoughtful"),
]


class Entry(models.Model):
    """A single diary entry, private to the user who wrote it."""

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="entries")
    title = models.CharField(max_length=120)
    content = models.TextField(max_length=5000)
    mood = models.CharField(max_length=8, choices=MOOD_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.title} ({self.user.email})"
