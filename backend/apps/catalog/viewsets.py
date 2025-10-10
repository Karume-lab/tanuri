from typing import Any

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets

from apps.catalog.filters import ProductFilter
from apps.catalog.models import (
    CategoryModel,
    OfferModel,
    ProductModel,
    ProductVariantModel,
)
from apps.catalog.serializers import (
    CategorySerializer,
    OfferSerializer,
    ProductSerializer,
    ProductVariantSerializer,
)


class ProductViewSet(viewsets.ModelViewSet):

    serializer_class = ProductSerializer
    queryset = ProductModel.objects.all()

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_class = ProductFilter
    search_fields = ["name", "description", "category__name"]
    ordering_fields = ["name", "id", "category__name", "variants__price"]
    ordering = ["name"]

    def get_queryset(self) -> Any:
        user = self.request.user

        queryset = ProductModel.objects.all().distinct()

        if not user.is_staff:
            queryset = queryset.filter(variants__isInStock=True).distinct()

        return queryset


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
