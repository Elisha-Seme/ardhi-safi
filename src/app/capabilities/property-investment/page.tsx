import prisma from "@/lib/prisma";
import PropertyInvestmentClient from "./PropertyInvestmentClient";

export const dynamic = 'force-dynamic';

export const metadata = {
    title: "Property Investment | Ardhi Safi Limited",
    description: "Strategic property investment advisory services in Kenya. Unlock value and drive long-term returns.",
};

export default async function PropertyInvestmentPage() {
    const testimonials = await prisma.testimonial.findMany({
        where: {
            active: true,
            category: "investor"
        },
        take: 4
    });

    return <PropertyInvestmentClient testimonials={testimonials} />;
}
