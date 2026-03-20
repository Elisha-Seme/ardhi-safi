import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { put } from "@vercel/blob";

const ALLOWED_TYPES = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/avif",
    "image/gif",
]);

// Increase the body size limit for file uploads on Vercel
export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        if (!ALLOWED_TYPES.has(file.type)) {
            return NextResponse.json({ error: "Invalid file type. Allowed: JPEG, PNG, WebP, AVIF, GIF" }, { status: 400 });
        }

        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });
        }

        // --- Vercel Blob (Production) ---
        if (process.env.BLOB_READ_WRITE_TOKEN) {
            const timestamp = Date.now();
            const safeName = file.name.replace(/\s+/g, "-").toLowerCase();
            const blob = await put(`uploads/${timestamp}-${safeName}`, file, {
                access: 'public',
                addRandomSuffix: false,
            });
            return NextResponse.json({ url: blob.url });
        }

        // --- Local Filesystem Fallback (Development) ---
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
