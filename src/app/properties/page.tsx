import { Suspense } from "react";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import type { Metadata } from "next";
import PropertiesClient from "./PropertiesClient";

export const metadata: Metadata = {
    title: "Properties | Ardhi Safi Limited",
    description: "Browse premium properties for sale and rent across all 47 counties in Kenya. Find your perfect home, office, or investment property.",
};

const PAGE_SIZE = 12;

interface Props {
    searchParams: Promise<{
        q?: string;
        transaction?: string;
        type?: string;
        sort?: string;
        page?: string;
    }>;
}

export default async function PropertiesPage({ searchParams }: Props) {
    const params = await searchParams;
    const { q, transaction, type, sort } = params;
    const page = Math.max(1, parseInt(params.page || "1", 10) || 1);

    // Build Prisma where clause from search params
    const where: Prisma.PropertyWhereInput = { active: true };

    if (transaction && transaction !== "all") {
        where.transaction = transaction;
    }

    if (type && type !== "all") {
        where.type = type;
    }

    if (q) {
        where.OR = [
            { title: { contains: q } },
            { location: { contains: q } },
            { description: { contains: q } },
            { type: { contains: q } },
        ];
    }

    // Build orderBy from sort param
    let orderBy: Prisma.PropertyOrderByWithRelationInput;
    switch (sort) {
        case "price-asc":
            orderBy = { price: "asc" };
            break;
        case "price-desc":
            orderBy = { price: "desc" };
            break;
        default:
            orderBy = { createdAt: "desc" };
    }

    const [properties, totalCount, allTypes, allLocations] = await Promise.all([
        prisma.property.findMany({ where, orderBy, skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE }),
        prisma.property.count({ where }),
        prisma.property.findMany({
            where: { active: true },
            select: { type: true },
            distinct: ["type"],
        }),
        prisma.property.findMany({
            where: { active: true },
            select: { location: true },
            distinct: ["location"],
        }),
    ]);

    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    return (
        <Suspense>
            <PropertiesClient
                properties={properties}
                types={allTypes.map((t) => t.type)}
                locations={allLocations.map((l) => l.location)}
                initialFilters={{ q: q || "", transaction: transaction || "all", type: type || "all", sort: sort || "newest" }}
                pagination={{ page, totalPages, totalCount }}
            />
        </Suspense>
    );
}
