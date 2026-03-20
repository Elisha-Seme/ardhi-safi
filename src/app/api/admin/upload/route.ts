import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

// This route handles TWO modes:
// 1. Vercel Blob client-side upload (token exchange) — used in production
// 2. Local filesystem upload (direct POST) — used in development

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

        // --- Vercel Blob Client Upload (token exchange) ---
        if (process.env.BLOB_READ_WRITE_TOKEN && contentType.includes("application/json")) {
            const body = (await req.json()) as HandleUploadBody;
            const jsonResponse = await handleUpload({
                body,
                request: req,
                onBeforeGenerateToken: async (pathname) => {
                    // Validate file type from pathname extension
                    return {
                        allowedContentTypes: [...ALLOWED_TYPES],
                        maximumSizeInBytes: 10 * 1024 * 1024, // 10MB
                        tokenPayload: JSON.stringify({ pathname }),
                    };
                },
                onUploadCompleted: async () => {
                    // Optional: save reference to DB, log, etc.
                },
            });
            return NextResponse.json(jsonResponse);
        }

        // --- Local Filesystem Upload (Development fallback) ---
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
        const filePath = join(UPLOAD_DIR, fileName);

        await writeFile(filePath, buffer);

        return NextResponse.json({ url: `/uploads/${fileName}` });
    } catch (err) {
        console.error("Upload error:", err);
        const message = err instanceof Error ? err.message : "Upload failed";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
