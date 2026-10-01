from rest_framework.permissions import BasePermission


class IsOwner(BasePermission):
    """Allows access only to the entry's own author."""

    def has_object_permission(self, request, view, obj):
        return obj.user_id == request.user.id
