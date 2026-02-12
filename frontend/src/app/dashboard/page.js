"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

export default function DashboardPage() {
    // Mock dashboard data
    const stats = {
        totalOrders: 342,
        revenue: 28450,
        complianceRate: 94.2,
        activeProducts: products.length,
    };

    const recentOrders = [
        {
            id: "LB-1042",
            hotel: "Grand Serena Hotel",
            items: 8,
            total: 186.5,
            status: "delivered",
            date: "2026-02-12",
        },
        {
            id: "LB-1041",
            hotel: "Hemingways Nairobi",
            items: 12,
            total: 312.0,
            status: "processing",
            date: "2026-02-11",
        },
        {
            id: "LB-1040",
            hotel: "Sarova Stanley",
            items: 5,
            total: 94.75,
            status: "delivered",
            date: "2026-02-11",
        },
        {
            id: "LB-1039",
            hotel: "Fairmont The Norfolk",
            items: 15,
            total: 425.0,
            status: "shipped",
            date: "2026-02-10",
        },
        {
            id: "LB-1038",
            hotel: "Radisson Blu",
            items: 7,
            total: 158.25,
            status: "delivered",
            date: "2026-02-10",
        },
    ];

    const dietaryBreakdown = [
        { condition: "Cardiovascular", icon: "❤️", percentage: 38, orders: 130, color: "bg-rose-500" },
        { condition: "Diabetes", icon: "🩸", percentage: 35, orders: 120, color: "bg-blue-500" },
        { condition: "Hypertension", icon: "💊", percentage: 27, orders: 92, color: "bg-emerald-500" },
    ];

    const topProducts = products
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);

    const statusColors = {
        delivered: "bg-emerald-100 text-emerald-700",
        processing: "bg-amber-100 text-amber-700",
        shipped: "bg-blue-100 text-blue-700",
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
                        <span>📊</span> Hotel Dashboard
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Manage your health-compliant food procurement
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/"
                        className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all"
                    >
                        ← Browse Store
                    </Link>
                    <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-semibold hover:from-emerald-500 hover:to-teal-500 transition-all shadow-md">
                        Export Report
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    {
                        label: "Total Orders",
                        value: stats.totalOrders,
                        icon: "📦",
                        change: "+12%",
                        positive: true,
                    },
                    {
                        label: "Revenue",
                        value: `$${stats.revenue.toLocaleString()}`,
                        icon: "💰",
                        change: "+8.5%",
                        positive: true,
                    },
                    {
                        label: "Compliance Rate",
                        value: `${stats.complianceRate}%`,
                        icon: "✅",
                        change: "+2.1%",
                        positive: true,
                    },
                    {
                        label: "Active Products",
                        value: stats.activeProducts,
                        icon: "🥗",
                        change: "+3",
                        positive: true,
                    },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className="glass rounded-2xl border border-white/40 p-5 card-hover"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-2xl">{stat.icon}</span>
                            <span
                                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${stat.positive
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {stat.change}
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-slate-800">
                            {stat.value}
                        </div>
                        <div className="text-sm text-slate-500 mt-0.5">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders */}
                <div className="lg:col-span-2">
                    <div className="glass rounded-2xl border border-white/40 p-6">
                        <h2 className="text-lg font-bold text-slate-800 mb-4">
                            Recent Orders
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-left text-slate-400 text-xs uppercase tracking-wider">
                                        <th className="pb-3 font-semibold">Order ID</th>
                                        <th className="pb-3 font-semibold">Hotel</th>
                                        <th className="pb-3 font-semibold">Items</th>
                                        <th className="pb-3 font-semibold">Total</th>
                                        <th className="pb-3 font-semibold">Status</th>
                                        <th className="pb-3 font-semibold">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {recentOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-slate-50/50">
                                            <td className="py-3 font-mono text-emerald-600 font-medium">
                                                {order.id}
                                            </td>
                                            <td className="py-3 text-slate-700">{order.hotel}</td>
                                            <td className="py-3 text-slate-500">{order.items}</td>
                                            <td className="py-3 font-semibold text-slate-800">
                                                ${order.total.toFixed(2)}
                                            </td>
                                            <td className="py-3">
                                                <span
                                                    className={`inline-flex text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${statusColors[order.status]
                                                        }`}
                                                >
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="py-3 text-slate-400">{order.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Dietary Breakdown */}
                <div className="space-y-6">
                    <div className="glass rounded-2xl border border-white/40 p-6">
                        <h2 className="text-lg font-bold text-slate-800 mb-4">
                            Orders by Health Condition
                        </h2>
                        <div className="space-y-4">
                            {dietaryBreakdown.map((item) => (
                                <div key={item.condition}>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-sm text-slate-600 flex items-center gap-1.5">
                                            <span>{item.icon}</span>
                                            {item.condition}
                                        </span>
                                        <span className="text-sm font-bold text-slate-800">
                                            {item.percentage}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                                        <div
                                            className={`h-full rounded-full ${item.color} transition-all duration-1000`}
                                            style={{ width: `${item.percentage}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1">
                                        {item.orders} orders
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Products */}
                    <div className="glass rounded-2xl border border-white/40 p-6">
                        <h2 className="text-lg font-bold text-slate-800 mb-4">
                            Top Rated Products
                        </h2>
                        <div className="space-y-3">
                            {topProducts.map((product, i) => (
                                <Link
                                    key={product.id}
                                    href={`/product/${product.id}`}
                                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
                                >
                                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-xs font-bold flex items-center justify-center">
                                        {i + 1}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-700 truncate">
                                            {product.name}
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            ${product.price.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs">
                                        <span className="text-yellow-500">★</span>
                                        <span className="font-semibold text-slate-700">
                                            {product.rating}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Compliance Checker */}
            <div className="mt-8 glass rounded-2xl border border-white/40 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">🧠</span>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">
                            AI Product Compliance Checker
                        </h2>
                        <p className="text-sm text-slate-500">
                            Verify if products meet health condition requirements
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {categories.map((cat) => {
                        const catProducts = products.filter((p) =>
                            p.categories.includes(cat.slug)
                        );
                        const avgSuitability =
                            catProducts.reduce(
                                (sum, p) => sum + (p.suitability[cat.slug] || 0),
                                0
                            ) / catProducts.length;

                        return (
                            <div
                                key={cat.slug}
                                className={`rounded-xl p-5 border ${cat.borderColor} ${cat.bgColor}`}
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-2xl">{cat.icon}</span>
                                    <h3 className={`font-bold ${cat.textColor}`}>
                                        {cat.shortName}
                                    </h3>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Products</span>
                                        <span className="font-semibold text-slate-700">
                                            {catProducts.length}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Avg Suitability</span>
                                        <span className="font-semibold text-slate-700">
                                            {avgSuitability.toFixed(0)}%
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">High Match (&gt;80%)</span>
                                        <span className="font-semibold text-emerald-600">
                                            {
                                                catProducts.filter(
                                                    (p) => (p.suitability[cat.slug] || 0) >= 80
                                                ).length
                                            }
                                        </span>
                                    </div>
                                </div>
                                <Link
                                    href={`/category/${cat.slug}`}
                                    className={`mt-4 inline-flex text-sm font-semibold ${cat.textColor} hover:underline`}
                                >
                                    View Products →
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
