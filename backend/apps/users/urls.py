from django.urls import include, path, re_path
from apps.users.router import UserRouter


urlpatterns = [
    path("", include(UserRouter.urls)),
    re_path(r"^auth", include("djoser.urls")),
    re_path(r"^auth", include("djoser.urls.jwt")),
]
