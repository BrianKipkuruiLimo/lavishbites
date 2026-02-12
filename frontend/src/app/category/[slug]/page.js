"use client";

import { use } from "react";
import Image from "next/image";
import { getCategoryBySlug } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function CategoryPage({ params }) {
    const { slug } = use(params);
    const category = getCategoryBySlug(slug);
    const products = getProductsByCategory(slug);

    if (!category) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h1 className="text-3xl font-bold text-slate-800">
                    Category Not Found
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

    return (
        <div>
            {/* Category Hero */}
            <section
                className={`bg-gradient-to-r ${category.color} text-white py-16 relative overflow-hidden`}
            >
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle, white 1px, transparent 1px)",
                            backgroundSize: "40px 40px",
                        }}
                    />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-4 transition-colors"
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
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Back to Home
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-5xl">{category.icon}</span>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold">
                                {category.name}
                            </h1>
                            <p className="text-white/80 mt-1">
                                {products.length} products available
                            </p>
                        </div>
                    </div>
                    <p className="text-white/80 max-w-2xl mt-2 leading-relaxed">
                        {category.description}
                    </p>

                    {/* Guidelines */}
                    <div className="flex flex-wrap gap-2 mt-6">
                        {category.guidelines.map((g) => (
                            <span
                                key={g}
                                className="bg-white/15 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/20"
                            >
                                ✓ {g}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-slate-800">
                        Products for {category.shortName}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span>Sorted by suitability</span>
                    </div>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                        <p className="text-lg">No products found for this category.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products
                            .sort(
                                (a, b) =>
                                    (b.suitability[slug] || 0) - (a.suitability[slug] || 0)
                            )
                            .map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                    </div>
                )}
            </section>
        </div>
    );
}
