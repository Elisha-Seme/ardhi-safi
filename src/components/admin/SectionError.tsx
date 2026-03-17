"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, ArrowLeft } from "lucide-react";

interface SectionErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
    section: string;
    backHref: string;
}

export default function SectionError({ error, reset, section, backHref }: SectionErrorProps) {
    useEffect(() => {
        console.error(`Admin ${section} error:`, error);
    }, [error, section]);

    return (
        <div className="min-h-[40vh] flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center">
                <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-red-50 flex items-center justify-center">
                    <span className="text-2xl text-red-500">!</span>
                </div>
                <h2 className="text-xl font-heading text-primary mb-2">
                    {section} Error
                </h2>
                <p className="text-text-secondary text-sm mb-8">
                    Something went wrong loading {section.toLowerCase()}. Please try again.
                </p>
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={reset}
                        className="flex items-center gap-2 px-5 py-2.5 bg-accent text-primary font-bold rounded-xl text-sm hover:shadow-lg transition-all"
                    >
                        <RefreshCw size={16} /> Retry
                    </button>
                    <Link
                        href={backHref}
                        className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-text-secondary rounded-xl text-sm hover:bg-gray-50 transition-all"
                    >
                        <ArrowLeft size={16} /> Back to {section}
                    </Link>
                </div>
            </div>
        </div>
    );
}
