import { Suspense } from "react";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import type { Metadata } from "next";
import PropertiesClient from "./PropertiesClient";

export const dynamic = 'force-dynamic';

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
        category?: string;
        county?: string;
        priceMin?: string;
        priceMax?: string;
        beds?: string;
        baths?: string;
        sort?: string;
        page?: string;
        neLat?: string;
        neLng?: string;
        swLat?: string;
        swLng?: string;
    }>;
}

export default async function PropertiesPage({ searchParams }: Props) {
    const params = await searchParams;
    const { q, transaction, type, category, county, priceMin, priceMax, beds, baths, sort, neLat, neLng, swLat, swLng } = params;
    const page = Math.max(1, parseInt(params.page || "1", 10) || 1);

    // Build Prisma where clause from search params
    const where: Prisma.PropertyWhereInput = { active: true };

    if (transaction && transaction !== "all") {
        where.transaction = transaction;
    }

    if (type && type !== "all") {
        where.type = type;
    }

    if (category && category !== "all") {
        where.category = category;
    }

    if (county) {
        // Split search terms so "Karen Nairobi" matches properties in Karen OR Nairobi
        const terms = county.split(/[\s,]+/).filter(Boolean);
        const locationConditions: Prisma.PropertyWhereInput[] = [];
        for (const term of terms) {
            locationConditions.push(
                { county: { contains: term, mode: "insensitive" } },
                { subcounty: { contains: term, mode: "insensitive" } },
                { ward: { contains: term, mode: "insensitive" } },
                { location: { contains: term, mode: "insensitive" } },
            );
        }
        where.OR = where.OR || [];
        (where.OR as Prisma.PropertyWhereInput[]).push(...locationConditions);
    }

    if (priceMin) {
        where.price = { ...(where.price as object || {}), gte: Number(priceMin) };
    }
    if (priceMax) {
        where.price = { ...(where.price as object || {}), lte: Number(priceMax) };
    }

    if (beds && beds !== "any") {
        where.bedrooms = { gte: Number(beds) };
    }
    if (baths && baths !== "any") {
        where.bathrooms = { gte: Number(baths) };
    }

    // Bounding box geo filter — only return properties within map viewport
    if (neLat && neLng && swLat && swLng) {
        const ne = { lat: parseFloat(neLat), lng: parseFloat(neLng) };
        const sw = { lat: parseFloat(swLat), lng: parseFloat(swLng) };
        if (!isNaN(ne.lat) && !isNaN(ne.lng) && !isNaN(sw.lat) && !isNaN(sw.lng)) {
            where.latitude = { gte: sw.lat, lte: ne.lat };
            where.longitude = { gte: sw.lng, lte: ne.lng };
        }
    }

    if (q) {
        const searchConditions: Prisma.PropertyWhereInput[] = [
            { title: { contains: q, mode: "insensitive" } },
            { location: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
            { type: { contains: q, mode: "insensitive" } },
            { county: { contains: q, mode: "insensitive" } },
            { subcounty: { contains: q, mode: "insensitive" } },
            { ward: { contains: q, mode: "insensitive" } },
        ];
        if (where.OR) {
            where.AND = [{ OR: where.OR as Prisma.PropertyWhereInput[] }, { OR: searchConditions }];
            delete where.OR;
        } else {
            where.OR = searchConditions;
        }
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
                initialFilters={{
                    q: q || "", transaction: transaction || "all", type: type || "all",
                    category: category || "all", county: county || "", sort: sort || "newest",
                    priceMin: priceMin || "", priceMax: priceMax || "",
                    beds: beds || "any", baths: baths || "any",
                }}
                pagination={{ page, totalPages, totalCount }}
            />
        </Suspense>
    );
}
