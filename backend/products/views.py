from django.db import models
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Product, HealthCategory
from .serializers import (
    ProductListSerializer,
    ProductDetailSerializer,
    HealthCategorySerializer,
    CategoryDetailSerializer,
)


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoints for products.

    list:   GET /api/products/
    detail: GET /api/products/{id}/
    search: GET /api/products/?search=salmon
    filter: GET /api/products/?categories__slug=cardiovascular
    """

    queryset = Product.objects.select_related(
        "nutrition", "suitability"
    ).prefetch_related("categories", "ingredients")

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "description", "ingredients__name"]
    ordering_fields = ["price", "rating", "reviews", "created_at"]
    ordering = ["-rating"]
    filterset_fields = {
        "categories__slug": ["exact"],
        "in_stock": ["exact"],
        "price": ["gte", "lte"],
        "rating": ["gte"],
    }

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ProductDetailSerializer
        return ProductListSerializer

    @action(detail=False, methods=["get"], url_path="featured")
    def featured(self, request):
        """GET /api/products/featured/ — top-rated products."""
        featured = self.queryset.filter(rating__gte=4.5)[:6]
        serializer = ProductListSerializer(featured, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"], url_path="search")
    def search_products(self, request):
        """GET /api/products/search/?q=salmon"""
        query = request.query_params.get("q", "")
        if not query:
            return Response([])
        qs = self.queryset.filter(
            models.Q(name__icontains=query)
            | models.Q(description__icontains=query)
            | models.Q(ingredients__name__icontains=query)
        ).distinct()
        serializer = ProductListSerializer(qs, many=True)
        return Response(serializer.data)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoints for health categories.

    list:   GET /api/categories/
    detail: GET /api/categories/{slug}/
    """

    queryset = HealthCategory.objects.prefetch_related("products")
    lookup_field = "slug"

    def get_serializer_class(self):
        if self.action == "retrieve":
            return CategoryDetailSerializer
        return HealthCategorySerializer
