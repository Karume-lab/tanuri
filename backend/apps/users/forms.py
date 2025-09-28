from django.contrib.auth.forms import (
    UserCreationForm as DjangoUserCreationForm,
    UserChangeForm as DjangoUserChangeForm,
)
from apps.users.models import UserModel


class UserCreationForm(DjangoUserCreationForm):
    class Meta:
        model = UserModel
        fields = (
            "email",
            "phone_number",
            "first_name",
            "last_name",
            "type",
        )


class UserChangeForm(DjangoUserChangeForm):
    class Meta:
        model = UserModel
        fields = (
            "email",
            "phone_number",
            "first_name",
            "last_name",
            "type",
            "is_active",
            "is_staff",
            "is_superuser",
            "groups",
            "user_permissions",
        )
