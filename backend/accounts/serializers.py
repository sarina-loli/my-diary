from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Read/update the logged-in user's own profile (used by GET/PATCH /api/auth/me/)."""

    class Meta:
        model = User
        fields = ["id", "name", "email", "diary_name"]
        read_only_fields = ["id", "email"]


class RegisterSerializer(serializers.ModelSerializer):
    """Creates a new user. Mirrors the frontend's register form fields."""

    password = serializers.CharField(write_only=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["name", "email", "password", "confirm_password", "diary_name"]

    def validate(self, attrs):
        if attrs["password"] != attrs.pop("confirm_password"):
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})
        return attrs

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
