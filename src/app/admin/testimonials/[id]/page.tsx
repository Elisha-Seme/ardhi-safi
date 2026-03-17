import prisma from "@/lib/prisma";
import TestimonialForm from "../TestimonialForm";
import { notFound } from "next/navigation";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const t = await prisma.testimonial.findUnique({
        where: { id },
    });

    if (!t) {
        notFound();
    }

    return <TestimonialForm mode="edit" initialData={t} />;
}
