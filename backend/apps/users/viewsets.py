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
from django.db.models import QuerySet


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all()


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
    queryset = CustomerProfileModel.objects.all()


class DelivererProfileViewSet(viewsets.ModelViewSet):
    serializer_class = DelivererProfileSerializer
    queryset = DelivererProfileModel.objects.all()


class AdminProfileViewSet(viewsets.ModelViewSet):
    serializer_class = AdminProfileSerializer
    queryset = AdminProfileModel.objects.all()
