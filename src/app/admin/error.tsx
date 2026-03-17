"use client";

import { useEffect } from "react";
import Link from "next/link";
import { LayoutDashboard, RefreshCw } from "lucide-react";

export default function AdminError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Admin error:", error);
    }, [error]);

    return (
        <div className="min-h-[60vh] flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center">
                <h2 className="text-2xl font-heading text-primary mb-4">Admin Error</h2>
                <p className="text-text-secondary mb-8">
                    Something went wrong in the admin panel. This has been logged.
                </p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="flex items-center gap-2 px-6 py-3 bg-accent text-primary font-bold rounded-xl hover:shadow-lg transition-all"
                    >
                        <RefreshCw size={18} /> Retry
                    </button>
                    <Link
                        href="/admin/dashboard"
                        className="flex items-center gap-2 px-6 py-3 border border-gray-200 text-text-secondary rounded-xl hover:bg-gray-50 transition-all"
                    >
                        <LayoutDashboard size={18} /> Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
