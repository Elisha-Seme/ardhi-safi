"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth-guard";
import { validateRequired, validateMaxLength, validateUrl } from "@/lib/validation";
import type { ActionResponse } from "@/lib/action-response";

export async function createBlog(formData: FormData): Promise<ActionResponse> {
    await requireAuth();

    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const author = formData.get("author") as string;
    const category = formData.get("category") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const readTime = formData.get("readTime") as string;
    const published = formData.get("published") === "true";

    const fieldError = validateRequired({ title, excerpt, content, author, category }, ["title", "excerpt", "content", "author", "category"]);
    if (fieldError) return { success: false, error: fieldError };

    const lengthError = validateMaxLength(title, 200, "Title") || validateMaxLength(excerpt, 500, "Excerpt");
    if (lengthError) return { success: false, error: lengthError };

    if (imageUrl && !validateUrl(imageUrl)) return { success: false, error: "Invalid image URL" };

    try {
        const slug = title
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");

        await prisma.blogPost.create({
            data: {
                slug,
                title,
                excerpt,
                content,
                author,
                category,
                imageUrl,
                readTime,
                published,
                date: new Date().toISOString().split("T")[0],
            },
        });

        revalidatePath("/admin/blogs");
        revalidatePath("/insights");
        return { success: true };
    } catch (error) {
        console.error("Failed to create blog:", error);
        return { success: false, error: "Failed to create article. Please try again." };
    }
}

export async function updateBlog(id: string, formData: FormData): Promise<ActionResponse> {
    await requireAuth();

    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const author = formData.get("author") as string;
    const category = formData.get("category") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const readTime = formData.get("readTime") as string;
    const published = formData.get("published") === "true";

    const fieldError = validateRequired({ title, excerpt, content, author, category }, ["title", "excerpt", "content", "author", "category"]);
    if (fieldError) return { success: false, error: fieldError };

    const lengthError = validateMaxLength(title, 200, "Title") || validateMaxLength(excerpt, 500, "Excerpt");
    if (lengthError) return { success: false, error: lengthError };

    if (imageUrl && !validateUrl(imageUrl)) return { success: false, error: "Invalid image URL" };

    try {
        const slug = title
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");

        await prisma.blogPost.update({
            where: { id },
            data: {
                slug,
                title,
                excerpt,
                content,
                author,
                category,
                imageUrl,
                readTime,
                published,
            },
        });

        revalidatePath("/admin/blogs");
        revalidatePath(`/insights/${slug}`);
        revalidatePath("/insights");
        return { success: true };
    } catch (error) {
        console.error("Failed to update blog:", error);
        return { success: false, error: "Failed to update article. Please try again." };
    }
}

export async function deleteBlog(id: string): Promise<ActionResponse> {
    await requireAuth();

    try {
        await prisma.blogPost.delete({ where: { id } });
        revalidatePath("/admin/blogs");
        revalidatePath("/insights");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete blog:", error);
        return { success: false, error: "Failed to delete article. Please try again." };
    }
}
