"""
LavishBite URL Configuration
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def api_root(request):
    """API root with available endpoints."""
    return Response(
        {
            "message": "Welcome to the LavishBite API",
            "version": "1.0.0",
            "endpoints": {
                "products": "/api/products/",
                "categories": "/api/categories/",
                "orders": "/api/orders/",
                "auth": {
                    "register": "/api/auth/register/",
                    "login": "/api/auth/login/",
                    "refresh": "/api/auth/refresh/",
                    "profile": "/api/auth/profile/",
                },
                "ai": {
                    "recommend": "/api/ai/recommend/?condition=cardiovascular",
                    "compliance": "/api/ai/compliance/?product=1&condition=cardiovascular",
                },
                "dashboard": {
                    "stats": "/api/dashboard/stats/",
                    "orders": "/api/dashboard/orders/",
                    "dietary_breakdown": "/api/dashboard/dietary-breakdown/",
                    "top_products": "/api/dashboard/top-products/",
                },
            },
        }
    )


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", api_root, name="api-root"),
    path("api/", include("products.urls")),
    path("api/", include("orders.urls")),
    path("api/auth/", include("users.urls")),
    path("api/ai/", include("ai_engine.urls")),
    path("api/dashboard/", include("dashboard.urls")),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Admin site customization
admin.site.site_header = "LavishBite Administration"
admin.site.site_title = "LavishBite Admin"
admin.site.index_title = "Health-Compliant Food Platform"
