export default function IngredientWarning({ warning }) {
    if (typeof warning === "string") {
        return (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                ⚠️ {warning}
            </span>
        );
    }

    const typeConfig = {
        sodium: { icon: "🧂", color: "bg-orange-50 text-orange-700 border-orange-200" },
        sugar: { icon: "🍬", color: "bg-pink-50 text-pink-700 border-pink-200" },
        allergen: { icon: "⚠️", color: "bg-red-50 text-red-700 border-red-200" },
    };

    const config = typeConfig[warning.type] || typeConfig.allergen;

    return (
        <span
            className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${config.color}`}
        >
            {config.icon} {warning.message}
        </span>
    );
}
