import prisma from "@/lib/prisma";
import GalleryForm from "../GalleryForm";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function EditGalleryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await prisma.galleryItem.findUnique({
        where: { id },
    });

    if (!item) {
        notFound();
    }

    return <GalleryForm mode="edit" initialData={item} />;
}
