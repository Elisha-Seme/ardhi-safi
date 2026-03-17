"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth-guard";
import { validateRequired, validateUrl } from "@/lib/validation";
import type { ActionResponse } from "@/lib/action-response";

export async function createProperty(formData: FormData): Promise<ActionResponse> {
    await requireAuth();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const price = Number(formData.get("price"));
    const transaction = formData.get("transaction") as string;
    const type = formData.get("type") as string;
    const bedrooms = Number(formData.get("bedrooms")) || null;
    const bathrooms = Number(formData.get("bathrooms")) || null;
    const area = Number(formData.get("area"));
    const areaUnit = formData.get("areaUnit") as string;
    const featured = formData.get("featured") === "true";
    const imageUrl = (formData.get("imageUrl") as string) || null;
    const active = formData.get("active") !== "false";

    const fieldError = validateRequired(
        { title, description, location, transaction, type, areaUnit },
        ["title", "description", "location", "transaction", "type", "areaUnit"]
    );
    if (fieldError) return { success: false, error: fieldError };

    if (imageUrl && !validateUrl(imageUrl)) return { success: false, error: "Invalid image URL" };
    if (!price || price <= 0) return { success: false, error: "Price must be greater than zero" };
    if (!area || area <= 0) return { success: false, error: "Area must be greater than zero" };

    try {
        await prisma.property.create({
            data: {
                title, description, location, price, transaction, type,
                bedrooms, bathrooms, area, areaUnit, featured, imageUrl, active,
            },
        });

        revalidatePath("/admin/properties");
        revalidatePath("/properties");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to create property:", error);
        return { success: false, error: "Failed to create property. Please try again." };
    }
}

export async function updateProperty(id: string, formData: FormData): Promise<ActionResponse> {
    await requireAuth();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const price = Number(formData.get("price"));
    const transaction = formData.get("transaction") as string;
    const type = formData.get("type") as string;
    const bedrooms = Number(formData.get("bedrooms")) || null;
    const bathrooms = Number(formData.get("bathrooms")) || null;
    const area = Number(formData.get("area"));
    const areaUnit = formData.get("areaUnit") as string;
    const featured = formData.get("featured") === "true";
    const imageUrl = (formData.get("imageUrl") as string) || null;
    const active = formData.get("active") !== "false";

    const fieldError = validateRequired(
        { title, description, location, transaction, type, areaUnit },
        ["title", "description", "location", "transaction", "type", "areaUnit"]
    );
    if (fieldError) return { success: false, error: fieldError };

    if (imageUrl && !validateUrl(imageUrl)) return { success: false, error: "Invalid image URL" };
    if (!price || price <= 0) return { success: false, error: "Price must be greater than zero" };
    if (!area || area <= 0) return { success: false, error: "Area must be greater than zero" };

    try {
        await prisma.property.update({
            where: { id },
            data: {
                title, description, location, price, transaction, type,
                bedrooms, bathrooms, area, areaUnit, featured, imageUrl, active,
            },
        });

        revalidatePath("/admin/properties");
        revalidatePath("/properties");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to update property:", error);
        return { success: false, error: "Failed to update property. Please try again." };
    }
}

export async function deleteProperty(id: string): Promise<ActionResponse> {
    await requireAuth();

    try {
        await prisma.property.delete({ where: { id } });
        revalidatePath("/admin/properties");
        revalidatePath("/properties");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete property:", error);
        return { success: false, error: "Failed to delete property. Please try again." };
    }
}
