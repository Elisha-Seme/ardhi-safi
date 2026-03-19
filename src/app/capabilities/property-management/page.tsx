import prisma from "@/lib/prisma";
import PropertyManagementClient from "./PropertyManagementClient";

export const dynamic = 'force-dynamic';

export const metadata = {
    title: "Property Management | Ardhi Safi Limited",
    description: "Professional property management services in Kenya with transparency, precision, and care.",
};

export default async function PropertyManagementPage() {
    const testimonials = await prisma.testimonial.findMany({
        where: {
            active: true,
            category: { in: ["landlord", "tenant"] }
        },
        take: 4
    });

    return <PropertyManagementClient testimonials={testimonials} />;
}
