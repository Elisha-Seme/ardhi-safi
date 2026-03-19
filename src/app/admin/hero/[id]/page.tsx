import prisma from "@/lib/prisma";
import HeroForm from "../HeroForm";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

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
