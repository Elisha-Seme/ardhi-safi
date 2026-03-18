"use client";

import { useState } from "react";
import { Key, X, Loader2 } from "lucide-react";
import { changePassword } from "./actions";

export default function ChangePasswordButton({ userId, userName }: { userId: string; userName: string }) {
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const fd = new FormData();
        fd.append("newPassword", password);

        const result = await changePassword(userId, fd);
        if (result.success) {
            setOpen(false);
            setPassword("");
        } else {
            setError(result.error);
        }
        setLoading(false);
    };

    if (!open) {
        return (
            <button
                onClick={() => setOpen(true)}
                className="p-2 hover:bg-accent/10 text-primary rounded-lg transition-colors"
                title="Change Password"
            >
                <Key size={16} />
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={() => setOpen(false)}>
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading text-primary text-lg">Change Password</h3>
                    <button onClick={() => setOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                        <X size={18} />
                    </button>
                </div>
                <p className="text-sm text-text-secondary mb-4">
                    Set a new password for <span className="font-semibold text-primary">{userName}</span>.
                </p>
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs mb-4">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="New password (min 8 chars)"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent focus:outline-none"
                        minLength={8}
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-accent hover:bg-accent-dark text-primary font-semibold rounded-xl transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <Loader2 size={16} className="animate-spin" /> : <Key size={16} />}
                        {loading ? "Updating..." : "Update Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}
