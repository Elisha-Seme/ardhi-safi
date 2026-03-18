"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Loader2, Shield } from "lucide-react";
import Link from "next/link";
import { createUser } from "../actions";

export default function NewUserPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const fd = new FormData();
        Object.entries(formData).forEach(([key, value]) => fd.append(key, value));

        const result = await createUser(fd);
        if (result.success) {
            router.push("/admin/users");
        } else {
            setError(result.error);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-lg">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Shield size={20} className="text-accent" />
                </div>
                <div>
                    <h1 className="text-2xl font-heading text-primary font-bold">New Admin User</h1>
                    <p className="text-text-secondary text-sm">Grant admin access to a new team member.</p>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Full Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent focus:outline-none"
                        placeholder="e.g. John Kamau"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent focus:outline-none"
                        placeholder="user@ardhisafi.co.ke"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Password</label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent focus:outline-none"
                        placeholder="Minimum 8 characters"
                        minLength={8}
                        required
                    />
                </div>

                <div className="flex gap-3 pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-primary font-bold rounded-xl transition-all text-sm disabled:opacity-50"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        {loading ? "Creating..." : "Create User"}
                    </button>
                    <Link
                        href="/admin/users"
                        className="flex items-center gap-2 px-6 py-3 border border-gray-200 text-text-secondary rounded-xl hover:bg-gray-50 transition-all text-sm"
                    >
                        <X size={18} /> Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
