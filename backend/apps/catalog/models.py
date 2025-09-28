from django.db import models
from django.utils.translation import gettext_lazy as _


class Category(models.Model):
    categoryId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    icon = models.CharField(
        max_length=100,
        null=True,
        blank=True,
        help_text="Lucide icon name for this category. You can obtain a name from https://lucide.dev/icons/",
    )

    def __str__(self):
        return self.name


class Product(models.Model):
    productId = models.AutoField(primary_key=True)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="products"
    )
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, default="")

    def __str__(self):
        return self.name


class ProductVariant(models.Model):
    variantId = models.AutoField(primary_key=True)
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="variants"
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


class Offer(models.Model):
    offerId = models.AutoField(primary_key=True)
    variant = models.ForeignKey(
        ProductVariant, on_delete=models.CASCADE, related_name="offers"
    )
    isActive = models.BooleanField(default=True)
    offerPrice = models.DecimalField(max_digits=10, decimal_places=2)
    startDate = models.DateTimeField()
    endDate = models.DateTimeField()

    def __str__(self):
        return f"Offer on {self.variant} - {self.offerPrice}"
