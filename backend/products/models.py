from django.db import models


class HealthCategory(models.Model):
    """Health condition category (cardiovascular, diabetes, hypertension)."""

    slug = models.SlugField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    short_name = models.CharField(max_length=50)
    icon = models.CharField(max_length=10, help_text="Emoji icon")
    color = models.CharField(
        max_length=100, help_text="Tailwind gradient classes"
    )
    bg_color = models.CharField(max_length=100, blank=True)
    border_color = models.CharField(max_length=100, blank=True)
    text_color = models.CharField(max_length=100, blank=True)
    description = models.TextField()
    guidelines = models.JSONField(
        default=list, help_text="Dietary guideline strings"
    )
    hero_image = models.CharField(max_length=255, blank=True)

    class Meta:
        verbose_name_plural = "Health Categories"
        ordering = ["name"]

    def __str__(self):
        return self.name


class Product(models.Model):
    """Health-compliant food product."""

    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.CharField(
        max_length=255, help_text="Path relative to frontend public/"
    )
    description = models.TextField()
    categories = models.ManyToManyField(
        HealthCategory, related_name="products", blank=True
    )
    in_stock = models.BooleanField(default=True)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    reviews = models.PositiveIntegerField(default=0)
    health_badges = models.JSONField(
        default=list, help_text="List of badge slugs, e.g. heart-healthy"
    )
    warnings = models.JSONField(
        default=list,
        help_text="List of warning strings or objects {type, message}",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-rating"]

    def __str__(self):
        return self.name


class NutritionFacts(models.Model):
    """FDA-style nutritional information for a product (per serving)."""

    product = models.OneToOneField(
        Product, on_delete=models.CASCADE, related_name="nutrition"
    )
    serving_size = models.CharField(max_length=50)
    calories = models.PositiveIntegerField(default=0)
    total_fat = models.DecimalField(max_digits=6, decimal_places=1, default=0)
    saturated_fat = models.DecimalField(
        max_digits=6, decimal_places=1, default=0
    )
    trans_fat = models.DecimalField(max_digits=6, decimal_places=1, default=0)
    cholesterol = models.PositiveIntegerField(default=0, help_text="mg")
    sodium = models.PositiveIntegerField(default=0, help_text="mg")
    total_carbs = models.DecimalField(
        max_digits=6, decimal_places=1, default=0
    )
    fiber = models.DecimalField(max_digits=6, decimal_places=1, default=0)
    sugars = models.DecimalField(max_digits=6, decimal_places=1, default=0)
    protein = models.DecimalField(max_digits=6, decimal_places=1, default=0)
    potassium = models.PositiveIntegerField(default=0, help_text="mg")

    class Meta:
        verbose_name = "Nutrition Facts"
        verbose_name_plural = "Nutrition Facts"

    def __str__(self):
        return f"Nutrition for {self.product.name}"


class ProductSuitability(models.Model):
    """Health condition suitability scores (0–100) for a product."""

    product = models.OneToOneField(
        Product, on_delete=models.CASCADE, related_name="suitability"
    )
    cardiovascular = models.PositiveIntegerField(
        default=0, help_text="0–100 suitability score"
    )
    diabetes = models.PositiveIntegerField(
        default=0, help_text="0–100 suitability score"
    )
    hypertension = models.PositiveIntegerField(
        default=0, help_text="0–100 suitability score"
    )

    class Meta:
        verbose_name_plural = "Product Suitabilities"

    def __str__(self):
        return f"Suitability for {self.product.name}"


class Ingredient(models.Model):
    """Individual ingredient for a product."""

    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="ingredients"
    )
    name = models.CharField(max_length=200)
    is_flagged = models.BooleanField(
        default=False, help_text="Flagged for allergen/warning"
    )

    def __str__(self):
        return f"{self.name} ({self.product.name})"
