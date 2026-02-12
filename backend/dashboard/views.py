from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.db.models import Sum, Count, Avg
from django.utils import timezone
from datetime import timedelta
from orders.models import Order
from products.models import Product, HealthCategory
from products.serializers import ProductListSerializer


class DashboardStatsView(APIView):
    """
    GET /api/dashboard/stats/

    Hotel dashboard KPIs:
    - Total orders, revenue, compliance rate, active products
    """

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # Filter by hotel if user is hotel_admin
        orders_qs = Order.objects.all()
        if request.user.is_hotel_admin:
            orders_qs = orders_qs.filter(user=request.user)

        total_orders = orders_qs.count()
        revenue = orders_qs.aggregate(total=Sum("total"))["total"] or 0

        # Active products
        active_products = Product.objects.filter(in_stock=True).count()

        # Compliance rate — % of products with suitability > 70
        total_products = Product.objects.count()
        compliant_count = Product.objects.filter(
            suitability__cardiovascular__gte=70
        ).count()
        compliance_rate = (
            round(compliant_count / total_products * 100, 1)
            if total_products > 0
            else 0
        )

        # Monthly trend (last 30 days vs previous 30 days)
        now = timezone.now()
        this_month = orders_qs.filter(
            created_at__gte=now - timedelta(days=30)
        ).count()
        prev_month = orders_qs.filter(
            created_at__gte=now - timedelta(days=60),
            created_at__lt=now - timedelta(days=30),
        ).count()
        order_trend = (
            round((this_month - prev_month) / prev_month * 100, 1)
            if prev_month > 0
            else 0
        )

        return Response(
            {
                "total_orders": total_orders,
                "revenue": float(revenue),
                "compliance_rate": compliance_rate,
                "active_products": active_products,
                "order_trend": order_trend,
            }
        )


class DashboardOrdersView(APIView):
    """
    GET /api/dashboard/orders/?limit=5

    Recent orders for the dashboard table.
    """

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        limit = int(request.query_params.get("limit", 5))

        orders_qs = Order.objects.all()
        if request.user.is_hotel_admin:
            orders_qs = orders_qs.filter(user=request.user)

        orders = orders_qs[:limit]
        data = []
        for order in orders:
            data.append(
                {
                    "order_id": order.order_id,
                    "hotel_name": order.hotel_name or order.user.organization,
                    "items": order.items.count(),
                    "total": float(order.total),
                    "status": order.status,
                    "date": order.created_at.strftime("%Y-%m-%d"),
                }
            )

        return Response(data)


class DietaryBreakdownView(APIView):
    """
    GET /api/dashboard/dietary-breakdown/

    Orders by health condition.
    """

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        categories = HealthCategory.objects.all()
        breakdown = []

        for cat in categories:
            product_ids = cat.products.values_list("id", flat=True)
            order_count = (
                Order.objects.filter(items__product_id__in=product_ids)
                .distinct()
                .count()
            )
            breakdown.append(
                {
                    "condition": cat.slug,
                    "name": cat.name,
                    "icon": cat.icon,
                    "orders": order_count,
                }
            )

        # Calculate percentages
        total = sum(b["orders"] for b in breakdown)
        for b in breakdown:
            b["percentage"] = (
                round(b["orders"] / total * 100) if total > 0 else 0
            )

        return Response(breakdown)


class TopProductsView(APIView):
    """
    GET /api/dashboard/top-products/?limit=5

    Top-rated products for the dashboard.
    """

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        limit = int(request.query_params.get("limit", 5))
        products = Product.objects.order_by("-rating")[:limit]
        data = []
        for p in products:
            data.append(
                {
                    "id": p.id,
                    "name": p.name,
                    "image": p.image,
                    "price": float(p.price),
                    "rating": float(p.rating),
                }
            )
        return Response(data)
