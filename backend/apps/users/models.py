from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from apps.users.managers import UserManager


class UserTypesModel(models.TextChoices):
    CUSTOMER = "customer", _("Customer")
    DELIVERER = "deliverer", _("Deliverer")
    ADMIN = "admin", _("Admin")


class UserModel(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20, unique=True, null=True, blank=True)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    type = models.CharField(
        max_length=20,
        choices=UserTypesModel.choices,
        default=UserTypesModel.CUSTOMER,
    )

    profile_picture = models.ImageField(
        upload_to="profile-pictures/", null=True, blank=True
    )

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return f"{self.email} ({self.type})"

    @property
    def is_customer(self) -> bool:
        return self.type == UserTypesModel.CUSTOMER

    @property
    def is_deliverer(self) -> bool:
        return self.type == UserTypesModel.DELIVERER

    @property
    def is_admin_type(self) -> bool:
        return self.type == UserTypesModel.ADMIN


class AddressModel(models.Model):
    user = models.ForeignKey(
        UserModel, on_delete=models.CASCADE, related_name="addresses"
    )
    label = models.CharField(max_length=100, default="Home")
    latitude = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )
    longitude = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )
    city = models.CharField(max_length=100, blank=True, default="")
    is_default = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.label} - {self.user.email}"


class CustomerProfileModel(models.Model):
    user = models.OneToOneField(
        UserModel, on_delete=models.CASCADE, related_name="customer_profile"
    )
    points = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Customer Profile: {self.user.email}"


class DelivererProfileModel(models.Model):
    user = models.OneToOneField(
        UserModel, on_delete=models.CASCADE, related_name="deliverer_profile"
    )
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"Deliverer Profile: {self.user.email}"


class AdminProfileModel(models.Model):
    user = models.OneToOneField(
        UserModel, on_delete=models.CASCADE, related_name="admin_profile"
    )

    def __str__(self):
        return f"Admin Profile: {self.user.email}"
