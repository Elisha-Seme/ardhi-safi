import prisma from "@/lib/prisma";
import SalesLettingClient from "./SalesLettingClient";

export const dynamic = 'force-dynamic';

export const metadata = {
    title: "Property Sales & Letting | Ardhi Safi Limited",
    description: "Expert property sales and letting services in Kenya. We help you buy, sell, and lease property with confidence.",
};

export default async function SalesLettingPage() {
    const testimonials = await prisma.testimonial.findMany({
        where: {
            active: true,
            category: { in: ["buyer", "seller", "investor"] }
        },
        take: 3
    });

    return <SalesLettingClient testimonials={testimonials} />;
}
