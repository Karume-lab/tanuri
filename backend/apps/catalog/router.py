from rest_framework.routers import DefaultRouter
from apps.catalog.viewsets import ProductViewSet, ProductVariantViewSet, OfferViewSet

CatalogRouter = DefaultRouter()
CatalogRouter.register(r"products", ProductViewSet, basename="product")
CatalogRouter.register(r"product-variants", ProductVariantViewSet, basename="productvariant")
CatalogRouter.register(r"offers", OfferViewSet, basename="offer")
