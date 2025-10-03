from typing import Any
from rest_framework import viewsets

from apps.users.serializers import (
    AddressSerializer,
    AdminProfileSerializer,
    CustomerProfileSerializer,
    DelivererProfileSerializer,
    UserSerializer,
)

from apps.users.models import (
    AddressModel,
    AdminProfileModel,
    CustomerProfileModel,
    DelivererProfileModel,
    UserModel,
)


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self) -> Any:
        user = self.request.user
        if user.is_staff:
            return UserModel.objects.all()
        return UserModel.objects.filter(id=user.pk)


class AddressViewSet(viewsets.ModelViewSet):
    serializer_class = AddressSerializer

    def get_queryset(self) -> Any:
        user = self.request.user
        if user.is_staff:
            return AddressModel.objects.all()
        return AddressModel.objects.filter(user=user)

    def perform_create(self, serializer) -> None:
        serializer.save(user=self.request.user)


class CustomerProfileViewSet(viewsets.ModelViewSet):
    serializer_class = CustomerProfileSerializer

    def get_queryset(self) -> Any:
        user = self.request.user
        if user.is_staff:
            return CustomerProfileModel.objects.all()
        return CustomerProfileModel.objects.filter(user=user)

    def perform_create(self, serializer) -> None:
        serializer.save(user=self.request.user)


class DelivererProfileViewSet(viewsets.ModelViewSet):
    serializer_class = DelivererProfileSerializer

    def get_queryset(self) -> Any:
        user = self.request.user
        if user.is_staff:
            return DelivererProfileModel.objects.all()
        return DelivererProfileModel.objects.filter(user=user)


class AdminProfileViewSet(viewsets.ModelViewSet):
    serializer_class = AdminProfileSerializer

    def get_queryset(self) -> Any:
        user = self.request.user
        if user.is_staff:
            return AdminProfileModel.objects.all()
        return AdminProfileModel.objects.filter(user=user)
