from rest_framework import serializers
from apps.catalog.models import (
    OfferModel,
    ProductModel,
    ProductVariantModel,
    CategoryModel,
)


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CategoryModel
        fields = (
            "url",
            "id",
            "name",
            "icon",
        )
        extra_kwargs = {
            "url": {"view_name": "category-detail"},
        }


class ProductSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(
        view_name="user-detail",
        read_only=True,
    )

    class Meta:
        model = ProductModel
        fields = (
            "url",
            "id",
            "user",
            "category",
            "name",
            "description",
        )
        extra_kwargs = {
            "url": {"view_name": "product-detail"},
        }


class ProductVariantSerializer(serializers.HyperlinkedModelSerializer):
    product = serializers.HyperlinkedRelatedField(
        view_name="product-detail",
        read_only=True,
    )
    user = serializers.HyperlinkedRelatedField(
        view_name="user-detail",
        read_only=True,
    )

    class Meta:
        model = ProductVariantModel
        fields = (
            "url",
            "id",
            "user",
            "product",
            "name",
            "description",
            "price",
            "tradeInPrice",
            "stockQuantity",
            "isInStock",
            "images",
        )
        extra_kwargs = {
            "url": {"view_name": "product-variant-detail"},
        }


class OfferSerializer(serializers.HyperlinkedModelSerializer):
    variant = serializers.HyperlinkedRelatedField(
        view_name="product-variant-detail",
        read_only=True,
    )
    user = serializers.HyperlinkedRelatedField(
        view_name="user-detail",
        read_only=True,
    )

    class Meta:
        model = OfferModel
        fields = (
            "url",
            "id",
            "user",
            "variant",
            "isActive",
            "offerPrice",
            "startDate",
            "endDate",
        )
        extra_kwargs = {
            "url": {"view_name": "offer-detail"},
        }
