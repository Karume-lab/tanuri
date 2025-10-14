from django.contrib import admin

from .models import (
    CategoryModel,
    OfferModel,
    ProductModel,
    ProductVariantImageModel,
    ProductVariantModel,
)


class ProductVariantImageInline(admin.TabularInline):
    model = ProductVariantImageModel
    extra = 1


class OfferInline(admin.TabularInline):
    model = OfferModel
    extra = 1


class ProductVariantInline(admin.TabularInline):
    model = ProductVariantModel
    extra = 1


@admin.register(CategoryModel)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "icon")
    search_fields = ("name",)
    ordering = ("name",)


@admin.register(ProductModel)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "category")
    list_filter = ("category",)
    search_fields = ("name", "description")
    inlines = [ProductVariantInline]


@admin.register(ProductVariantModel)
class ProductVariantAdmin(admin.ModelAdmin):
    list_display = ("id", "product", "name", "price", "stockQuantity", "isInStock")
    list_filter = ("isInStock", "product")
    search_fields = ("name", "description")
    inlines = [OfferInline, ProductVariantImageInline]


@admin.register(OfferModel)
class OfferAdmin(admin.ModelAdmin):
    list_display = ("id", "variant", "offerPrice", "isActive", "startDate", "endDate")
    list_filter = ("isActive", "startDate", "endDate")
    search_fields = ("variant__name",)


@admin.register(ProductVariantImageModel)
class ProductVariantImageAdmin(admin.ModelAdmin):
    list_display = ("id", "variant", "image")
    search_fields = ("variant__name",)
