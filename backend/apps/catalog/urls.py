from django.urls import include, path
from apps.catalog.router import CatalogRouter


urlpatterns = [
    path("", include(CatalogRouter.urls)),
]
