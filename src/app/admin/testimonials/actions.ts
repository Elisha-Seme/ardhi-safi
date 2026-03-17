"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth-guard";
import { validateRequired, validateMaxLength } from "@/lib/validation";
import type { ActionResponse } from "@/lib/action-response";

export async function createTestimonial(formData: FormData): Promise<ActionResponse> {
    await requireAuth();

    const name = formData.get("name") as string;
    const location = formData.get("location") as string;
    const quote = formData.get("quote") as string;
    const category = formData.get("category") as string;
    const rating = parseInt(formData.get("rating") as string) || 5;
    const active = formData.get("active") === "true";

    const fieldError = validateRequired({ name, location, quote, category }, ["name", "location", "quote", "category"]);
    if (fieldError) return { success: false, error: fieldError };

    const lengthError = validateMaxLength(quote, 1000, "Quote");
    if (lengthError) return { success: false, error: lengthError };

    try {
        await prisma.testimonial.create({
            data: { name, location, quote, category, rating, active },
        });

        revalidatePath("/");
        revalidatePath("/capabilities/sales-letting");
        revalidatePath("/admin/testimonials");
        return { success: true };
    } catch (error) {
        console.error("Failed to create testimonial:", error);
        return { success: false, error: "Failed to create testimonial. Please try again." };
    }
}

export async function updateTestimonial(id: string, formData: FormData): Promise<ActionResponse> {
    await requireAuth();

    const name = formData.get("name") as string;
    const location = formData.get("location") as string;
    const quote = formData.get("quote") as string;
    const category = formData.get("category") as string;
    const rating = parseInt(formData.get("rating") as string) || 5;
    const active = formData.get("active") === "true";

    const fieldError = validateRequired({ name, location, quote, category }, ["name", "location", "quote", "category"]);
    if (fieldError) return { success: false, error: fieldError };

    const lengthError = validateMaxLength(quote, 1000, "Quote");
    if (lengthError) return { success: false, error: lengthError };

    try {
        await prisma.testimonial.update({
            where: { id },
            data: { name, location, quote, category, rating, active },
        });

        revalidatePath("/");
        revalidatePath("/capabilities/sales-letting");
        revalidatePath("/admin/testimonials");
        return { success: true };
    } catch (error) {
        console.error("Failed to update testimonial:", error);
        return { success: false, error: "Failed to update testimonial. Please try again." };
    }
}

export async function deleteTestimonial(id: string): Promise<ActionResponse> {
    await requireAuth();

    try {
        await prisma.testimonial.delete({ where: { id } });
        revalidatePath("/");
        revalidatePath("/capabilities/sales-letting");
        revalidatePath("/admin/testimonials");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete testimonial:", error);
        return { success: false, error: "Failed to delete testimonial. Please try again." };
    }
}
