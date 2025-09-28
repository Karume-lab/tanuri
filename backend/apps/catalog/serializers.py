from rest_framework import serializers
from apps.catalog.models import Offer, Product, ProductVariant


class ProductSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(
        view_name="user-detail",
        read_only=True,
    )

    class Meta:
        model = Product
        fields = (
            "url",
            "id",
            "user",
            "category",
            "name",
            "description",
        )


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
        model = ProductVariant
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


class OfferSerializer(serializers.HyperlinkedModelSerializer):
    variant = serializers.HyperlinkedRelatedField(
        view_name="productvariant-detail",
        read_only=True,
    )
    user = serializers.HyperlinkedRelatedField(
        view_name="user-detail",
        read_only=True,
    )

    class Meta:
        model = Offer
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
