from rest_framework.routers import DefaultRouter
from apps.catalog.router import CatalogRouter
from apps.users.router import UserRouter

ConfigRouter = DefaultRouter()
ConfigRouter.registry.extend(UserRouter.registry)
ConfigRouter.registry.extend(CatalogRouter.registry)
