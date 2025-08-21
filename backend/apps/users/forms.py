from django.contrib.auth.forms import (
    UserCreationForm as DjangoUserCreationForm,
    UserChangeForm as DjangoUserChangeForm,
)
from apps.users.models import User


class UserCreationForm(DjangoUserCreationForm):
    class Meta:
        model = User
        fields = ("phone_number", "email")


class UserChangeForm(DjangoUserChangeForm):
    class Meta:
        model = User
        fields = ("phone_number", "email")
