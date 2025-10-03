from django.db import models
from django.utils.translation import gettext_lazy as _


class CategoryModel(models.Model):
    name = models.CharField(max_length=255)
    icon = models.CharField(
        max_length=100,
        null=True,
        blank=True,
        help_text="Lucide icon name for this category. You can obtain a name from https://lucide.dev/icons/",
    )

    def __str__(self):
        return self.name


class ProductModel(models.Model):
    category = models.ForeignKey(
        CategoryModel, on_delete=models.CASCADE, related_name="products"
    )
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, default="")

    def __str__(self):
        return self.name


class ProductVariantModel(models.Model):
    product = models.ForeignKey(
        ProductModel, on_delete=models.CASCADE, related_name="variants"
    )
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, default="")
    price = models.DecimalField(max_digits=10, decimal_places=2)
    tradeInPrice = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
    stockQuantity = models.PositiveIntegerField(default=0)
    isInStock = models.BooleanField(default=True)
    images = models.JSONField(blank=True, default=list)

    def __str__(self):
        return f"{self.product.name} - {self.name}"


class OfferModel(models.Model):
    variant = models.ForeignKey(
        ProductVariantModel, on_delete=models.CASCADE, related_name="offers"
    )
    isActive = models.BooleanField(default=True)
    offerPrice = models.DecimalField(max_digits=10, decimal_places=2)
    startDate = models.DateTimeField()
    endDate = models.DateTimeField()

    def __str__(self):
        return f"Offer on {self.variant} - {self.offerPrice}"
