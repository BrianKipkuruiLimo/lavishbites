const badgeConfig = {
    "heart-healthy": { label: "Heart Healthy", color: "bg-rose-100 text-rose-700" },
    "omega-3-rich": { label: "Omega-3", color: "bg-sky-100 text-sky-700" },
    "low-sodium": { label: "Low Sodium", color: "bg-teal-100 text-teal-700" },
    "low-gi": { label: "Low GI", color: "bg-blue-100 text-blue-700" },
    "whole-grain": { label: "Whole Grain", color: "bg-amber-100 text-amber-700" },
    "low-calorie": { label: "Low Cal", color: "bg-green-100 text-green-700" },
    "high-fiber": { label: "High Fiber", color: "bg-lime-100 text-lime-700" },
    "antioxidant-rich": { label: "Antioxidants", color: "bg-purple-100 text-purple-700" },
    "high-protein": { label: "High Protein", color: "bg-orange-100 text-orange-700" },
    "low-fat": { label: "Low Fat", color: "bg-cyan-100 text-cyan-700" },
    "plant-protein": { label: "Plant Protein", color: "bg-emerald-100 text-emerald-700" },
    "lean-meat": { label: "Lean Meat", color: "bg-red-100 text-red-700" },
    "potassium-rich": { label: "Potassium+", color: "bg-indigo-100 text-indigo-700" },
    "iron-rich": { label: "Iron Rich", color: "bg-orange-100 text-orange-700" },
    "vitamin-c": { label: "Vitamin C", color: "bg-yellow-100 text-yellow-700" },
    "vitamin-d": { label: "Vitamin D", color: "bg-amber-100 text-amber-700" },
    "probiotic": { label: "Probiotic", color: "bg-violet-100 text-violet-700" },
    "complete-protein": { label: "Complete Protein", color: "bg-fuchsia-100 text-fuchsia-700" },
    "gluten-free": { label: "Gluten Free", color: "bg-stone-100 text-stone-700" },
    "calcium-rich": { label: "Calcium+", color: "bg-sky-100 text-sky-700" },
    "energy-boost": { label: "Energy", color: "bg-yellow-100 text-yellow-700" },
};

export default function HealthBadge({ badge }) {
    const config = badgeConfig[badge] || {
        label: badge.replace(/-/g, " "),
        color: "bg-slate-100 text-slate-700",
    };

    return (
        <span
            className={`inline-flex items-center text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${config.color}`}
        >
            {config.label}
        </span>
    );
}
