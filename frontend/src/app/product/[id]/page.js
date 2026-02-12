"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductById, getRecommendedProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";
import NutritionLabel from "@/components/NutritionLabel";
import HealthBadge from "@/components/HealthBadge";
import IngredientWarning from "@/components/IngredientWarning";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage({ params }) {
    const { id } = use(params);
    const product = getProductById(id);
    const { addToCart } = useCart();

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h1 className="text-3xl font-bold text-slate-800">
                    Product Not Found
                </h1>
                <Link
                    href="/"
                    className="mt-4 inline-block text-emerald-600 hover:underline"
                >
                    ← Back to Home
                </Link>
            </div>
        );
    }

    const topCondition = Object.entries(product.suitability).sort(
        ([, a], [, b]) => b - a
    )[0];
    const similar = getRecommendedProducts(topCondition[0], product.id);

    return (
        <div>
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                <nav className="flex items-center gap-2 text-sm text-slate-400">
                    <Link href="/" className="hover:text-emerald-600 transition-colors">
                        Home
                    </Link>
                    <span>/</span>
                    <Link
                        href={`/category/${product.categories[0]}`}
                        className="hover:text-emerald-600 transition-colors capitalize"
                    >
                        {product.categories[0]}
                    </Link>
                    <span>/</span>
                    <span className="text-slate-600">{product.name}</span>
                </nav>
            </div>

            {/* Product Detail */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Image */}
                    <div className="glass rounded-2xl overflow-hidden border border-white/40 p-4">
                        <div className="aspect-square relative rounded-xl overflow-hidden">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                            />
                        </div>
                    </div>

                    {/* Info */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-3 mt-3">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <span
                                        key={i}
                                        className={`text-lg ${i < Math.floor(product.rating)
                                                ? "text-yellow-400"
                                                : "text-slate-200"
                                            }`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <span className="text-sm text-slate-500">
                                {product.rating} ({product.reviews} reviews)
                            </span>
                        </div>

                        <p className="text-slate-600 mt-4 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Health Badges */}
                        <div className="flex flex-wrap gap-2 mt-5">
                            {product.healthBadges.map((badge) => (
                                <HealthBadge key={badge} badge={badge} />
                            ))}
                        </div>

                        {/* Warnings */}
                        {product.warnings.length > 0 && (
                            <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200">
                                <p className="text-xs font-semibold text-amber-800 mb-2">
                                    ⚠️ Ingredient Alerts
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {product.warnings.map((w, i) => (
                                        <IngredientWarning key={i} warning={w} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Suitability Scores */}
                        <div className="mt-6 glass rounded-xl p-4 border border-white/40">
                            <h3 className="text-sm font-semibold text-slate-700 mb-3">
                                Health Condition Suitability
                            </h3>
                            <div className="space-y-3">
                                {Object.entries(product.suitability).map(
                                    ([condition, score]) => (
                                        <div key={condition} className="flex items-center gap-3">
                                            <span className="text-sm capitalize w-28 text-slate-600">
                                                {condition === "cardiovascular"
                                                    ? "❤️ Heart"
                                                    : condition === "diabetes"
                                                        ? "🩸 Diabetes"
                                                        : "💊 BP"}
                                            </span>
                                            <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-1000 ${score >= 80
                                                            ? "bg-emerald-500"
                                                            : score >= 60
                                                                ? "bg-amber-400"
                                                                : "bg-red-400"
                                                        }`}
                                                    style={{ width: `${score}%` }}
                                                />
                                            </div>
                                            <span
                                                className={`text-sm font-bold w-12 text-right ${score >= 80
                                                        ? "text-emerald-600"
                                                        : score >= 60
                                                            ? "text-amber-600"
                                                            : "text-red-600"
                                                    }`}
                                            >
                                                {score}%
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Price + Add to Cart */}
                        <div className="mt-6 flex items-center gap-4">
                            <span className="text-3xl font-bold text-slate-800">
                                ${product.price.toFixed(2)}
                            </span>
                            <button
                                onClick={() => addToCart(product)}
                                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-lg hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 shadow-lg shadow-emerald-200 hover:shadow-xl active:scale-[0.98]"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                                    />
                                </svg>
                                Add to Cart
                            </button>
                        </div>

                        {product.inStock ? (
                            <p className="mt-2 text-sm text-emerald-600 flex items-center gap-1">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                                In Stock — Ready to ship
                            </p>
                        ) : (
                            <p className="mt-2 text-sm text-red-500">Out of Stock</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Nutrition Label */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">
                            Nutritional Information
                        </h2>
                        <NutritionLabel nutrition={product.nutrition} />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">
                            Ingredients
                        </h2>
                        <div className="glass rounded-xl p-5 border border-white/40">
                            <ul className="space-y-2">
                                {product.ingredients.map((ing, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-2 text-slate-600"
                                    >
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                        {ing}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <h3 className="text-lg font-bold text-slate-800 mt-6 mb-3">
                            Suitable For
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {product.categories.map((cat) => (
                                <Link
                                    key={cat}
                                    href={`/category/${cat}`}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 text-sm font-medium hover:bg-emerald-100 transition-colors capitalize"
                                >
                                    {cat === "cardiovascular"
                                        ? "❤️"
                                        : cat === "diabetes"
                                            ? "🩸"
                                            : "💊"}{" "}
                                    {cat}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Similar Products */}
            {similar.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="text-xl">🧠</span>
                        <h2 className="text-2xl font-bold text-slate-800">
                            AI Recommended Similar
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {similar.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
