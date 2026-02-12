from django.urls import path
from .views import (
    DashboardStatsView,
    DashboardOrdersView,
    DietaryBreakdownView,
    TopProductsView,
)

urlpatterns = [
    path("stats/", DashboardStatsView.as_view(), name="dashboard-stats"),
    path("orders/", DashboardOrdersView.as_view(), name="dashboard-orders"),
    path(
        "dietary-breakdown/",
        DietaryBreakdownView.as_view(),
        name="dashboard-dietary",
    ),
    path(
        "top-products/",
        TopProductsView.as_view(),
        name="dashboard-top-products",
    ),
]
