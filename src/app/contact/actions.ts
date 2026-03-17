"use server";

import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { validateRequired, validateEmail } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rate-limit";
import type { ActionResponse } from "@/lib/action-response";

export async function submitLead(formData: FormData): Promise<ActionResponse> {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";
    if (!checkRateLimit(`contact:${ip}`, 5)) {
        return { success: false, error: "Too many submissions. Please try again later." };
    }

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const jobTitle = formData.get("jobTitle") as string || null;
    const company = formData.get("company") as string || null;
    const nationality = formData.get("nationality") as string || null;
    const country = formData.get("country") as string || null;
    const county = formData.get("county") as string || null;
    const gender = formData.get("gender") as string || null;

    const countryCode = formData.get("countryCode") as string || "";
    const mobile = formData.get("mobile") as string || "";
    const phone = mobile ? `${countryCode}${mobile}` : null;

    const fieldError = validateRequired({ name, email, message }, ["name", "email", "message"]);
    if (fieldError) return { success: false, error: fieldError };

    if (!validateEmail(email)) return { success: false, error: "Invalid email format" };

    try {
        await prisma.lead.create({
            data: {
                name, email, message,
                jobTitle, company, nationality,
                country, county, gender, phone,
            },
        });

        return { success: true };
    } catch (error) {
        console.error("Failed to submit lead:", error);
        return { success: false, error: "Failed to submit your message. Please try again." };
    }
}
