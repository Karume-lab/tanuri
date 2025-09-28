from django.urls import include, path
from apps.users.router import UserRouter


urlpatterns = [
    path("", include(UserRouter.urls)),
]
