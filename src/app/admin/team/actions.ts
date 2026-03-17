"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth-guard";
import { validateRequired, validateUrl } from "@/lib/validation";
import type { ActionResponse } from "@/lib/action-response";

export async function createTeamMember(formData: FormData): Promise<ActionResponse> {
    await requireAuth();

    const name = formData.get("name") as string;
    const title = formData.get("title") as string;
    const bio = formData.get("bio") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const linkedin = formData.get("linkedin") as string;
    const twitter = formData.get("twitter") as string;
    const order = parseInt(formData.get("order") as string) || 0;
    const active = formData.get("active") === "true";

    const fieldError = validateRequired({ name, title, bio, imageUrl }, ["name", "title", "bio", "imageUrl"]);
    if (fieldError) return { success: false, error: fieldError };

    if (!validateUrl(imageUrl)) return { success: false, error: "Invalid image URL" };
    if (linkedin && !validateUrl(linkedin)) return { success: false, error: "Invalid LinkedIn URL" };
    if (twitter && !validateUrl(twitter)) return { success: false, error: "Invalid Twitter URL" };

    try {
        await prisma.teamMember.create({
            data: {
                name, title, bio, imageUrl,
                linkedin: linkedin || null,
                twitter: twitter || null,
                order, active,
            },
        });

        revalidatePath("/about");
        revalidatePath("/admin/team");
        return { success: true };
    } catch (error) {
        console.error("Failed to create team member:", error);
        return { success: false, error: "Failed to create team member. Please try again." };
    }
}

export async function updateTeamMember(id: string, formData: FormData): Promise<ActionResponse> {
    await requireAuth();

    const name = formData.get("name") as string;
    const title = formData.get("title") as string;
    const bio = formData.get("bio") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const linkedin = formData.get("linkedin") as string;
    const twitter = formData.get("twitter") as string;
    const order = parseInt(formData.get("order") as string) || 0;
    const active = formData.get("active") === "true";

    const fieldError = validateRequired({ name, title, bio, imageUrl }, ["name", "title", "bio", "imageUrl"]);
    if (fieldError) return { success: false, error: fieldError };

    if (!validateUrl(imageUrl)) return { success: false, error: "Invalid image URL" };
    if (linkedin && !validateUrl(linkedin)) return { success: false, error: "Invalid LinkedIn URL" };
    if (twitter && !validateUrl(twitter)) return { success: false, error: "Invalid Twitter URL" };

    try {
        await prisma.teamMember.update({
            where: { id },
            data: {
                name, title, bio, imageUrl,
                linkedin: linkedin || null,
                twitter: twitter || null,
                order, active,
            },
        });

        revalidatePath("/about");
        revalidatePath("/admin/team");
        return { success: true };
    } catch (error) {
        console.error("Failed to update team member:", error);
        return { success: false, error: "Failed to update team member. Please try again." };
    }
}

export async function deleteTeamMember(id: string): Promise<ActionResponse> {
    await requireAuth();

    try {
        await prisma.teamMember.delete({ where: { id } });
        revalidatePath("/about");
        revalidatePath("/admin/team");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete team member:", error);
        return { success: false, error: "Failed to delete team member. Please try again." };
    }
}
