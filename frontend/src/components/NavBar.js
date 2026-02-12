"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function NavBar() {
    const { cartCount } = useCart();
    const [menuOpen, setMenuOpen] = useState(false);

    const healthLinks = [
        { href: "/category/cardiovascular", label: "Heart Health", icon: "❤️" },
        { href: "/category/diabetes", label: "Diabetes", icon: "🩸" },
        { href: "/category/hypertension", label: "Blood Pressure", icon: "💊" },
    ];

    return (
        <nav className="glass sticky top-0 z-50 shadow-lg shadow-black/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-2xl">🥗</span>
                        <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent group-hover:from-emerald-500 group-hover:to-cyan-500 transition-all duration-300">
                            LavishBite
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {healthLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-200"
                            >
                                <span className="text-base">{link.icon}</span>
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-200"
                        >
                            <span className="text-base">📊</span>
                            Dashboard
                        </Link>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        {/* Cart */}
                        <Link
                            href="/cart"
                            className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-200"
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
                            <span className="hidden sm:inline text-sm font-medium">Cart</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg pulse-soft">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Login Button */}
                        <button className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-semibold hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 shadow-md shadow-emerald-200 hover:shadow-lg hover:shadow-emerald-300">
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
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            Login
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-emerald-50"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {menuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden pb-4 border-t border-slate-100">
                        <div className="flex flex-col gap-1 pt-3">
                            {healthLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all"
                                >
                                    <span>{link.icon}</span>
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href="/dashboard"
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all"
                            >
                                <span>📊</span>
                                Dashboard
                            </Link>
                            <button className="mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-semibold">
                                Login
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
