"use client";

import { createTestimonial, updateTestimonial } from "./actions";
import {
    ArrowLeft,
    Save,
    User as UserIcon,
    AlignLeft,
    MapPin,
    Star,
    Quote,
    Tag
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ActionResponse } from "@/lib/action-response";

interface TestimonialFormProps {
    initialData?: {
        id: string;
        name: string;
        location: string;
        quote: string;
        category: string;
        rating: number;
        active: boolean;
    };
    mode: "create" | "edit";
}

const CATEGORIES = ["landlord", "tenant", "buyer", "seller", "investor"];

export default function TestimonialForm({ initialData, mode }: TestimonialFormProps) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(formData: FormData) {
        setError(null);
        setIsPending(true);
        try {
            let result: ActionResponse | undefined;
            if (mode === "create") {
                result = await createTestimonial(formData);
            } else if (mode === "edit" && initialData?.id) {
                result = await updateTestimonial(initialData.id, formData);
            }

            if (!result?.success) {
                setError(result?.error ?? "An unexpected error occurred.");
                return;
            }

            router.push("/admin/testimonials");
            router.refresh();
        } finally {
            setIsPending(false);
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <Link
                    href="/admin/testimonials"
                    className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-sm font-semibold"
                >
                    <ArrowLeft size={16} /> Back to Testimonials
                </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-8 bg-surface border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-heading text-primary">
                            {mode === "create" ? "New Testimonial" : "Edit Testimonial"}
                        </h1>
                        <p className="text-text-secondary text-xs mt-1">
                            {mode === "create" ? "Add client feedback to the website." : "Update client feedback details."}
                        </p>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-accent shadow-sm border border-gray-50">
                        <Quote size={24} />
                    </div>
                </div>

                <form action={handleSubmit} className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                                <UserIcon size={14} className="text-accent" /> Client Name
                            </label>
                            <input
                                name="name"
                                required
                                defaultValue={initialData?.name}
                                placeholder="e.g., John Doe"
                                className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none transition-all text-sm font-heading"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                                <MapPin size={14} className="text-accent" /> Location or Property
                            </label>
                            <input
                                name="location"
                                required
                                defaultValue={initialData?.location}
                                placeholder="e.g., Kileleshwa, Nairobi"
                                className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none transition-all text-sm"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                                <Tag size={14} className="text-accent" /> Client Category
                            </label>
                            <select
                                name="category"
                                required
                                defaultValue={initialData?.category ?? CATEGORIES[0]}
                                className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none transition-all text-sm cursor-pointer"
                            >
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                                <Star size={14} className="text-accent" /> Star Rating
                            </label>
                            <input
                                name="rating"
                                type="number"
                                min="1"
                                max="5"
                                required
                                defaultValue={initialData?.rating ?? 5}
                                className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none transition-all text-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                            <AlignLeft size={14} className="text-accent" /> Testimonial Quote
                        </label>
                        <textarea
                            name="quote"
                            required
                            defaultValue={initialData?.quote}
                            rows={4}
                            placeholder="The amazing service provided by Ardhi Safi..."
                            className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none transition-all text-sm resize-none"
                        />
                    </div>

                    <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="active"
                                name="active"
                                value="true"
                                defaultChecked={initialData?.active ?? true}
                                className="w-5 h-5 accent-accent rounded-lg"
                            />
                            <label htmlFor="active" className="text-sm font-bold text-primary cursor-pointer select-none">Active / Visible on site</label>
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex items-center gap-3 px-10 py-4 bg-primary hover:bg-primary-light text-white font-bold rounded-2xl shadow-xl shadow-primary/20 transition-all disabled:opacity-50"
                        >
                            {isPending ? "Saving..." : <><Save size={18} /> {mode === "create" ? "Add Testimonial" : "Update Testimonial"}</>}
                        </button>
                    </div>
                    {error && <p className="text-sm font-medium text-red-600">{error}</p>}
                </form>
            </div>
        </div>
    );
}
