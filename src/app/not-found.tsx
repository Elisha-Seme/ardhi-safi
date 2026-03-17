"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-primary flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center">
                <div className="mb-8">
                    <h1 className="text-9xl font-heading text-accent/20">404</h1>
                    <h2 className="text-3xl font-heading text-white -mt-12">Page Not Found</h2>
                </div>

                <p className="text-white/60 mb-10 leading-relaxed">
                    The property or page you are looking for might have been moved, deleted, or never existed in the first place.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-accent text-primary font-bold rounded-full hover:shadow-lg transition-all"
                    >
                        <Home size={18} />
                        Back Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-white rounded-full hover:bg-white/5 transition-all"
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}
