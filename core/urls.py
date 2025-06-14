
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("autenticacao/", include("autenticacao.urls")),
    path("inteligencia_artificial/", include("inteligencia_artificial.urls")),
    path("", include("panoramica_app.urls")),
]
