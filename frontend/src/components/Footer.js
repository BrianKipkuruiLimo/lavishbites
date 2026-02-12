import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-auto bg-slate-900 text-slate-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <span className="text-2xl">🥗</span>
                            <span className="text-xl font-bold text-white">LavishBite</span>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-md">
                            A decision-support food platform for hotels & food service
                            providers. We help you choose health-compliant foods for guests
                            with cardiovascular, diabetes, and hypertension conditions.
                        </p>
                        <div className="flex gap-3 mt-4">
                            <span className="inline-flex items-center gap-1 text-xs bg-emerald-900/40 text-emerald-400 px-2.5 py-1 rounded-full">
                                ❤️ Heart-Safe
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs bg-blue-900/40 text-blue-400 px-2.5 py-1 rounded-full">
                                🩸 Diabetes-Friendly
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs bg-teal-900/40 text-teal-400 px-2.5 py-1 rounded-full">
                                💊 BP-Managed
                            </span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                            Health Categories
                        </h4>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link
                                    href="/category/cardiovascular"
                                    className="hover:text-emerald-400 transition-colors"
                                >
                                    Cardiovascular Health
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/category/diabetes"
                                    className="hover:text-emerald-400 transition-colors"
                                >
                                    Diabetes Friendly
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/category/hypertension"
                                    className="hover:text-emerald-400 transition-colors"
                                >
                                    Hypertension Care
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                            Platform
                        </h4>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link
                                    href="/dashboard"
                                    className="hover:text-emerald-400 transition-colors"
                                >
                                    Hotel Dashboard
                                </Link>
                            </li>
                            <li>
                                <span className="text-slate-500 cursor-default">
                                    API Documentation
                                </span>
                            </li>
                            <li>
                                <span className="text-slate-500 cursor-default">
                                    Partner Program
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-500">
                        © 2026 LavishBite. Health-compliant food for hospitality.
                    </p>
                    <p className="text-xs text-slate-600 italic max-w-md text-center sm:text-right">
                        ⚕️ Disclaimer: Nutritional info is for reference only. Always
                        consult a healthcare professional for dietary advice.
                    </p>
                </div>
            </div>
        </footer>
    );
}
