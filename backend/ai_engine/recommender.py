"""
AI-powered recommendation engine using scikit-learn.
Content-based filtering on product nutrition vectors.
"""

import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MinMaxScaler

# Condition-specific weight profiles:
# Higher weight = more important for that condition
CONDITION_WEIGHTS = {
    "cardiovascular": {
        "calories": 0.5,
        "total_fat": -0.8,    # penalize high fat
        "saturated_fat": -1.0, # heavily penalize sat fat
        "trans_fat": -1.0,
        "cholesterol": -0.6,
        "sodium": -0.7,       # penalize sodium
        "total_carbs": 0.1,
        "fiber": 0.9,         # reward fiber
        "sugars": -0.3,
        "protein": 0.6,
        "potassium": 0.8,     # reward potassium
    },
    "diabetes": {
        "calories": -0.3,
        "total_fat": -0.2,
        "saturated_fat": -0.4,
        "trans_fat": -1.0,
        "cholesterol": -0.2,
        "sodium": -0.3,
        "total_carbs": -0.7,  # penalize high carbs
        "fiber": 1.0,         # strongly reward fiber
        "sugars": -1.0,       # heavily penalize sugars
        "protein": 0.7,
        "potassium": 0.3,
    },
    "hypertension": {
        "calories": 0.1,
        "total_fat": -0.3,
        "saturated_fat": -0.5,
        "trans_fat": -1.0,
        "cholesterol": -0.3,
        "sodium": -1.0,       # most critical: penalize sodium
        "total_carbs": 0.1,
        "fiber": 0.6,
        "sugars": -0.2,
        "protein": 0.4,
        "potassium": 1.0,     # strongly reward potassium (DASH diet)
    },
}

NUTRITION_FIELDS = [
    "calories", "total_fat", "saturated_fat", "trans_fat",
    "cholesterol", "sodium", "total_carbs", "fiber",
    "sugars", "protein", "potassium",
]


def build_nutrition_vector(nutrition_obj):
    """Convert a NutritionFacts model instance to a numpy vector."""
    return np.array([
        float(getattr(nutrition_obj, field, 0))
        for field in NUTRITION_FIELDS
    ])


def get_recommendations(condition, products_qs, exclude_id=None, limit=4):
    """
    Get AI-powered product recommendations for a health condition.

    Uses cosine similarity between product nutrition vectors
    weighted by condition-specific importance factors.

    Args:
        condition: 'cardiovascular' | 'diabetes' | 'hypertension'
        products_qs: QuerySet of Product objects with nutrition
        exclude_id: Product ID to exclude (current product)
        limit: Number of recommendations

    Returns:
        List of (product, score) tuples sorted by score desc
    """
    if condition not in CONDITION_WEIGHTS:
        return []

    weights = CONDITION_WEIGHTS[condition]
    weight_vector = np.array([weights.get(f, 0) for f in NUTRITION_FIELDS])

    products_with_scores = []

    for product in products_qs:
        if product.id == exclude_id:
            continue
        if not hasattr(product, "nutrition"):
            continue

        nutrition_vec = build_nutrition_vector(product.nutrition)

        # Normalize the nutrition vector
        norms = np.linalg.norm(nutrition_vec)
        if norms > 0:
            normalized = nutrition_vec / norms
        else:
            normalized = nutrition_vec

        # Weighted dot product as similarity score
        score = np.dot(normalized, weight_vector)

        # Blend with existing suitability score if available
        if hasattr(product, "suitability"):
            existing = getattr(product.suitability, condition, 50) / 100.0
            score = 0.4 * score + 0.6 * existing

        products_with_scores.append((product, float(score)))

    # Sort by score descending and return top N
    products_with_scores.sort(key=lambda x: x[1], reverse=True)
    return products_with_scores[:limit]


def check_compliance(product, condition):
    """
    Check if a product meets the dietary guidelines for a health condition.

    Returns:
        dict with 'compliant' (bool), 'score' (0-100), 'issues' (list),
        and 'passes' (list)
    """
    if not hasattr(product, "nutrition"):
        return {
            "compliant": False,
            "score": 0,
            "issues": ["No nutrition data available"],
            "passes": [],
        }

    n = product.nutrition
    issues = []
    passes = []

    if condition == "cardiovascular":
        # Saturated fat < 2g
        if float(n.saturated_fat) < 2:
            passes.append("Low saturated fat ✓")
        else:
            issues.append(f"Saturated fat too high ({n.saturated_fat}g, max 2g)")

        # Sodium < 400mg
        if n.sodium < 400:
            passes.append("Low sodium ✓")
        else:
            issues.append(f"Sodium too high ({n.sodium}mg, max 400mg)")

        # Fiber > 3g
        if float(n.fiber) >= 3:
            passes.append("High fiber ✓")
        else:
            issues.append(f"Fiber too low ({n.fiber}g, min 3g)")

        # Trans fat = 0
        if float(n.trans_fat) == 0:
            passes.append("No trans fats ✓")
        else:
            issues.append(f"Contains trans fats ({n.trans_fat}g)")

    elif condition == "diabetes":
        # Low sugars < 5g
        if float(n.sugars) < 5:
            passes.append("Low added sugars ✓")
        else:
            issues.append(f"Sugar too high ({n.sugars}g, max 5g)")

        # Fiber > 3g
        if float(n.fiber) >= 3:
            passes.append("High fiber ✓")
        else:
            issues.append(f"Fiber too low ({n.fiber}g, min 3g)")

        # Moderate carbs < 45g
        if float(n.total_carbs) <= 45:
            passes.append("Moderate carbohydrates ✓")
        else:
            issues.append(
                f"Carbs too high ({n.total_carbs}g, max 45g)"
            )

    elif condition == "hypertension":
        # Very low sodium < 200mg
        if n.sodium < 200:
            passes.append("Very low sodium ✓")
        else:
            issues.append(f"Sodium too high ({n.sodium}mg, max 200mg)")

        # Potassium > 300mg
        if n.potassium >= 300:
            passes.append("Rich in potassium ✓")
        else:
            issues.append(f"Low potassium ({n.potassium}mg, min 300mg)")

        # Low saturated fat
        if float(n.saturated_fat) < 2:
            passes.append("Low saturated fat ✓")
        else:
            issues.append(
                f"Saturated fat too high ({n.saturated_fat}g, max 2g)"
            )

    total_checks = len(issues) + len(passes)
    score = int((len(passes) / total_checks * 100)) if total_checks > 0 else 0

    return {
        "compliant": len(issues) == 0,
        "score": score,
        "issues": issues,
        "passes": passes,
    }
