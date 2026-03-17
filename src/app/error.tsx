"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RefreshCw } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Application error:", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-primary flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center">
                <h1 className="text-6xl font-heading text-accent/20 mb-4">Error</h1>
                <h2 className="text-2xl font-heading text-white mb-4">Something went wrong</h2>
                <p className="text-white/60 mb-10 leading-relaxed">
                    We encountered an unexpected error. Please try again or return to the home page.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-accent text-primary font-bold rounded-full hover:shadow-lg transition-all"
                    >
                        <RefreshCw size={18} /> Try Again
                    </button>
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-white rounded-full hover:bg-white/5 transition-all"
                    >
                        <Home size={18} /> Back Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
