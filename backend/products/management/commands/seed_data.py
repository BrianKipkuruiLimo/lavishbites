"""
Seed the database with all 14 products, 3 health categories,
and a demo hotel admin user from the frontend mock data.

Usage: python manage.py seed_data
"""

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from products.models import (
    HealthCategory,
    Product,
    NutritionFacts,
    ProductSuitability,
    Ingredient,
)

User = get_user_model()

CATEGORIES = [
    {
        "slug": "cardiovascular",
        "name": "Cardiovascular Health",
        "short_name": "Heart Health",
        "icon": "❤️",
        "color": "from-rose-500 to-red-600",
        "bg_color": "bg-rose-50 dark:bg-rose-950/30",
        "border_color": "border-rose-200 dark:border-rose-800",
        "text_color": "text-rose-700 dark:text-rose-300",
        "description": "Foods that support heart health — low in saturated fat, rich in omega-3 fatty acids, fiber, and antioxidants.",
        "guidelines": [
            "Low saturated fat (<7% of calories)",
            "Rich in omega-3 fatty acids",
            "High fiber content (>3g per serving)",
            "Low sodium (<400mg per serving)",
            "No trans fats",
        ],
        "hero_image": "/images/products/salmon.jpeg",
    },
    {
        "slug": "diabetes",
        "name": "Diabetes Friendly",
        "short_name": "Diabetes",
        "icon": "🩸",
        "color": "from-blue-500 to-indigo-600",
        "bg_color": "bg-blue-50 dark:bg-blue-950/30",
        "border_color": "border-blue-200 dark:border-blue-800",
        "text_color": "text-blue-700 dark:text-blue-300",
        "description": "Low-glycemic foods that help manage blood sugar levels — whole grains, lean proteins, and non-starchy vegetables.",
        "guidelines": [
            "Low glycemic index (<55 GI)",
            "Low added sugars (<5g per serving)",
            "High fiber content (>3g per serving)",
            "Complex carbohydrates only",
            "Balanced macronutrient profile",
        ],
        "hero_image": "/images/products/brownrice.jpeg",
    },
    {
        "slug": "hypertension",
        "name": "Hypertension Friendly",
        "short_name": "Blood Pressure",
        "icon": "💊",
        "color": "from-emerald-500 to-teal-600",
        "bg_color": "bg-emerald-50 dark:bg-emerald-950/30",
        "border_color": "border-emerald-200 dark:border-emerald-800",
        "text_color": "text-emerald-700 dark:text-emerald-300",
        "description": "DASH diet-aligned foods — low in sodium, rich in potassium, magnesium, and calcium to help manage blood pressure.",
        "guidelines": [
            "Very low sodium (<200mg per serving)",
            "Rich in potassium",
            "High in magnesium",
            "Low saturated fat",
            "DASH diet compliant",
        ],
        "hero_image": "/images/products/spinach.jpeg",
    },
]

PRODUCTS = [
    {
        "name": "Wild-Caught Salmon Fillet",
        "slug": "wild-caught-salmon",
        "price": 24.99,
        "image": "/images/products/salmon.jpeg",
        "description": "Premium wild-caught salmon rich in omega-3 fatty acids. Supports heart health and reduces inflammation. Sustainably sourced.",
        "categories": ["cardiovascular"],
        "nutrition": {
            "serving_size": "150g",
            "calories": 280,
            "total_fat": 12,
            "saturated_fat": 2.5,
            "trans_fat": 0,
            "cholesterol": 85,
            "sodium": 75,
            "total_carbs": 0,
            "fiber": 0,
            "sugars": 0,
            "protein": 39,
            "potassium": 628,
        },
        "ingredients": ["Wild salmon", "Sea salt"],
        "warnings": [],
        "health_badges": ["heart-healthy", "omega-3-rich", "low-sodium"],
        "suitability": {"cardiovascular": 95, "diabetes": 80, "hypertension": 85},
        "rating": 4.8,
        "reviews": 124,
    },
    {
        "name": "Organic Brown Rice",
        "slug": "organic-brown-rice",
        "price": 8.49,
        "image": "/images/products/brownrice.jpeg",
        "description": "Whole grain brown rice with a low glycemic index. Rich in fiber and manganese — ideal for blood sugar management.",
        "categories": ["diabetes", "hypertension"],
        "nutrition": {
            "serving_size": "185g (cooked)",
            "calories": 216,
            "total_fat": 1.8,
            "saturated_fat": 0.4,
            "trans_fat": 0,
            "cholesterol": 0,
            "sodium": 10,
            "total_carbs": 45,
            "fiber": 3.5,
            "sugars": 0.7,
            "protein": 5,
            "potassium": 154,
        },
        "ingredients": ["Organic whole grain brown rice"],
        "warnings": [],
        "health_badges": ["low-gi", "whole-grain", "low-sodium"],
        "suitability": {"cardiovascular": 70, "diabetes": 90, "hypertension": 88},
        "rating": 4.6,
        "reviews": 89,
    },
    {
        "name": "Fresh Broccoli Crowns",
        "slug": "fresh-broccoli",
        "price": 4.99,
        "image": "/images/products/brocolli.jpeg",
        "description": "Fresh organic broccoli crowns packed with vitamins C, K, and folate. Rich in sulforaphane, a powerful antioxidant.",
        "categories": ["cardiovascular", "diabetes", "hypertension"],
        "nutrition": {
            "serving_size": "148g",
            "calories": 50,
            "total_fat": 0.6,
            "saturated_fat": 0.1,
            "trans_fat": 0,
            "cholesterol": 0,
            "sodium": 49,
            "total_carbs": 10,
            "fiber": 3.8,
            "sugars": 2.5,
            "protein": 4.2,
            "potassium": 457,
        },
        "ingredients": ["Fresh organic broccoli"],
        "warnings": [],
        "health_badges": ["low-calorie", "high-fiber", "antioxidant-rich"],
        "suitability": {"cardiovascular": 92, "diabetes": 95, "hypertension": 93},
        "rating": 4.5,
        "reviews": 67,
    },
    {
        "name": "Organic Rolled Oats",
        "slug": "organic-rolled-oats",
        "price": 6.99,
        "image": "/images/products/oats.jpeg",
        "description": "Steel-cut organic oats rich in beta-glucan soluble fiber. Clinically proven to reduce LDL cholesterol levels.",
        "categories": ["cardiovascular", "diabetes"],
        "nutrition": {
            "serving_size": "40g (dry)",
            "calories": 150,
            "total_fat": 2.5,
            "saturated_fat": 0.5,
            "trans_fat": 0,
            "cholesterol": 0,
            "sodium": 0,
            "total_carbs": 27,
            "fiber": 4,
            "sugars": 1,
            "protein": 5,
            "potassium": 147,
        },
        "ingredients": ["100% organic whole grain rolled oats"],
        "warnings": ["Contains gluten"],
        "health_badges": ["heart-healthy", "high-fiber", "low-gi"],
        "suitability": {"cardiovascular": 90, "diabetes": 85, "hypertension": 75},
        "rating": 4.7,
        "reviews": 156,
    },
    {
        "name": "Fresh Spinach Leaves",
        "slug": "fresh-spinach",
        "price": 3.99,
        "image": "/images/products/spinach.jpeg",
        "description": "Baby spinach leaves rich in potassium, magnesium, and nitrates — naturally supports healthy blood pressure levels.",
        "categories": ["hypertension", "cardiovascular"],
        "nutrition": {
            "serving_size": "85g",
            "calories": 20,
            "total_fat": 0.3,
            "saturated_fat": 0,
            "trans_fat": 0,
            "cholesterol": 0,
            "sodium": 65,
            "total_carbs": 3,
            "fiber": 2,
            "sugars": 0.4,
            "protein": 2.9,
            "potassium": 558,
        },
        "ingredients": ["Fresh organic baby spinach"],
        "warnings": [],
        "health_badges": ["low-calorie", "potassium-rich", "iron-rich"],
        "suitability": {"cardiovascular": 88, "diabetes": 82, "hypertension": 96},
        "rating": 4.4,
        "reviews": 72,
    },
    {
        "name": "Navel Oranges (6-pack)",
        "slug": "navel-oranges",
        "price": 5.49,
        "image": "/images/products/orange.jpeg",
        "description": "Sweet navel oranges packed with vitamin C and hesperidin flavonoids. Supports circulation and immune function.",
        "categories": ["diabetes", "cardiovascular"],
        "nutrition": {
            "serving_size": "140g (1 orange)",
            "calories": 69,
            "total_fat": 0.2,
            "saturated_fat": 0,
            "trans_fat": 0,
            "cholesterol": 0,
            "sodium": 1,
            "total_carbs": 18,
            "fiber": 3.1,
            "sugars": 12,
            "protein": 1.3,
            "potassium": 232,
        },
        "ingredients": ["Fresh navel oranges"],
        "warnings": [{"type": "sugar", "message": "Contains natural sugars (12g)"}],
        "health_badges": ["vitamin-c", "low-sodium", "antioxidant-rich"],
        "suitability": {"cardiovascular": 78, "diabetes": 65, "hypertension": 80},
        "rating": 4.3,
        "reviews": 91,
    },
    {
        "name": "Greek Yoghurt (Low-Fat)",
        "slug": "greek-yoghurt",
        "price": 7.99,
        "image": "/images/products/greekyoghurt.jpeg",
        "description": "Creamy low-fat Greek yoghurt with live probiotics. High in protein and calcium — great for gut and bone health.",
        "categories": ["diabetes", "hypertension"],
        "nutrition": {
            "serving_size": "170g",
            "calories": 100,
            "total_fat": 0.7,
            "saturated_fat": 0.3,
            "trans_fat": 0,
            "cholesterol": 10,
            "sodium": 56,
            "total_carbs": 6,
            "fiber": 0,
            "sugars": 4,
            "protein": 17,
            "potassium": 240,
        },
        "ingredients": [
            "Pasteurized skim milk",
            "Live active cultures (L. acidophilus, Bifidus, L. casei)",
        ],
        "warnings": ["Contains dairy"],
        "health_badges": ["high-protein", "probiotic", "low-fat"],
        "suitability": {"cardiovascular": 70, "diabetes": 82, "hypertension": 78},
        "rating": 4.6,
        "reviews": 108,
    },
    {
        "name": "Organic Quinoa",
        "slug": "organic-quinoa",
        "price": 9.99,
        "image": "/images/products/quinoa.jpeg",
        "description": "Complete protein quinoa with all 9 essential amino acids. Gluten-free whole grain packed with magnesium and iron.",
        "categories": ["cardiovascular", "diabetes", "hypertension"],
        "nutrition": {
            "serving_size": "185g (cooked)",
            "calories": 222,
            "total_fat": 3.5,
            "saturated_fat": 0.4,
            "trans_fat": 0,
            "cholesterol": 0,
            "sodium": 13,
            "total_carbs": 39,
            "fiber": 5.2,
            "sugars": 1.6,
            "protein": 8.1,
            "potassium": 318,
        },
        "ingredients": ["Organic white quinoa"],
        "warnings": [],
        "health_badges": ["complete-protein", "gluten-free", "whole-grain"],
        "suitability": {"cardiovascular": 88, "diabetes": 87, "hypertension": 90},
        "rating": 4.8,
        "reviews": 134,
    },
    {
        "name": "Green Lentils",
        "slug": "green-lentils",
        "price": 5.49,
        "image": "/images/products/lentils.jpeg",
        "description": "Organic green lentils — an excellent plant-based protein source. Very high in fiber and folate, with minimal fat.",
        "categories": ["cardiovascular", "diabetes"],
        "nutrition": {
            "serving_size": "198g (cooked)",
            "calories": 230,
            "total_fat": 0.8,
            "saturated_fat": 0.1,
            "trans_fat": 0,
            "cholesterol": 0,
            "sodium": 4,
            "total_carbs": 40,
            "fiber": 15.6,
            "sugars": 3.6,
            "protein": 17.9,
            "potassium": 731,
        },
        "ingredients": ["Organic green lentils"],
        "warnings": [],
        "health_badges": ["high-fiber", "plant-protein", "low-fat"],
        "suitability": {"cardiovascular": 92, "diabetes": 88, "hypertension": 85},
        "rating": 4.5,
        "reviews": 76,
    },
    {
        "name": "Organic Bananas (bunch)",
        "slug": "organic-bananas",
        "price": 3.29,
        "image": "/images/products/bananas.jpeg",
        "description": "Organic bananas extremely rich in potassium — nature's blood pressure regulator. Quick energy with slow-release carbs.",
        "categories": ["hypertension"],
        "nutrition": {
            "serving_size": "118g (1 medium)",
            "calories": 105,
            "total_fat": 0.4,
            "saturated_fat": 0.1,
            "trans_fat": 0,
            "cholesterol": 0,
            "sodium": 1,
            "total_carbs": 27,
            "fiber": 3.1,
            "sugars": 14,
            "protein": 1.3,
            "potassium": 422,
        },
        "ingredients": ["Organic bananas"],
        "warnings": [{"type": "sugar", "message": "Contains natural sugars (14g)"}],
        "health_badges": ["potassium-rich", "low-sodium", "energy-boost"],
        "suitability": {"cardiovascular": 72, "diabetes": 55, "hypertension": 94},
        "rating": 4.2,
        "reviews": 203,
    },
    {
        "name": "Skinless Chicken Breast",
        "slug": "skinless-chicken-breast",
        "price": 12.99,
        "image": "/images/products/skinlesschickenbreast.jpeg",
        "description": "Lean, skinless chicken breast — high-quality protein with very low saturated fat. Perfect for heart-healthy meals.",
        "categories": ["cardiovascular", "diabetes"],
        "nutrition": {
            "serving_size": "120g",
            "calories": 165,
            "total_fat": 3.6,
            "saturated_fat": 1,
            "trans_fat": 0,
            "cholesterol": 85,
            "sodium": 74,
            "total_carbs": 0,
            "fiber": 0,
            "sugars": 0,
            "protein": 31,
            "potassium": 256,
        },
        "ingredients": ["Skinless chicken breast"],
        "warnings": [],
        "health_badges": ["high-protein", "low-fat", "lean-meat"],
        "suitability": {"cardiovascular": 85, "diabetes": 80, "hypertension": 75},
        "rating": 4.6,
        "reviews": 98,
    },
    {
        "name": "Fresh Strawberries",
        "slug": "fresh-strawberries",
        "price": 6.49,
        "image": "/images/products/stawberries.jpeg",
        "description": "Sweet organic strawberries loaded with anthocyanins and vitamin C. Rich in antioxidants that protect blood vessels.",
        "categories": ["cardiovascular", "hypertension"],
        "nutrition": {
            "serving_size": "152g (1 cup)",
            "calories": 49,
            "total_fat": 0.5,
            "saturated_fat": 0,
            "trans_fat": 0,
            "cholesterol": 0,
            "sodium": 2,
            "total_carbs": 12,
            "fiber": 3,
            "sugars": 7.4,
            "protein": 1,
            "potassium": 233,
        },
        "ingredients": ["Fresh organic strawberries"],
        "warnings": [],
        "health_badges": ["antioxidant-rich", "low-calorie", "vitamin-c"],
        "suitability": {"cardiovascular": 85, "diabetes": 70, "hypertension": 82},
        "rating": 4.4,
        "reviews": 87,
    },
    {
        "name": "Low-Fat Cottage Cheese",
        "slug": "low-fat-cheese",
        "price": 5.99,
        "image": "/images/products/lowfatcheese.jpeg",
        "description": "Creamy low-fat cottage cheese high in casein protein. Slow-digesting protein helps maintain stable blood sugar overnight.",
        "categories": ["diabetes"],
        "nutrition": {
            "serving_size": "113g",
            "calories": 90,
            "total_fat": 2.5,
            "saturated_fat": 1.5,
            "trans_fat": 0,
            "cholesterol": 15,
            "sodium": 270,
            "total_carbs": 5,
            "fiber": 0,
            "sugars": 4,
            "protein": 12,
            "potassium": 97,
        },
        "ingredients": [
            "Cultured pasteurized skim milk",
            "Cream",
            "Salt",
            "Stabilizer",
        ],
        "warnings": [
            "Contains dairy",
            {"type": "sodium", "message": "Moderate sodium (270mg)"},
        ],
        "health_badges": ["high-protein", "low-fat"],
        "suitability": {"cardiovascular": 60, "diabetes": 75, "hypertension": 50},
        "rating": 4.1,
        "reviews": 45,
    },
    {
        "name": "Reduced-Fat Cow's Milk",
        "slug": "reduced-fat-milk",
        "price": 4.49,
        "image": "/images/products/reducedfatcowsmilk.jpeg",
        "description": "Fresh reduced-fat (2%) cow's milk — an excellent source of calcium and vitamin D. Supports bone health and hydration.",
        "categories": ["hypertension"],
        "nutrition": {
            "serving_size": "240ml",
            "calories": 122,
            "total_fat": 4.8,
            "saturated_fat": 3,
            "trans_fat": 0,
            "cholesterol": 20,
            "sodium": 115,
            "total_carbs": 12,
            "fiber": 0,
            "sugars": 12,
            "protein": 8.1,
            "potassium": 342,
        },
        "ingredients": ["Reduced-fat milk", "Vitamin A palmitate", "Vitamin D3"],
        "warnings": [
            "Contains dairy",
            {"type": "sugar", "message": "Contains lactose (12g)"},
        ],
        "health_badges": ["calcium-rich", "vitamin-d"],
        "suitability": {"cardiovascular": 55, "diabetes": 60, "hypertension": 72},
        "rating": 4.3,
        "reviews": 62,
    },
]


class Command(BaseCommand):
    help = "Seed the database with 14 products, 3 categories, and demo users"

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE("🌱 Seeding LavishBite database..."))

        # ── Categories ──
        self.stdout.write("  Creating health categories...")
        cat_map = {}
        for cat_data in CATEGORIES:
            cat, created = HealthCategory.objects.update_or_create(
                slug=cat_data["slug"],
                defaults=cat_data,
            )
            cat_map[cat.slug] = cat
            status = "created" if created else "updated"
            self.stdout.write(f"    {cat.icon} {cat.name} — {status}")

        # ── Products ──
        self.stdout.write("  Creating products...")
        for prod_data in PRODUCTS:
            nutrition_data = prod_data.pop("nutrition")
            ingredients_data = prod_data.pop("ingredients")
            suitability_data = prod_data.pop("suitability")
            category_slugs = prod_data.pop("categories")

            product, created = Product.objects.update_or_create(
                slug=prod_data["slug"],
                defaults=prod_data,
            )

            # Set categories
            product.categories.set(
                [cat_map[s] for s in category_slugs if s in cat_map]
            )

            # Create/update nutrition
            NutritionFacts.objects.update_or_create(
                product=product, defaults=nutrition_data
            )

            # Create/update suitability
            ProductSuitability.objects.update_or_create(
                product=product, defaults=suitability_data
            )

            # Create ingredients (clear old, add new)
            product.ingredients.all().delete()
            for ing_name in ingredients_data:
                Ingredient.objects.create(product=product, name=ing_name)

            status = "created" if created else "updated"
            self.stdout.write(f"    🍽️  {product.name} (${product.price}) — {status}")

        # ── Demo Users ──
        self.stdout.write("  Creating demo users...")

        # Superadmin
        admin_user, created = User.objects.get_or_create(
            username="admin",
            defaults={
                "email": "admin@lavishbite.com",
                "role": "superadmin",
                "organization": "LavishBite",
                "is_staff": True,
                "is_superuser": True,
            },
        )
        if created:
            admin_user.set_password("admin123")
            admin_user.save()
            self.stdout.write("    👤 admin (superadmin) — created (password: admin123)")
        else:
            self.stdout.write("    👤 admin (superadmin) — already exists")

        # Hotel admin
        hotel_user, created = User.objects.get_or_create(
            username="grandserena",
            defaults={
                "email": "manager@grandserena.co.ke",
                "first_name": "James",
                "last_name": "Mwangi",
                "role": "hotel_admin",
                "organization": "Grand Serena Hotel",
                "phone": "+254712345678",
            },
        )
        if created:
            hotel_user.set_password("hotel123")
            hotel_user.save()
            self.stdout.write(
                "    🏨 grandserena (hotel_admin) — created (password: hotel123)"
            )
        else:
            self.stdout.write("    🏨 grandserena (hotel_admin) — already exists")

        # Customer
        customer, created = User.objects.get_or_create(
            username="customer1",
            defaults={
                "email": "customer@example.com",
                "first_name": "Alice",
                "last_name": "Wanjiku",
                "role": "customer",
                "health_profile": {
                    "conditions": ["cardiovascular", "diabetes"],
                },
            },
        )
        if created:
            customer.set_password("customer123")
            customer.save()
            self.stdout.write(
                "    🛒 customer1 (customer) — created (password: customer123)"
            )
        else:
            self.stdout.write("    🛒 customer1 (customer) — already exists")

        self.stdout.write(
            self.style.SUCCESS(
                f"\n✅ Seeding complete! "
                f"{HealthCategory.objects.count()} categories, "
                f"{Product.objects.count()} products, "
                f"{User.objects.count()} users."
            )
        )
