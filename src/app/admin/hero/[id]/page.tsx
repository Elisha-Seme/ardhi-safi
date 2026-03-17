import prisma from "@/lib/prisma";
import HeroForm from "../HeroForm";
import { notFound } from "next/navigation";

export default async function EditHeroPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const slide = await prisma.heroSlide.findUnique({
        where: { id },
    });

    if (!slide) {
        notFound();
    }

    return <HeroForm mode="edit" initialData={slide} />;
}
