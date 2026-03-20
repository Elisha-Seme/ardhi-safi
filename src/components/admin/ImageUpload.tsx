"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";

interface ImageUploadProps {
    name: string;
    defaultValue?: string;
    required?: boolean;
    onChange?: (url: string) => void;
}

export default function ImageUpload({ name, defaultValue, required, onChange }: ImageUploadProps) {
    const [url, setUrl] = useState(defaultValue || "");
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const fileRef = useRef<HTMLInputElement>(null);

    function updateUrl(newUrl: string) {
        setUrl(newUrl);
        onChange?.(newUrl);
    }

    async function uploadViaBlob(file: File): Promise<string> {
        const { upload } = await import("@vercel/blob/client");
        const blob = await upload(file.name, file, {
            access: 'public',
            handleUploadUrl: '/api/admin/upload',
        });
        return blob.url;
    }

    async function uploadViaFormData(file: File): Promise<string> {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/admin/upload", {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        return data.url;
    }

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setError("");

        try {
            // Use NEXT_PUBLIC env var to decide upload strategy
            // This avoids the Blob client hanging in local dev
            const useBlob = process.env.NEXT_PUBLIC_USE_BLOB === "true";
            const resultUrl = useBlob
                ? await uploadViaBlob(file)
                : await uploadViaFormData(file);
            updateUrl(resultUrl);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Upload failed";
            setError(message);
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="space-y-3">
            <input type="hidden" name={name} value={url} />

            <div className="relative w-full aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center">
                {url ? (
                    <Image src={url} alt="Preview" fill className="object-cover" />
                ) : (
                    <ImageIcon size={32} className="text-slate-300" />
                )}
            </div>

            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-xl text-sm font-medium hover:bg-accent/20 transition-colors disabled:opacity-50"
                >
                    {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                    {uploading ? "Uploading..." : "Upload"}
                </button>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => updateUrl(e.target.value)}
                    placeholder="Or paste image URL"
                    className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-accent/20 focus:outline-none"
                />
                {url && (
                    <button type="button" onClick={() => updateUrl("")} className="p-2 text-red-400 hover:text-red-600">
                        <X size={14} />
                    </button>
                )}
            </div>

            <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>
    );
}
