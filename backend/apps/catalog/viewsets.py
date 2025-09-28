from typing import Any
from rest_framework import viewsets
from .models import Product, ProductVariant, Offer
from .serializers import ProductSerializer, ProductVariantSerializer, OfferSerializer


class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class ProductVariantViewSet(viewsets.ModelViewSet):
    serializer_class = ProductVariantSerializer

    def get_queryset(self) -> Any:
        user = self.request.user
        if user.is_staff:
            return ProductVariant.objects.all()
        return ProductVariant.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)


class OfferViewSet(viewsets.ModelViewSet):
    serializer_class = OfferSerializer

    def get_queryset(self) -> Any:
        user = self.request.user
        if user.is_staff:
            return Offer.objects.all()
        return Offer.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
