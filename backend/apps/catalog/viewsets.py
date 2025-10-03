from typing import Any
from rest_framework import viewsets
from apps.catalog.models import (
    ProductModel,
    ProductVariantModel,
    OfferModel,
    CategoryModel,
)
from apps.catalog.serializers import (
    ProductSerializer,
    ProductVariantSerializer,
    OfferSerializer,
    CategorySerializer,
)


class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = ProductModel.objects.all()


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = CategoryModel.objects.all()


class ProductVariantViewSet(viewsets.ModelViewSet):
    serializer_class = ProductVariantSerializer

    def get_queryset(self) -> Any:
        user = self.request.user
        if user.is_staff:
            return ProductVariantModel.objects.all()
        return ProductVariantModel.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)


class OfferViewSet(viewsets.ModelViewSet):
    serializer_class = OfferSerializer

    def get_queryset(self) -> Any:
        user = self.request.user
        if user.is_staff:
            return OfferModel.objects.all()
        return OfferModel.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
