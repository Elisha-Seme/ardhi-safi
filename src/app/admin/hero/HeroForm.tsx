"use client";

import { createHeroSlide, updateHeroSlide } from "./actions";
import {
    ArrowLeft,
    Save,
    ImageIcon,
    Type,
    AlignLeft,
    Layout,
    Layers
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ImageUpload from "@/components/admin/ImageUpload";
import type { ActionResponse } from "@/lib/action-response";

interface HeroFormProps {
    initialData?: {
        id: string;
        title: string;
        subtitle: string | null;
        imageUrl: string;
        order: number;
    };
    mode: "create" | "edit";
}

export default function HeroForm({ initialData, mode }: HeroFormProps) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(formData: FormData) {
        setError(null);
        setIsPending(true);
        try {
            let result: ActionResponse | undefined;
            if (mode === "create") {
                result = await createHeroSlide(formData);
            } else if (mode === "edit" && initialData?.id) {
                result = await updateHeroSlide(initialData.id, formData);
            }

            if (!result?.success) {
                setError(result?.error ?? "An unexpected error occurred.");
                return;
            }

            router.push("/admin/hero");
            router.refresh();
        } finally {
            setIsPending(false);
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <Link
                    href="/admin/hero"
                    className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-sm font-semibold"
                >
                    <ArrowLeft size={16} /> Back to Slider
                </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-8 bg-surface border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-heading text-primary">
                            {mode === "create" ? "New Hero Slide" : "Edit Hero Slide"}
                        </h1>
                        <p className="text-text-secondary text-xs mt-1">
                            {mode === "create" ? "Add a new impression to your landing page." : "Modify your home page visual."}
                        </p>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-accent shadow-sm border border-gray-50">
                        <ImageIcon size={24} />
                    </div>
                </div>

                <form action={handleSubmit} className="p-8 space-y-8">
                    {/* Title & Order */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="md:col-span-3 space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                                <Type size={14} className="text-accent" /> Slide Title
                            </label>
                            <input
                                name="title"
                                required
                                defaultValue={initialData?.title}
                                placeholder="e.g., Nairobi Skyline"
                                className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none transition-all text-sm font-heading"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                                <Layers size={14} className="text-accent" /> Display Order
                            </label>
                            <input
                                name="order"
                                type="number"
                                required
                                defaultValue={initialData?.order ?? 0}
                                className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none transition-all text-sm"
                            />
                        </div>
                    </div>

                    {/* Subtitle */}
                    <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                            <AlignLeft size={14} className="text-accent" /> Subtitle / Caption
                        </label>
                        <textarea
                            name="subtitle"
                            required
                            defaultValue={initialData?.subtitle ?? ""}
                            rows={2}
                            placeholder="e.g., Shelter for all. Professional real estate services."
                            className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none transition-all text-sm resize-none"
                        />
                    </div>

                    {/* Image */}
                    <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                            <ImageIcon size={14} className="text-accent" /> Background Image
                        </label>
                        <ImageUpload name="imageUrl" defaultValue={initialData?.imageUrl} required />
                    </div>

                    <div className="flex items-center justify-end pt-8 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex items-center gap-3 px-10 py-4 bg-primary hover:bg-primary-light text-white font-bold rounded-2xl shadow-xl shadow-primary/20 transition-all disabled:opacity-50"
                        >
                            {isPending ? "Saving..." : <><Save size={18} /> {mode === "create" ? "Create Slide" : "Update Slide"}</>}
                        </button>
                    </div>
                    {error && <p className="text-sm font-medium text-red-600">{error}</p>}
                </form>
            </div>
        </div>
    );
}
