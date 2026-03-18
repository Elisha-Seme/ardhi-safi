"use client";

import { createTeamMember, updateTeamMember } from "./actions";
import {
    ArrowLeft,
    Save,
    ImageIcon,
    Type,
    User as UserIcon,
    AlignLeft,
    Briefcase,
    Link as LinkIcon,
    Layers
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ImageUpload from "@/components/admin/ImageUpload";
import type { ActionResponse } from "@/lib/action-response";

interface TeamFormProps {
    initialData?: {
        id: string;
        name: string;
        title: string;
        bio: string;
        imageUrl: string;
        linkedin: string | null;
        email: string | null;
        order: number;
        active: boolean;
    };
    mode: "create" | "edit";
}

export default function TeamForm({ initialData, mode }: TeamFormProps) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(formData: FormData) {
        setError(null);
        setIsPending(true);
        try {
            let result: ActionResponse | undefined;
            if (mode === "create") {
                result = await createTeamMember(formData);
            } else if (mode === "edit" && initialData?.id) {
                result = await updateTeamMember(initialData.id, formData);
            }

            if (!result?.success) {
                setError(result?.error ?? "An unexpected error occurred.");
                return;
            }

            router.push("/admin/team");
            router.refresh();
        } finally {
            setIsPending(false);
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <Link
                    href="/admin/team"
                    className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-sm font-semibold"
                >
                    <ArrowLeft size={16} /> Back to Team
                </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-8 bg-surface border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-heading text-primary">
                            {mode === "create" ? "New Team Member" : "Edit Team Profile"}
                        </h1>
                        <p className="text-text-secondary text-xs mt-1">
                            {mode === "create" ? "Add a new leader to the team." : "Update profile information."}
                        </p>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-accent shadow-sm border border-gray-50">
                        <UserIcon size={24} />
                    </div>
                </div>

                <form action={handleSubmit} className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                                <Type size={14} className="text-accent" /> Full Name
                            </label>
                            <input
                                name="name"
                                required
                                defaultValue={initialData?.name}
                                placeholder="e.g., Namutila Nyandusi Wanjala"
                                className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none transition-all text-sm font-heading"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                                <Briefcase size={14} className="text-accent" /> Job Title
                            </label>
                            <input
                                name="title"
                                required
                                defaultValue={initialData?.title}
                                placeholder="e.g., Founder & Managing Director"
                                className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none transition-all text-sm"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                                <ImageIcon size={14} className="text-accent" /> Profile Image
                            </label>
                            <ImageUpload name="imageUrl" defaultValue={initialData?.imageUrl} required />
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

                    <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                            <AlignLeft size={14} className="text-accent" /> Biography
                        </label>
                        <textarea
                            name="bio"
                            required
                            defaultValue={initialData?.bio}
                            rows={4}
                            placeholder="A brief professional biography..."
                            className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none transition-all text-sm resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                                <LinkIcon size={14} className="text-accent" /> LinkedIn URL (Optional)
                            </label>
                            <input
                                name="linkedin"
                                defaultValue={initialData?.linkedin || ""}
                                placeholder="https://linkedin.com/in/..."
                                className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none transition-all text-sm"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                                <LinkIcon size={14} className="text-accent" /> Company Email (Optional)
                            </label>
                            <input
                                name="email"
                                type="email"
                                defaultValue={initialData?.email || ""}
                                placeholder="name@ardhisafi.co.ke"
                                className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-accent focus:bg-white rounded-2xl outline-none transition-all text-sm"
                            />
                        </div>
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
                            {isPending ? "Saving..." : <><Save size={18} /> {mode === "create" ? "Add Member" : "Update Profile"}</>}
                        </button>
                    </div>
                    {error && <p className="text-sm font-medium text-red-600">{error}</p>}
                </form>
            </div>
        </div>
    );
}
