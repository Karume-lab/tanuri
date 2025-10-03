from rest_framework.routers import DefaultRouter
from .viewsets import (
    AddressViewSet,
    CustomerProfileViewSet,
    DelivererProfileViewSet,
    AdminProfileViewSet,
    UserViewSet,
)

UserRouter = DefaultRouter()
UserRouter.register(r"users", UserViewSet, basename="user")
UserRouter.register(r"addresses", AddressViewSet, basename="address")
UserRouter.register(
    r"customer-profiles", CustomerProfileViewSet, basename="customer-profile"
)
UserRouter.register(
    r"deliverer-profiles", DelivererProfileViewSet, basename="deliverer-profile"
)
UserRouter.register(r"admin-profiles", AdminProfileViewSet, basename="admin-profile")
