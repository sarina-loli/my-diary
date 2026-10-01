from rest_framework import permissions, viewsets
from rest_framework.filters import SearchFilter

from .models import Entry
from .permissions import IsOwner
from .serializers import EntrySerializer


class EntryViewSet(viewsets.ModelViewSet):
    """
    Full CRUD for diary entries, always scoped to the logged-in user.

    Supports ?search=<text> to filter by title or content, matching the
    dashboard's search box in the frontend.
    """

    serializer_class = EntrySerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    filter_backends = [SearchFilter]
    search_fields = ["title", "content"]
    # The frontend's diary book/search UI expects a plain array of all of the
    # user's entries (it does its own client-side rendering), not a paginated
    # {results: [...]} envelope — so pagination is turned off for this view.
    pagination_class = None

    def get_queryset(self):
        # Users can only ever see or touch their own entries.
        return Entry.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
