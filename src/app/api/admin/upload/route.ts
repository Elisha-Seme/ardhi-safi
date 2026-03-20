import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { put } from "@vercel/blob";

// This route handles THREE modes:
// 1. Vercel Blob client-side upload (JSON token exchange) — best for large files
// 2. Vercel Blob server-side upload (FormData) — fallback on Vercel
// 3. Local filesystem upload (FormData) — development only

const ALLOWED_TYPES = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/avif",
    "image/gif",
]);

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const contentType = req.headers.get("content-type") || "";

        // --- Mode 1: Vercel Blob Client Upload (token exchange) ---
        if (process.env.BLOB_READ_WRITE_TOKEN && contentType.includes("application/json")) {
            const body = (await req.json()) as HandleUploadBody;
            const jsonResponse = await handleUpload({
                body,
                request: req,
                onBeforeGenerateToken: async () => {
                    return {
                        allowedContentTypes: [...ALLOWED_TYPES],
                        maximumSizeInBytes: 10 * 1024 * 1024,
                    };
                },
                onUploadCompleted: async () => {},
            });
            return NextResponse.json(jsonResponse);
        }

        // --- FormData upload (both Mode 2 and Mode 3) ---
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }
        if (!ALLOWED_TYPES.has(file.type)) {
            return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
        }
        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });
        }

        // --- Mode 2: Server-side Blob upload (Vercel production) ---
        if (process.env.BLOB_READ_WRITE_TOKEN) {
            const timestamp = Date.now();
            const safeName = file.name.replace(/\s+/g, "-").toLowerCase();
            const blob = await put(`uploads/${timestamp}-${safeName}`, file, {
                access: "public",
                addRandomSuffix: false,
            });
            return NextResponse.json({ url: blob.url });
        }

        // --- Mode 3: Local filesystem (development only) ---
        const { writeFile, mkdir } = await import("fs/promises");
        const { existsSync } = await import("fs");
        const { join } = await import("path");

        const UPLOAD_DIR = join(process.cwd(), "public", "uploads");
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        if (!existsSync(UPLOAD_DIR)) {
            await mkdir(UPLOAD_DIR, { recursive: true });
        }

        const timestamp = Date.now();
        const originalName = file.name.replace(/\s+/g, "-").toLowerCase();
        const fileName = `${timestamp}-${originalName}`;
        await writeFile(join(UPLOAD_DIR, fileName), buffer);

        return NextResponse.json({ url: `/uploads/${fileName}` });
    } catch (err) {
        console.error("Upload error:", err);
        const message = err instanceof Error ? err.message : "Upload failed";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
