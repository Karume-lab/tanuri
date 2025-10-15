from apps.catalog.models import (
    CategoryModel,
    OfferModel,
    ProductModel,
    ProductVariantImageModel,
    ProductVariantModel,
)
from rest_framework import serializers


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CategoryModel
        fields = ("url", "id", "name", "icon")
        extra_kwargs = {"url": {"view_name": "category-detail"}}


class ProductVariantImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariantImageModel
        fields = ["id", "image"]


class ProductVariantSerializer(serializers.HyperlinkedModelSerializer):
    product = serializers.HyperlinkedRelatedField(
        view_name="product-detail",
        read_only=True,
    )
    images = ProductVariantImageSerializer(many=True, read_only=True)

    class Meta:
        model = ProductVariantModel
        fields = (
            "url",
            "id",
            "product",
            "name",
            "description",
            "price",
            "tradeInPrice",
            "stockQuantity",
            "isInStock",
            "images",
        )
        extra_kwargs = {"url": {"view_name": "product-variant-detail"}}

    def create(self, validated_data):
        request = self.context.get("request")
        variant = ProductVariantModel.objects.create(**validated_data)

        if request and hasattr(request, "FILES"):
            for file in request.FILES.getlist("images"):
                ProductVariantImageModel.objects.create(variant=variant, image=file)

        return variant


class ProductSerializer(serializers.HyperlinkedModelSerializer):
    category = serializers.HyperlinkedRelatedField(
        view_name="category-detail",
        queryset=CategoryModel.objects.all(),
    )
    variants = ProductVariantSerializer(many=True, read_only=True)

    class Meta:
        model = ProductModel
        fields = (
            "url",
            "id",
            "category",
            "name",
            "description",
            "variants",
        )
        extra_kwargs = {"url": {"view_name": "product-detail"}}


class OfferSerializer(serializers.HyperlinkedModelSerializer):
    variant = serializers.HyperlinkedRelatedField(
        view_name="product-variant-detail",
        queryset=ProductVariantModel.objects.all(),
    )

    class Meta:
        model = OfferModel
        fields = (
            "url",
            "id",
            "variant",
            "isActive",
            "offerPrice",
            "startDate",
            "endDate",
        )
        extra_kwargs = {"url": {"view_name": "offer-detail"}}
