from django.contrib import admin
from .models import (
    HealthCategory,
    Product,
    NutritionFacts,
    ProductSuitability,
    Ingredient,
)


class NutritionFactsInline(admin.StackedInline):
    model = NutritionFacts
    extra = 0


class ProductSuitabilityInline(admin.StackedInline):
    model = ProductSuitability
    extra = 0


class IngredientInline(admin.TabularInline):
    model = Ingredient
    extra = 1


@admin.register(HealthCategory)
class HealthCategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "icon", "product_count"]
    prepopulated_fields = {"slug": ("name",)}

    def product_count(self, obj):
        return obj.products.count()

    product_count.short_description = "Products"


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "price", "rating", "in_stock", "created_at"]
    list_filter = ["in_stock", "categories", "rating"]
    search_fields = ["name", "description"]
    prepopulated_fields = {"slug": ("name",)}
    filter_horizontal = ["categories"]
    inlines = [NutritionFactsInline, ProductSuitabilityInline, IngredientInline]


@admin.register(NutritionFacts)
class NutritionFactsAdmin(admin.ModelAdmin):
    list_display = [
        "product",
        "calories",
        "protein",
        "sodium",
        "fiber",
        "sugars",
    ]
    search_fields = ["product__name"]
