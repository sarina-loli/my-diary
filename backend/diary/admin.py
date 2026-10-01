from django.contrib import admin

from .models import Entry


@admin.register(Entry)
class EntryAdmin(admin.ModelAdmin):
    list_display = ["title", "user", "mood", "created_at"]
    list_filter = ["mood", "created_at"]
    search_fields = ["title", "content", "user__email"]
    readonly_fields = ["created_at"]
