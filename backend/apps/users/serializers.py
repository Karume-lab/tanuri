from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from apps.users.models import (
    AddressModel,
    CustomerProfileModel,
    DelivererProfileModel,
    AdminProfileModel,
    UserModel,
)


class UserCreateSerializer(BaseUserCreateSerializer):
    email = serializers.EmailField(
        validators=[
            UniqueValidator(
                queryset=UserModel.objects.all(),
                message="A user with this email already exists",
            )
        ]
    )

    profile_picture = serializers.ImageField(
        required=False, allow_null=True, use_url=True
    )

    class Meta(BaseUserCreateSerializer.Meta):
        model = UserModel
        fields = (
            "id",
            "email",
            "phone_number",
            "first_name",
            "last_name",
            "type",
            "profile_picture",
            "password",
        )
        extra_kwargs = {
            "password": {"write_only": True},
        }


class AddressSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(
        view_name="user-detail",
        read_only=True,
    )

    class Meta:
        model = AddressModel
        fields = (
            "url",
            "id",
            "user",
            "label",
            "latitude",
            "longitude",
            "city",
            "is_default",
        )
        extra_kwargs = {
            "url": {"view_name": "address-detail"},
        }


class UserSerializer(serializers.HyperlinkedModelSerializer):
    addresses = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name="address-detail",
    )

    customer_profile = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name="customer-profile-detail",
    )
    deliverer_profile = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name="deliverer-profile-detail",
    )
    admin_profile = serializers.HyperlinkedRelatedField(
        read_only=True,
        view_name="admin-profile-detail",
    )

    class Meta:
        model = UserModel
        fields = (
            "url",
            "id",
            "email",
            "phone_number",
            "first_name",
            "last_name",
            "profile_picture",
            "type",
            "is_active",
            "is_staff",
            "date_joined",
            "addresses",
            "customer_profile",
            "deliverer_profile",
            "admin_profile",
        )
        extra_kwargs = {
            "url": {"view_name": "user-detail"},
        }


class CustomerProfileSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(
        view_name="user-detail",
        read_only=True,
    )

    class Meta:
        model = CustomerProfileModel
        fields = ("url", "id", "user", "points")
        extra_kwargs = {
            "url": {"view_name": "customer-profile-detail"},
        }


class DelivererProfileSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(
        view_name="user-detail",
        read_only=True,
    )

    class Meta:
        model = DelivererProfileModel
        fields = (
            "url",
            "id",
            "user",
            "is_available",
        )
        extra_kwargs = {
            "url": {"view_name": "deliverer-profile-detail"},
        }


class AdminProfileSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(
        view_name="user-detail",
        read_only=True,
    )

    class Meta:
        model = AdminProfileModel
        fields = (
            "url",
            "id",
            "user",
        )
        extra_kwargs = {
            "url": {"view_name": "admin-profile-detail"},
        }
