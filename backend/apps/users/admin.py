from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from apps.users.forms import UserChangeForm, UserCreationForm
from apps.users.models import (
    UserModel,
    AddressModel,
    CustomerProfileModel,
    DelivererProfileModel,
    AdminProfileModel,
)


@admin.register(UserModel)
class UserAdmin(BaseUserAdmin):
    add_form = UserCreationForm
    form = UserChangeForm
    model = UserModel

    list_display = ("id", "email", "phone_number", "type", "is_staff", "is_active")
    list_filter = ("type", "is_staff", "is_active")

    fieldsets = (
        (None, {"fields": ("email", "phone_number", "password")}),
        (
            "Personal info",
            {"fields": ("first_name", "last_name", "type", "profile_picture")},
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_staff",
                    "is_active",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "phone_number",
                    "first_name",
                    "last_name",
                    "type",
                    "password1",
                    "password2",
                    "is_staff",
                    "is_active",
                ),
            },
        ),
    )

    search_fields = ("email", "phone_number")
    ordering = ("email",)


@admin.register(AddressModel)
class AddressAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "label", "city", "is_default")
    list_filter = ("city", "is_default")
    search_fields = ("label", "city", "user__email")


@admin.register(CustomerProfileModel)
class CustomerProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "points")
    search_fields = ("user__email",)


@admin.register(DelivererProfileModel)
class DelivererProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "is_available")
    list_filter = ("is_available",)
    search_fields = ("user__email",)


@admin.register(AdminProfileModel)
class AdminProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "user")
    search_fields = ("user__email",)
