from rest_framework.routers import DefaultRouter
from apps.catalog.viewsets import ProductViewSet, ProductVariantViewSet, OfferViewSet, CategoryViewSet

CatalogRouter = DefaultRouter()
CatalogRouter.register(r"products", ProductViewSet, basename="product")
CatalogRouter.register(
    r"product-variants", ProductVariantViewSet, basename="product-variant"
)
CatalogRouter.register(r"offers", OfferViewSet, basename="offer")
CatalogRouter.register(r"categories", CategoryViewSet, basename="category")
