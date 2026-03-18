import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");

    // ── Admin User ──────────────────────────────────────────────
    const hashedPassword = await bcrypt.hash("password123", 12);
    const admin = await prisma.user.upsert({
        where: { email: "admin@ardhisafi.co.ke" },
        update: { password: hashedPassword },
        create: {
            email: "admin@ardhisafi.co.ke",
            name: "Ardhi Safi Admin",
            password: hashedPassword,
        },
    });
    console.log(`Admin user: ${admin.email}`);

    // ── Hero Slides ─────────────────────────────────────────────
    const heroSlides = [
        { title: "Nairobi Skyline", subtitle: "Clean land. Clear titles.", imageUrl: "/hero/nairobi.svg", order: 0 },
        { title: "Coastal Properties", subtitle: "Prime beach plots in Diani and Nyali.", imageUrl: "/hero/coast.jpg", order: 1 },
        { title: "Luxury Living", subtitle: "Modern villas in Karen and Westlands.", imageUrl: "/hero/luxury.jpg", order: 2 },
    ];

    for (const slide of heroSlides) {
        await prisma.heroSlide.upsert({
            where: { id: slide.title.toLowerCase().replace(/\s+/g, "-") },
            update: slide,
            create: { id: slide.title.toLowerCase().replace(/\s+/g, "-"), ...slide },
        });
    }
    console.log(`Hero slides: ${heroSlides.length}`);

    // ── Properties (3+) ─────────────────────────────────────────
    const properties = [
        {
            id: "prop-kilimani-apt",
            title: "Modern 3-Bedroom Apartment in Kilimani",
            description: "Elegant modern apartment with panoramic city views, premium finishes, and dedicated parking. Walking distance to Yaya Centre and major hospitals.",
            location: "Kilimani, Nairobi",
            county: "Nairobi",
            subcounty: "Dagoretti North",
            ward: "Kilimani",
            price: 15000000,
            transaction: "sale",
            type: "residential",
            category: "listing",
            bedrooms: 3,
            bathrooms: 2,
            area: 1800,
            areaUnit: "sq ft",
            imageUrl: "/properties/apartment-1.jpg",
            featured: true,
        },
        {
            id: "prop-karen-villa",
            title: "4-Bedroom Villa in Karen",
            description: "Luxurious villa set on a half-acre garden with swimming pool, mature landscaping, staff quarters, and 24-hour security.",
            location: "Karen, Nairobi",
            county: "Nairobi",
            subcounty: "Langata",
            ward: "Karen",
            price: 45000000,
            transaction: "sale",
            type: "residential",
            category: "listing",
            bedrooms: 4,
            bathrooms: 3,
            area: 4500,
            areaUnit: "sq ft",
            imageUrl: "/properties/villa-1.jpg",
            featured: true,
        },
        {
            id: "prop-upperhill-office",
            title: "Commercial Office Space in Upper Hill",
            description: "Prime Grade A office space with 24-hour security, backup power, fibre internet, and ample parking in Nairobi's financial district.",
            location: "Upper Hill, Nairobi",
            county: "Nairobi",
            subcounty: "Starehe",
            price: 250000,
            transaction: "rent",
            type: "commercial",
            category: "listing",
            area: 3000,
            areaUnit: "sq ft",
            imageUrl: "/properties/office-1.jpg",
            featured: true,
        },
    ];

    for (const p of properties) {
        await prisma.property.upsert({
            where: { id: p.id },
            update: p,
            create: p,
        });
    }
    console.log(`Properties: ${properties.length}`);

    // ── Blog Posts (3+) ─────────────────────────────────────────
    const blogPosts = [
        {
            slug: "welcome-to-new-ardhi-safi",
            title: "Welcome to the New Ardhi Safi",
            excerpt: "We have upgraded our platform to serve you better with a modern, database-driven experience.",
            content: `We are excited to announce the launch of our new platform. Ardhi Safi Limited has invested in a complete digital overhaul to bring you faster property searches, richer listings, and a seamless experience whether you are buying, selling, or renting property across Kenya.\n\nOur new system features real-time property listings, an advanced search engine covering all 47 counties, and a dedicated insights section where we share market analysis and investment guides.\n\nStay tuned for more updates as we continue to improve.`,
            author: "Ardhi Safi Team",
            category: "News",
            date: "2026-03-01",
            readTime: "3 min read",
            published: true,
        },
        {
            slug: "understanding-land-ownership-in-kenya",
            title: "Understanding Land Ownership in Kenya: A Comprehensive Guide",
            excerpt: "Navigate Kenya's land tenure system with confidence. Learn about freehold, leasehold, and community land.",
            content: `Land ownership in Kenya is governed by the Constitution of Kenya 2010 and the Land Act 2012. There are three main categories of land tenure:\n\n**Freehold:** Grants the holder absolute ownership rights with no time limit. Common in agricultural areas and some urban zones.\n\n**Leasehold:** Grants rights for a defined period (typically 99 years). Most urban properties in Nairobi and Mombasa fall under this category.\n\n**Community Land:** Held by communities identified on the basis of ethnicity, culture, or similar community of interest. Governed by the Community Land Act 2016.\n\nBefore purchasing any property, always conduct a thorough title search at the Ministry of Lands, verify the seller's identity, and engage a qualified advocate to handle the conveyancing process.\n\nAt Ardhi Safi, we guide our clients through every step of the due diligence process to ensure clean, dispute-free transactions.`,
            author: "Legal Team",
            category: "Guides",
            date: "2026-03-05",
            readTime: "6 min read",
            published: true,
        },
        {
            slug: "nairobi-real-estate-market-outlook-2026",
            title: "Nairobi Real Estate Market Outlook for 2026",
            excerpt: "Key trends shaping Nairobi's property market this year — from satellite towns to green buildings.",
            content: `Nairobi's real estate market continues to evolve in 2026, driven by infrastructure development, urbanisation, and shifting buyer preferences.\n\n**Satellite Towns on the Rise:** Areas like Ruiru, Syokimau, Athi River, and Kitengela are seeing strong demand as the Nairobi Expressway and commuter rail improve connectivity.\n\n**Green Buildings:** Developers are increasingly adopting green building standards. Properties with solar panels, rainwater harvesting, and energy-efficient designs command premium prices.\n\n**Commercial Space Recovery:** The office market is stabilising after years of oversupply. Grade A offices in Westlands and Upper Hill are seeing improved occupancy rates above 80%.\n\n**Affordable Housing:** The government's affordable housing initiative continues to create opportunities in the KES 2-4 million segment, particularly in Mavoko and Mlolongo.\n\nWhether you are an investor, developer, or homebuyer, understanding these trends is key to making informed decisions. Contact Ardhi Safi for a personalised market briefing.`,
            author: "Research Desk",
            category: "Market Analysis",
            date: "2026-03-10",
            readTime: "5 min read",
            published: true,
        },
    ];

    for (const post of blogPosts) {
        await prisma.blogPost.upsert({
            where: { slug: post.slug },
            update: post,
            create: post,
        });
    }
    console.log(`Blog posts: ${blogPosts.length}`);

    // ── Testimonials ────────────────────────────────────────────
    const testimonials = [
        {
            id: "test-kamau",
            name: "John Kamau",
            location: "Nairobi",
            quote: "Ardhi Safi helped me secure my first home with zero stress. Their transparency is unmatched.",
            category: "buyer",
            rating: 5,
        },
        {
            id: "test-wanjiku",
            name: "Sarah Wanjiku",
            location: "Mombasa",
            quote: "Managing my rental property from abroad was a nightmare until I found Ardhi Safi. Professional and reliable.",
            category: "landlord",
            rating: 5,
        },
        {
            id: "test-omondi",
            name: "David Omondi",
            location: "Kisumu",
            quote: "The investment advice I received was backed by real data and local expertise. Highly recommend.",
            category: "investor",
            rating: 5,
        },
    ];

    for (const t of testimonials) {
        await prisma.testimonial.upsert({
            where: { id: t.id },
            update: t,
            create: t,
        });
    }
    console.log(`Testimonials: ${testimonials.length}`);

    console.log("Seeding complete.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
