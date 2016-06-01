from django.contrib.auth import get_user_model
from django.db import IntegrityError
from rest_framework import serializers
from rest_framework.exceptions import ValidationError


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = get_user_model()
        fields = ("username", "password")

    def create(self, validated_data):
        try:
            user = get_user_model().objects.create_user(
                username=validated_data["username"],
                password=validated_data["password"]
            )
        except IntegrityError:
            raise ValidationError("username already registered")

        return user
