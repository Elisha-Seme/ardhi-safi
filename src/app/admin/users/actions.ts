"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth-guard";
import { validateRequired, validateEmail } from "@/lib/validation";
import type { ActionResponse } from "@/lib/action-response";
import bcrypt from "bcryptjs";

export async function createUser(formData: FormData): Promise<ActionResponse> {
    await requireAuth();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const fieldError = validateRequired({ name, email, password }, ["name", "email", "password"]);
    if (fieldError) return { success: false, error: fieldError };
    if (!validateEmail(email)) return { success: false, error: "Invalid email format" };
    if (password.length < 8) return { success: false, error: "Password must be at least 8 characters" };

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return { success: false, error: "A user with this email already exists" };

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
        data: { name, email, password: hashedPassword },
    });

    revalidatePath("/admin/users");
    return { success: true };
}

export async function deleteUser(id: string): Promise<ActionResponse> {
    const session = await requireAuth();

    // Prevent deleting yourself
    if (session.user?.id === id) {
        return { success: false, error: "You cannot delete your own account" };
    }

    const userCount = await prisma.user.count();
    if (userCount <= 1) {
        return { success: false, error: "Cannot delete the last remaining admin user" };
    }

    await prisma.user.delete({ where: { id } });

    revalidatePath("/admin/users");
    return { success: true };
}

export async function changePassword(id: string, formData: FormData): Promise<ActionResponse> {
    await requireAuth();

    const newPassword = formData.get("newPassword") as string;
    if (!newPassword || newPassword.length < 8) {
        return { success: false, error: "Password must be at least 8 characters" };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
        where: { id },
        data: { password: hashedPassword },
    });

    revalidatePath("/admin/users");
    return { success: true };
}
