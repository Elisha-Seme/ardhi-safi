import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { put } from "@vercel/blob";

const ALLOWED_TYPES = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/avif",
    "image/gif",
]);

const UPLOAD_DIR = join(process.cwd(), "public", "uploads");

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

        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });
        }

        // --- Vercel Blob (Production) ---
        // If the token is present, we prefer Vercel Blob for universal access
        if (process.env.BLOB_READ_WRITE_TOKEN) {
            const blob = await put(file.name, file, {
                access: 'public',
            });
            return NextResponse.json({ url: blob.url });
        }

        // --- Local Filesystem Fallback (Development) ---
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Ensure upload directory exists
        if (!existsSync(UPLOAD_DIR)) {
            await mkdir(UPLOAD_DIR, { recursive: true });
        }

        // Generate unique filename
        const timestamp = Date.now();
        const originalName = file.name.replace(/\s+/g, "-").toLowerCase();
        const fileName = `${timestamp}-${originalName}`;
        const path = join(UPLOAD_DIR, fileName);

        // Write file to disk
        await writeFile(path, buffer);

        // Return the public URL
        return NextResponse.json({ url: `/uploads/${fileName}` });
    } catch (err) {
        console.error("Upload error:", err);
        const message = err instanceof Error ? err.message : "Upload failed";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
