"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import HealthBadge from "./HealthBadge";
import IngredientWarning from "./IngredientWarning";

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const { id, name, price, image, description, healthBadges, warnings, suitability, rating, reviews } = product;

    const topCondition = Object.entries(suitability).sort(([, a], [, b]) => b - a)[0];

    return (
        <div className="group card-hover glass rounded-2xl overflow-hidden border border-white/40">
            {/* Image */}
            <Link href={`/product/${id}`} className="block relative overflow-hidden">
                <div className="aspect-[4/3] relative">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Suitability Score */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1 shadow-md">
                    <span className="text-xs">{topCondition[1]}%</span>
                    <span className="text-xs text-emerald-600 font-semibold">match</span>
                </div>

                {/* Rating */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1 shadow-md">
                    <span className="text-yellow-500 text-xs">★</span>
                    <span className="text-xs font-medium">{rating}</span>
                    <span className="text-xs text-slate-400">({reviews})</span>
                </div>
            </Link>

            {/* Content */}
            <div className="p-4">
                <Link href={`/product/${id}`}>
                    <h3 className="font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors line-clamp-1">
                        {name}
                    </h3>
                </Link>
                <p className="text-sm text-slate-500 mt-1 line-clamp-2">{description}</p>

                {/* Health Badges */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                    {healthBadges.slice(0, 3).map((badge) => (
                        <HealthBadge key={badge} badge={badge} />
                    ))}
                </div>

                {/* Warnings */}
                {warnings.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                        {warnings.map((w, i) => (
                            <IngredientWarning key={i} warning={w} />
                        ))}
                    </div>
                )}

                {/* Price + Add to Cart */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                    <span className="text-xl font-bold text-slate-800">
                        ${price.toFixed(2)}
                    </span>
                    <button
                        onClick={() => addToCart(product)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-semibold hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 shadow-md shadow-emerald-200 hover:shadow-lg active:scale-95"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}
