"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth-guard";
import type { ActionResponse } from "@/lib/action-response";

export async function deleteLead(id: string): Promise<ActionResponse> {
    await requireAuth();

    try {
        await prisma.lead.delete({ where: { id } });
        revalidatePath("/admin/leads");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete lead:", error);
        return { success: false, error: "Failed to delete lead. Please try again." };
    }
}
