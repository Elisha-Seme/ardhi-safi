import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PropertyDetailClient from "./PropertyDetailClient";

export const dynamic = 'force-dynamic';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const property = await prisma.property.findUnique({ where: { id } });

    if (!property) return { title: "Property Not Found" };

    const price = new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        maximumFractionDigits: 0,
    }).format(property.price);

    return {
        title: `${property.title} | Ardhi Safi Limited`,
        description: `${property.title} - ${price} in ${property.location}. ${property.description.slice(0, 150)}`,
        openGraph: {
            title: property.title,
            description: property.description.slice(0, 200),
            images: property.imageUrl ? [property.imageUrl] : [],
        },
    };
}

export default async function PropertyDetailPage({ params }: Props) {
    const { id } = await params;

    const [property, similarProperties] = await Promise.all([
        prisma.property.findUnique({ where: { id } }),
        prisma.property.findMany({
            where: {
                active: true,
                id: { not: id },
            },
            take: 3,
            orderBy: { createdAt: "desc" },
        }),
    ]);

    if (!property || !property.active) {
        notFound();
    }

    // Refine similar: prefer same type/transaction
    const sorted = similarProperties.sort((a, b) => {
        const aScore = (a.type === property.type ? 2 : 0) + (a.transaction === property.transaction ? 1 : 0);
        const bScore = (b.type === property.type ? 2 : 0) + (b.transaction === property.transaction ? 1 : 0);
        return bScore - aScore;
    });

    return (
        <PropertyDetailClient
            property={{
                ...property,
                latitude: property.latitude,
                longitude: property.longitude,
            }}
            similarProperties={sorted}
        />
    );
}
