from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from products.models import Product
from products.serializers import ProductListSerializer
from .recommender import get_recommendations, check_compliance


class RecommendationView(APIView):
    """
    GET /api/ai/recommend/?condition=cardiovascular&exclude=1&limit=4

    Returns AI-powered product recommendations for a health condition.
    """

    def get(self, request):
        condition = request.query_params.get("condition", "cardiovascular")
        exclude_id = request.query_params.get("exclude")
        limit = int(request.query_params.get("limit", 4))

        if condition not in ("cardiovascular", "diabetes", "hypertension"):
            return Response(
                {"error": "Invalid condition. Use: cardiovascular, diabetes, hypertension"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        products_qs = Product.objects.select_related(
            "nutrition", "suitability"
        ).prefetch_related("categories", "ingredients")

        exclude = int(exclude_id) if exclude_id else None
        results = get_recommendations(condition, products_qs, exclude, limit)

        data = []
        for product, score in results:
            serialized = ProductListSerializer(product).data
            serialized["ai_score"] = round(score, 3)
            data.append(serialized)

        return Response(data)


class ComplianceView(APIView):
    """
    GET /api/ai/compliance/?product=1&condition=cardiovascular

    Returns a detailed compliance report for a product against
    a health condition's dietary guidelines.
    """

    def get(self, request):
        product_id = request.query_params.get("product")
        condition = request.query_params.get("condition", "cardiovascular")

        if not product_id:
            return Response(
                {"error": "product query parameter is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if condition not in ("cardiovascular", "diabetes", "hypertension"):
            return Response(
                {"error": "Invalid condition. Use: cardiovascular, diabetes, hypertension"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            product = Product.objects.select_related("nutrition").get(
                id=product_id
            )
        except Product.DoesNotExist:
            return Response(
                {"error": "Product not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        report = check_compliance(product, condition)
        report["product_id"] = product.id
        report["product_name"] = product.name
        report["condition"] = condition

        return Response(report)
