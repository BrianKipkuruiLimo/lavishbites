"use client";

import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";
import { getFeaturedProducts, getRecommendedProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const featured = getFeaturedProducts();
  const aiPicks = getRecommendedProducts("cardiovascular");

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="text-sm">🏥</span>
                <span className="text-sm font-medium">
                  For Hotels & Food Service Providers
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                Health-Compliant
                <br />
                <span className="text-emerald-200">Food, Simplified.</span>
              </h1>
              <p className="mt-6 text-lg text-white/80 max-w-lg leading-relaxed">
                AI-powered food platform that helps hotels and food service
                providers choose the right products for guests with
                cardiovascular, diabetes, and hypertension conditions.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  href="/category/cardiovascular"
                  className="inline-flex items-center gap-2 bg-white text-emerald-700 font-semibold px-6 py-3 rounded-xl hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Browse Products
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
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  Hotel Dashboard
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-white/10 rounded-3xl rotate-6 backdrop-blur-sm" />
                <div className="absolute inset-0 bg-white/10 rounded-3xl -rotate-3 backdrop-blur-sm" />
                <div className="relative bg-white/15 rounded-3xl p-6 backdrop-blur-sm border border-white/20 h-full flex flex-col items-center justify-center gap-4">
                  <span className="text-7xl float-animation">🥗</span>
                  <p className="text-center text-white/90 text-sm font-medium">
                    14+ Health-Certified Products
                  </p>
                  <div className="flex gap-2 mt-2">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs">
                      ❤️ Heart
                    </span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs">
                      🩸 Diabetes
                    </span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs">
                      💊 BP
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Health Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            Shop by Health Condition
          </h2>
          <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
            Every product is classified by health suitability. Choose the
            condition you&apos;re catering for and find the best options.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group card-hover"
            >
              <div
                className={`glass rounded-2xl overflow-hidden border border-white/40 p-6 h-full`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{cat.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                      {cat.name}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {cat.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cat.guidelines.slice(0, 3).map((g) => (
                    <span
                      key={g}
                      className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full"
                    >
                      ✓ {g}
                    </span>
                  ))}
                </div>
                <div
                  className={`mt-5 inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 group-hover:gap-2 transition-all`}
                >
                  Browse Products
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              Featured Products
            </h2>
            <p className="mt-2 text-slate-500">
              Top-rated health-compliant items across all categories
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* AI Recommendations */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🧠</span>
            <h2 className="text-3xl font-bold text-white">
              AI Recommended for You
            </h2>
          </div>
          <p className="text-slate-400 mb-8 max-w-xl">
            Our AI analyzes nutritional profiles and health condition
            suitability to recommend the best products for your needs.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiPicks.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group"
              >
                <div className="glass-dark rounded-2xl overflow-hidden border border-white/10 hover:border-emerald-500/40 transition-all duration-300 card-hover">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute top-2 right-2 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full">
                      {product.suitability.cardiovascular}% match
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-white group-hover:text-emerald-300 transition-colors text-sm">
                      {product.name}
                    </h4>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-emerald-400 font-bold">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <span className="text-yellow-400">★</span>{" "}
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            How It Works for Hotels
          </h2>
          <p className="mt-3 text-slate-500 max-w-lg mx-auto">
            Streamline your food service with health-compliant procurement
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              icon: "🔍",
              title: "Browse by Condition",
              desc: "Filter products by cardiovascular, diabetes, or hypertension suitability. Every item has full nutritional data.",
            },
            {
              step: "02",
              icon: "🧠",
              title: "Get AI Recommendations",
              desc: "Our ML engine suggests optimal products based on your guests' health profiles and dietary requirements.",
            },
            {
              step: "03",
              icon: "📦",
              title: "Order & Track",
              desc: "Place bulk orders with nutritional compliance reports. Track deliveries and manage your hotel's food inventory.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="glass rounded-2xl p-6 border border-white/40 card-hover text-center"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">
                Step {item.step}
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="hero-gradient rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Hotel&apos;s Food Service?
            </h2>
            <p className="text-white/80 max-w-lg mx-auto mb-8">
              Join hotels worldwide using LavishBite to ensure health-compliant
              food for every guest.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-white text-emerald-700 font-bold px-8 py-4 rounded-xl hover:bg-emerald-50 transition-all shadow-xl text-lg"
            >
              Get Started Free
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
