"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartCount,
        cartNutritionSummary,
        isHydrated,
    } = useCart();

    if (!isHydrated) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <div className="animate-pulse text-slate-400">Loading cart...</div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <div className="text-6xl mb-4">🛒</div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">
                    Your cart is empty
                </h1>
                <p className="text-slate-500 mb-8">
                    Add health-compliant products to get started
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold px-6 py-3 rounded-xl hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg"
                >
                    ← Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-8">
                Shopping Cart
                <span className="text-lg font-normal text-slate-400 ml-2">
                    ({cartCount} items)
                </span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="glass rounded-2xl border border-white/40 p-4 flex gap-4"
                        >
                            {/* Image */}
                            <div className="w-24 h-24 relative rounded-xl overflow-hidden flex-shrink-0">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                    sizes="96px"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <Link
                                    href={`/product/${item.id}`}
                                    className="font-semibold text-slate-800 hover:text-emerald-700 transition-colors"
                                >
                                    {item.name}
                                </Link>
                                <p className="text-sm text-slate-400 mt-0.5">
                                    ${item.price.toFixed(2)} each
                                </p>

                                <div className="flex items-center gap-3 mt-3">
                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-0 border border-slate-200 rounded-lg overflow-hidden">
                                        <button
                                            onClick={() =>
                                                updateQuantity(item.id, item.quantity - 1)
                                            }
                                            className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                                        >
                                            −
                                        </button>
                                        <span className="w-10 h-8 flex items-center justify-center text-sm font-semibold bg-slate-50">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() =>
                                                updateQuantity(item.id, item.quantity + 1)
                                            }
                                            className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-400 hover:text-red-600 text-sm transition-colors"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>

                            {/* Subtotal */}
                            <div className="text-right">
                                <span className="text-lg font-bold text-slate-800">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                    {/* Order Summary */}
                    <div className="glass rounded-2xl border border-white/40 p-6">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">
                            Order Summary
                        </h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-slate-600">
                                <span>Subtotal ({cartCount} items)</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                                <span>Shipping</span>
                                <span className="text-emerald-600">Free</span>
                            </div>
                            <div className="border-t border-slate-100 pt-3 flex justify-between">
                                <span className="font-bold text-slate-800 text-lg">Total</span>
                                <span className="font-bold text-slate-800 text-lg">
                                    ${cartTotal.toFixed(2)}
                                </span>
                            </div>
                        </div>
                        <Link
                            href="/checkout"
                            className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg"
                        >
                            Proceed to Checkout
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
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </Link>
                    </div>

                    {/* Nutrition Summary */}
                    <div className="glass rounded-2xl border border-white/40 p-6">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <span>🧪</span> Cart Nutrition Summary
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                {
                                    label: "Calories",
                                    value: cartNutritionSummary.calories,
                                    unit: "kcal",
                                    icon: "🔥",
                                },
                                {
                                    label: "Protein",
                                    value: cartNutritionSummary.protein.toFixed(1),
                                    unit: "g",
                                    icon: "💪",
                                },
                                {
                                    label: "Fiber",
                                    value: cartNutritionSummary.fiber.toFixed(1),
                                    unit: "g",
                                    icon: "🌾",
                                },
                                {
                                    label: "Sodium",
                                    value: cartNutritionSummary.sodium,
                                    unit: "mg",
                                    icon: "🧂",
                                    warn: cartNutritionSummary.sodium > 1500,
                                },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className={`rounded-xl p-3 ${item.warn
                                            ? "bg-amber-50 border border-amber-200"
                                            : "bg-slate-50"
                                        }`}
                                >
                                    <div className="text-lg">{item.icon}</div>
                                    <div
                                        className={`text-xl font-bold ${item.warn ? "text-amber-600" : "text-slate-800"
                                            }`}
                                    >
                                        {item.value}
                                        <span className="text-xs font-normal text-slate-400 ml-0.5">
                                            {item.unit}
                                        </span>
                                    </div>
                                    <div className="text-xs text-slate-500">{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
