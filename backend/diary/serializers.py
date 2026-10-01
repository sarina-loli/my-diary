from rest_framework import serializers

from .models import Entry


class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = ["id", "title", "content", "mood", "created_at"]
        read_only_fields = ["id", "created_at"]
