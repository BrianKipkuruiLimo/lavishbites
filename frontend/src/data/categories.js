export const categories = [
    {
        slug: "cardiovascular",
        name: "Cardiovascular Health",
        shortName: "Heart Health",
        icon: "❤️",
        color: "from-rose-500 to-red-600",
        bgColor: "bg-rose-50 dark:bg-rose-950/30",
        borderColor: "border-rose-200 dark:border-rose-800",
        textColor: "text-rose-700 dark:text-rose-300",
        description:
            "Foods that support heart health — low in saturated fat, rich in omega-3 fatty acids, fiber, and antioxidants.",
        guidelines: [
            "Low saturated fat (<7% of calories)",
            "Rich in omega-3 fatty acids",
            "High fiber content (>3g per serving)",
            "Low sodium (<400mg per serving)",
            "No trans fats",
        ],
        heroImage: "/images/products/salmon.jpeg",
    },
    {
        slug: "diabetes",
        name: "Diabetes Friendly",
        shortName: "Diabetes",
        icon: "🩸",
        color: "from-blue-500 to-indigo-600",
        bgColor: "bg-blue-50 dark:bg-blue-950/30",
        borderColor: "border-blue-200 dark:border-blue-800",
        textColor: "text-blue-700 dark:text-blue-300",
        description:
            "Low-glycemic foods that help manage blood sugar levels — whole grains, lean proteins, and non-starchy vegetables.",
        guidelines: [
            "Low glycemic index (<55 GI)",
            "Low added sugars (<5g per serving)",
            "High fiber content (>3g per serving)",
            "Complex carbohydrates only",
            "Balanced macronutrient profile",
        ],
        heroImage: "/images/products/brownrice.jpeg",
    },
    {
        slug: "hypertension",
        name: "Hypertension Friendly",
        shortName: "Blood Pressure",
        icon: "💊",
        color: "from-emerald-500 to-teal-600",
        bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
        borderColor: "border-emerald-200 dark:border-emerald-800",
        textColor: "text-emerald-700 dark:text-emerald-300",
        description:
            "DASH diet-aligned foods — low in sodium, rich in potassium, magnesium, and calcium to help manage blood pressure.",
        guidelines: [
            "Very low sodium (<200mg per serving)",
            "Rich in potassium",
            "High in magnesium",
            "Low saturated fat",
            "DASH diet compliant",
        ],
        heroImage: "/images/products/spinach.jpeg",
    },
];

export function getCategoryBySlug(slug) {
    return categories.find((c) => c.slug === slug);
}
