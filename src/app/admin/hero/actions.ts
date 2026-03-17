"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth-guard";
import { validateRequired, validateUrl } from "@/lib/validation";
import type { ActionResponse } from "@/lib/action-response";

export async function createHeroSlide(formData: FormData): Promise<ActionResponse> {
    await requireAuth();

    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const order = parseInt(formData.get("order") as string) || 0;

    const fieldError = validateRequired({ title, imageUrl }, ["title", "imageUrl"]);
    if (fieldError) return { success: false, error: fieldError };

    if (!validateUrl(imageUrl)) return { success: false, error: "Invalid image URL" };

    try {
        await prisma.heroSlide.create({
            data: { title, subtitle, imageUrl, order },
        });

        revalidatePath("/");
        revalidatePath("/admin/hero");
        return { success: true };
    } catch (error) {
        console.error("Failed to create hero slide:", error);
        return { success: false, error: "Failed to create hero slide. Please try again." };
    }
}

export async function updateHeroSlide(id: string, formData: FormData): Promise<ActionResponse> {
    await requireAuth();

    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const order = parseInt(formData.get("order") as string) || 0;

    const fieldError = validateRequired({ title, imageUrl }, ["title", "imageUrl"]);
    if (fieldError) return { success: false, error: fieldError };

    if (!validateUrl(imageUrl)) return { success: false, error: "Invalid image URL" };

    try {
        await prisma.heroSlide.update({
            where: { id },
            data: { title, subtitle, imageUrl, order },
        });

        revalidatePath("/");
        revalidatePath("/admin/hero");
        return { success: true };
    } catch (error) {
        console.error("Failed to update hero slide:", error);
        return { success: false, error: "Failed to update hero slide. Please try again." };
    }
}

export async function deleteHeroSlide(id: string): Promise<ActionResponse> {
    await requireAuth();

    try {
        await prisma.heroSlide.delete({ where: { id } });
        revalidatePath("/");
        revalidatePath("/admin/hero");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete hero slide:", error);
        return { success: false, error: "Failed to delete hero slide. Please try again." };
    }
}
