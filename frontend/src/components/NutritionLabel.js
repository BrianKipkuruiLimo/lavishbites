export default function NutritionLabel({ nutrition }) {
    if (!nutrition) return null;

    const {
        servingSize,
        calories,
        totalFat,
        saturatedFat,
        transFat,
        cholesterol,
        sodium,
        totalCarbs,
        fiber,
        sugars,
        protein,
        potassium,
    } = nutrition;

    const dailyValues = {
        totalFat: 78,
        saturatedFat: 20,
        cholesterol: 300,
        sodium: 2300,
        totalCarbs: 275,
        fiber: 28,
        sugars: 50,
        protein: 50,
        potassium: 4700,
    };

    const dv = (value, key) => {
        if (!dailyValues[key]) return "";
        return Math.round((value / dailyValues[key]) * 100) + "%";
    };

    const sodiumPct = Math.round((sodium / dailyValues.sodium) * 100);
    const sugarPct = Math.round((sugars / dailyValues.sugars) * 100);

    return (
        <div className="nutrition-label bg-white rounded-xl p-5 max-w-sm">
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Nutrition Facts
            </h3>
            <div className="thick-bar my-1" />

            <div className="flex justify-between text-sm">
                <span className="font-medium">Serving size</span>
                <span className="font-semibold">{servingSize}</span>
            </div>
            <div className="thick-bar my-1" />

            <div className="text-sm">
                <span className="font-medium">Amount per serving</span>
            </div>
            <div className="flex justify-between items-baseline">
                <span className="text-3xl font-extrabold text-slate-900">
                    Calories
                </span>
                <span className="text-3xl font-extrabold text-slate-900">
                    {calories}
                </span>
            </div>
            <div className="thick-bar my-1" />

            <div className="text-right text-xs font-semibold text-slate-500 mb-1">
                % Daily Value*
            </div>

            {[
                { label: "Total Fat", value: `${totalFat}g`, dvValue: dv(totalFat, "totalFat"), bold: true },
                { label: "  Saturated Fat", value: `${saturatedFat}g`, dvValue: dv(saturatedFat, "saturatedFat"), indent: true },
                { label: "  Trans Fat", value: `${transFat}g`, dvValue: "", indent: true },
                { label: "Cholesterol", value: `${cholesterol}mg`, dvValue: dv(cholesterol, "cholesterol"), bold: true },
                { label: "Sodium", value: `${sodium}mg`, dvValue: dv(sodium, "sodium"), bold: true, warn: sodiumPct > 15 },
                { label: "Total Carbohydrate", value: `${totalCarbs}g`, dvValue: dv(totalCarbs, "totalCarbs"), bold: true },
                { label: "  Dietary Fiber", value: `${fiber}g`, dvValue: dv(fiber, "fiber"), indent: true },
                { label: "  Total Sugars", value: `${sugars}g`, dvValue: "", indent: true, warn: sugarPct > 20 },
                { label: "Protein", value: `${protein}g`, dvValue: dv(protein, "protein"), bold: true },
            ].map((item, i) => (
                <div key={i}>
                    <div className="thin-bar" />
                    <div
                        className={`flex justify-between py-0.5 text-sm ${item.indent ? "pl-4" : ""
                            }`}
                    >
                        <span
                            className={`${item.bold ? "font-bold" : ""} ${item.warn ? "text-amber-600" : "text-slate-800"
                                }`}
                        >
                            {item.label}
                            {" "}
                            <span className="font-normal">{item.value}</span>
                            {item.warn && " ⚠️"}
                        </span>
                        <span className="font-bold text-slate-800">{item.dvValue}</span>
                    </div>
                </div>
            ))}

            <div className="thick-bar my-1" />

            <div className="flex justify-between py-0.5 text-sm">
                <span className="text-slate-800">
                    Potassium <span>{potassium}mg</span>
                </span>
                <span className="font-bold text-slate-800">
                    {dv(potassium, "potassium")}
                </span>
            </div>
            <div className="thin-bar" />

            <p className="text-[10px] text-slate-400 mt-2 leading-tight">
                * The % Daily Value tells you how much a nutrient in a serving of
                food contributes to a daily diet. 2,000 calories a day is used for
                general nutrition advice.
            </p>
        </div>
    );
}
