"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
    const { cartItems, cartTotal, cartCount, clearCart, isHydrated } = useCart();
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        clearCart();
    };

    if (!isHydrated) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <div className="animate-pulse text-slate-400">Loading...</div>
            </div>
        );
    }

    if (submitted) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-20 text-center">
                <div className="glass rounded-3xl border border-white/40 p-12">
                    <div className="text-6xl mb-4">✅</div>
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">
                        Thank You For Your Order!
                    </h1>
                    <p className="text-slate-500 mb-2">
                        Your health-compliant food order has been placed successfully.
                    </p>
                    <p className="text-sm text-slate-400 mb-8">
                        Welcome again to LavishBite — your one-stop health food platform!
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold px-8 py-3 rounded-xl hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h1 className="text-3xl font-bold text-slate-800 mb-4">
                    No items to checkout
                </h1>
                <Link
                    href="/"
                    className="text-emerald-600 hover:underline"
                >
                    ← Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form */}
                <div>
                    <form
                        onSubmit={handleSubmit}
                        className="glass rounded-2xl border border-white/40 p-6 space-y-6"
                    >
                        {/* Contact */}
                        <div>
                            <h3 className="text-lg font-bold text-slate-800 mb-4">
                                Contact Information
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="John Doe"
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white/80 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="john@hotel.com"
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white/80 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-slate-600 mb-1">
                                    Organization / Hotel
                                </label>
                                <input
                                    type="text"
                                    placeholder="Grand Hotel & Spa"
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white/80 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Shipping */}
                        <div className="border-t border-slate-100 pt-6">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">
                                Shipping Address
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="123 Main Street"
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white/80 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 mb-1">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Nairobi"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white/80 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 mb-1">
                                            Zip Code
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="00100"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white/80 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Placeholder */}
                        <div className="border-t border-slate-100 pt-6">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">
                                Payment Method
                            </h3>
                            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200 text-center">
                                <div className="text-3xl mb-2">💳</div>
                                <p className="text-sm text-slate-500">
                                    Payment integration coming soon
                                </p>
                                <p className="text-xs text-slate-400 mt-1">
                                    M-Pesa, Visa, Mastercard, PayPal
                                </p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-lg hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg shadow-emerald-200 hover:shadow-xl active:scale-[0.98]"
                        >
                            Place Order — ${cartTotal.toFixed(2)}
                        </button>
                    </form>
                </div>

                {/* Order Summary */}
                <div>
                    <div className="glass rounded-2xl border border-white/40 p-6 sticky top-24">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-slate-800">
                                Order Summary
                            </h3>
                            <Link
                                href="/cart"
                                className="text-sm text-emerald-600 hover:underline"
                            >
                                ← Edit Cart
                            </Link>
                        </div>

                        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-3 bg-slate-50 rounded-xl p-3"
                                >
                                    <div className="w-14 h-14 relative rounded-lg overflow-hidden flex-shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                            sizes="56px"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-800 truncate">
                                            {item.name}
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            ${item.price.toFixed(2)} × {item.quantity}
                                        </p>
                                    </div>
                                    <span className="text-sm font-bold text-slate-800">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-slate-100 mt-4 pt-4 space-y-2 text-sm">
                            <div className="flex justify-between text-slate-600">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                                <span>Shipping</span>
                                <span className="text-emerald-600">Free</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-slate-800 pt-2 border-t border-slate-100">
                                <span>Total</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
