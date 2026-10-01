from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import UserSerializer


class LoginSerializer(TokenObtainPairSerializer):
    """Same as the default JWT login, but also returns the user's profile.

    The frontend needs the user's name/diary_name right after login, so we
    save it an extra request to /api/auth/me/.
    """

    def validate(self, attrs):
        data = super().validate(attrs)
        data["user"] = UserSerializer(self.user).data
        return data


class LoginView(TokenObtainPairView):
    """POST /api/auth/login/ with {"email": ..., "password": ...}."""

    serializer_class = LoginSerializer
