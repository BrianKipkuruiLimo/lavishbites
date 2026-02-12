from rest_framework import serializers
from .models import (
    HealthCategory,
    Product,
    NutritionFacts,
    ProductSuitability,
    Ingredient,
)


class NutritionFactsSerializer(serializers.ModelSerializer):
    class Meta:
        model = NutritionFacts
        fields = [
            "serving_size",
            "calories",
            "total_fat",
            "saturated_fat",
            "trans_fat",
            "cholesterol",
            "sodium",
            "total_carbs",
            "fiber",
            "sugars",
            "protein",
            "potassium",
        ]


class ProductSuitabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSuitability
        fields = ["cardiovascular", "diabetes", "hypertension"]


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ["id", "name", "is_flagged"]


class HealthCategorySerializer(serializers.ModelSerializer):
    product_count = serializers.SerializerMethodField()

    class Meta:
        model = HealthCategory
        fields = [
            "id",
            "slug",
            "name",
            "short_name",
            "icon",
            "color",
            "bg_color",
            "border_color",
            "text_color",
            "description",
            "guidelines",
            "hero_image",
            "product_count",
        ]

    def get_product_count(self, obj):
        return obj.products.count()


class ProductListSerializer(serializers.ModelSerializer):
    """Lightweight product serializer for list views."""

    categories = serializers.SlugRelatedField(
        many=True, read_only=True, slug_field="slug"
    )
    suitability = ProductSuitabilitySerializer(read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "slug",
            "price",
            "image",
            "description",
            "categories",
            "in_stock",
            "rating",
            "reviews",
            "health_badges",
            "warnings",
            "suitability",
        ]


class ProductDetailSerializer(serializers.ModelSerializer):
    """Full product serializer with nutrition, suitability, and ingredients."""

    categories = serializers.SlugRelatedField(
        many=True, read_only=True, slug_field="slug"
    )
    nutrition = NutritionFactsSerializer(read_only=True)
    suitability = ProductSuitabilitySerializer(read_only=True)
    ingredients = IngredientSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "slug",
            "price",
            "image",
            "description",
            "categories",
            "in_stock",
            "rating",
            "reviews",
            "health_badges",
            "warnings",
            "nutrition",
            "suitability",
            "ingredients",
            "created_at",
            "updated_at",
        ]


class CategoryDetailSerializer(serializers.ModelSerializer):
    """Category with embedded products."""

    products = ProductListSerializer(many=True, read_only=True)

    class Meta:
        model = HealthCategory
        fields = [
            "id",
            "slug",
            "name",
            "short_name",
            "icon",
            "color",
            "bg_color",
            "border_color",
            "text_color",
            "description",
            "guidelines",
            "hero_image",
            "products",
        ]
