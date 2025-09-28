from django.urls import include, re_path, path
from rest_framework.routers import DefaultRouter
from .viewsets import (
    AddressViewSet,
    CustomerProfileViewSet,
    DelivererProfileViewSet,
    AdminProfileViewSet,
    UserViewSet,
)

router = DefaultRouter()
router.register(r"users", UserViewSet, basename="user")
router.register(r"addresses", AddressViewSet, basename="address")
router.register(
    r"customer-profiles", CustomerProfileViewSet, basename="customer-profile"
)
router.register(
    r"deliverer-profiles", DelivererProfileViewSet, basename="deliverer-profile"
)
router.register(r"admin-profiles", AdminProfileViewSet, basename="admin-profile")

urlpatterns = [
    re_path(r"^auth/", include("djoser.urls")),
    re_path(r"^auth/", include("djoser.urls.jwt")),
    path("", include(router.urls)),
]
