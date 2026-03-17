"use client";

import { createBlog, updateBlog } from "./actions";
import {
    ArrowLeft,
    Save,
    Eye,
    ImageIcon,
    Type,
    AlignLeft,
    User as UserIcon,
    Clock,
    Tag,
    FileText
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { blogCategories } from "@/data/blogs";
import ImageUpload from "@/components/admin/ImageUpload";
import type { ActionResponse } from "@/lib/action-response";

interface BlogFormProps {
    initialData?: {
        id: string;
        title: string;
        excerpt: string;
        content: string;
        author: string;
        category: string;
        imageUrl: string;
        readTime: string | null;
        published: boolean;
    };
    mode: "create" | "edit";
}

export default function BlogForm({ initialData, mode }: BlogFormProps) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(formData: FormData) {
        setError(null);
        setIsPending(true);
        try {
            let result: ActionResponse | undefined;
            if (mode === "create") {
                result = await createBlog(formData);
            } else if (mode === "edit" && initialData?.id) {
                result = await updateBlog(initialData.id, formData);
            }

            if (!result?.success) {
                setError(result?.error ?? "An unexpected error occurred.");
                return;
            }

            router.push("/admin/blogs");
            router.refresh();
        } finally {
            setIsPending(false);
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <Link
                    href="/admin/blogs"
                    className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-sm font-semibold"
                >
                    <ArrowLeft size={16} /> Back to Insights
                </Link>
                <div className="flex gap-3">
                    <Link
                        href="/insights"
                        target="_blank"
                        className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-text-secondary font-semibold rounded-xl hover:bg-gray-50 transition-all text-xs"
                    >
                        <Eye size={14} /> Preview Site
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-8 bg-surface border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-heading text-primary">
                            {mode === "create" ? "New Article" : "Edit Article"}
                        </h1>
                        <p className="text-text-secondary text-xs mt-1">
                            {mode === "create" ? "Draft your next market insight." : "Refine your article content."}
                        </p>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-accent shadow-sm border border-gray-50">
                        <FileTextIcon size={24} />
                    </div>
                </div>

                <form action={handleSubmit} className="p-8 space-y-8">
                    {/* Title Section */}
                    <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                            <Type size={14} className="text-accent" /> Article Title
                        </label>
                        <input
                            name="title"
                            required
                            defaultValue={initialData?.title}
                            placeholder="e.g., The Future of Real Estate in Upper Hill"
                            className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none transition-all text-lg font-heading placeholder:text-gray-300"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Author & Category */}
                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                                <UserIcon size={14} className="text-accent" /> Author Name
                            </label>
                            <input
                                name="author"
                                required
                                defaultValue={initialData?.author}
                                placeholder="e.g., Namutila Nyandusi"
                                className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none transition-all text-sm"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                                <Tag size={14} className="text-accent" /> Category
                            </label>
                            <select
                                name="category"
                                required
                                defaultValue={initialData?.category}
                                className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none transition-all text-sm cursor-pointer"
                            >
                                {blogCategories.filter((c) => c !== "All").map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Read Time & Status */}
                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                                <Clock size={14} className="text-accent" /> Estimated Read Time
                            </label>
                            <input
                                name="readTime"
                                required
                                defaultValue={initialData?.readTime ?? ""}
                                placeholder="e.g., 5 min read"
                                className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none transition-all text-sm"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                                <ImageIcon size={14} className="text-accent" /> Featured Image
                            </label>
                            <ImageUpload name="imageUrl" defaultValue={initialData?.imageUrl} />
                        </div>
                    </div>

                    {/* Excerpt */}
                    <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                            <AlignLeft size={14} className="text-accent" /> Short Excerpt
                        </label>
                        <textarea
                            name="excerpt"
                            required
                            rows={2}
                            defaultValue={initialData?.excerpt}
                            placeholder="A brief summary for the blog card..."
                            className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none transition-all text-sm resize-none"
                        />
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                            <FileText size={14} className="text-accent" /> Full Article Content
                        </label>
                        <textarea
                            name="content"
                            required
                            rows={12}
                            defaultValue={initialData?.content}
                            placeholder="Write your article here (Markdown supported)..."
                            className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none transition-all text-sm leading-relaxed"
                        />
                    </div>

                    <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="published"
                                name="published"
                                value="true"
                                defaultChecked={initialData?.published ?? true}
                                className="w-5 h-5 accent-accent rounded-lg"
                            />
                            <label
                                htmlFor="published"
                                className="text-sm font-bold text-primary cursor-pointer select-none"
                            >
                                Publish immediately
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex items-center gap-3 px-10 py-4 bg-primary hover:bg-primary-light text-white font-bold rounded-2xl shadow-xl shadow-primary/20 transition-all disabled:opacity-50"
                        >
                            {isPending ? "Saving..." : <><Save size={18} /> {mode === "create" ? "Save & Publish" : "Update Article"}</>}
                        </button>
                    </div>
                    {error && <p className="text-sm font-medium text-red-600">{error}</p>}
                </form>
            </div>
        </div>
    );
}

function FileTextIcon({ size, className }: { size: number; className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
    );
}
