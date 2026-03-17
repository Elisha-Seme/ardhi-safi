"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth-guard";
import { validateRequired, validateUrl } from "@/lib/validation";
import type { ActionResponse } from "@/lib/action-response";

export async function createGalleryItem(formData: FormData): Promise<ActionResponse> {
    await requireAuth();

    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const imageUrl = formData.get("imageUrl") as string;

    const fieldError = validateRequired({ title, category, imageUrl }, ["title", "category", "imageUrl"]);
    if (fieldError) return { success: false, error: fieldError };

    if (!validateUrl(imageUrl)) return { success: false, error: "Invalid image URL" };

    try {
        await prisma.galleryItem.create({
            data: { title, category, imageUrl },
        });

        revalidatePath("/projects");
        revalidatePath("/admin/gallery");
        return { success: true };
    } catch (error) {
        console.error("Failed to create gallery item:", error);
        return { success: false, error: "Failed to create gallery item. Please try again." };
    }
}

export async function updateGalleryItem(id: string, formData: FormData): Promise<ActionResponse> {
    await requireAuth();

    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const imageUrl = formData.get("imageUrl") as string;

    const fieldError = validateRequired({ title, category, imageUrl }, ["title", "category", "imageUrl"]);
    if (fieldError) return { success: false, error: fieldError };

    if (!validateUrl(imageUrl)) return { success: false, error: "Invalid image URL" };

    try {
        await prisma.galleryItem.update({
            where: { id },
            data: { title, category, imageUrl },
        });

        revalidatePath("/projects");
        revalidatePath("/admin/gallery");
        return { success: true };
    } catch (error) {
        console.error("Failed to update gallery item:", error);
        return { success: false, error: "Failed to update gallery item. Please try again." };
    }
}

export async function deleteGalleryItem(id: string): Promise<ActionResponse> {
    await requireAuth();

    try {
        await prisma.galleryItem.delete({ where: { id } });
        revalidatePath("/projects");
        revalidatePath("/admin/gallery");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete gallery item:", error);
        return { success: false, error: "Failed to delete gallery item. Please try again." };
    }
}
