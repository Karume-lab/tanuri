from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth import get_user_model

User = get_user_model()


class UserCreateSerializer(BaseUserCreateSerializer):
    email = serializers.EmailField(
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="A user with this email already exists",
            )
        ]
    )

    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ("id", "email", "phone_number", "first_name", "last_name", "password")
