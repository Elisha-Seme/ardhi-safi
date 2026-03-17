require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding (JS)...')

    // 1. Seed Admin User
    const hashedPassword = await bcrypt.hash('password123', 12)
    const admin = await prisma.user.upsert({
        where: { email: 'admin@ardhisafi.co.ke' },
        update: { password: hashedPassword },
        create: {
            email: 'admin@ardhisafi.co.ke',
            name: 'Ardhi Safi Admin',
            password: hashedPassword,
        },
    })
    console.log({ admin })

    // 2. Hero Slides
    const heroSlides = [
        { title: "Nairobi Skyline", subtitle: "Clean land. Clear titles.", imageUrl: "/hero/nairobi.svg", order: 0 },
        { title: "Coastal Properties", subtitle: "Prime beach plots in Diani and Nyali.", imageUrl: "/hero/coast.jpg", order: 1 },
        { title: "Luxury Living", subtitle: "Modern villas in Karen and Westlands.", imageUrl: "/hero/luxury.jpg", order: 2 },
    ]

    for (const slide of heroSlides) {
        await prisma.heroSlide.create({
            data: slide,
        })
    }

    // 3. Properties
    console.log('Seeding properties...')
    await prisma.property.deleteMany()
    const properties = [
        {
            title: "Modern 3-Bedroom Apartment in Kilimani",
            description: "Elegant modern apartment with panoramic city views, premium finishes, and dedicated parking.",
            location: "Kilimani, Nairobi",
            price: 15000000,
            transaction: "sale",
            type: "residential",
            bedrooms: 3,
            bathrooms: 2,
            area: 1800,
            areaUnit: "sq ft",
            imageUrl: "/properties/apartment-1.jpg",
            featured: true,
        },
        {
            title: "4-Bedroom Villa in Karen",
            description: "Luxurious villa set on a half-acre garden with swimming pool and mature landscaping.",
            location: "Karen, Nairobi",
            price: 45000000,
            transaction: "sale",
            type: "residential",
            bedrooms: 4,
            bathrooms: 3,
            area: 4500,
            areaUnit: "sq ft",
            imageUrl: "/properties/villa-1.jpg",
            featured: true,
        },
        {
            title: "Commercial Office Space in Upper Hill",
            description: "Prime Grade A office space with 24-hour security, backup power, and ample parking.",
            location: "Upper Hill, Nairobi",
            price: 250000,
            transaction: "rent",
            type: "commercial",
            area: 3000,
            areaUnit: "sq ft",
            imageUrl: "/properties/office-1.jpg",
            featured: true,
        },
    ]

    for (const p of properties) {
        await prisma.property.create({ data: p })
    }

    // 4. Testimonials for Capabilities
    console.log('Seeding more testimonials...')
    const extraTestimonials = [
        {
            name: "John Kamau",
            location: "Nairobi",
            quote: "Ardhi Safi helped me secure my first home with zero stress. Their transparency is unmatched.",
            category: "buyer",
            rating: 5
        },
        {
            name: "Sarah Wanjiku",
            location: "Mombasa",
            quote: "Managing my rental property from abroad was a nightmare until I found Ardhi Safi.",
            category: "landlord",
            rating: 5
        },
        {
            name: "David Omondi",
            location: "Kisumu",
            quote: "The investment advice I received was backed by real data. Highly recommend.",
            category: "investor",
            rating: 5
        }
    ]

    for (const t of extraTestimonials) {
        await prisma.testimonial.create({ data: t })
    }

    // 5. Simple Blog Post
    await prisma.blogPost.upsert({
        where: { slug: "welcome-to-new-ardhi-safi" },
        update: {},
        create: {
            slug: "welcome-to-new-ardhi-safi",
            title: "Welcome to the New Ardhi Safi",
            excerpt: "We have upgraded our platform to serve you better.",
            content: "We are excited to announce the launch of our new database-driven platform...",
            author: "Admin",
            category: "News",
            date: new Date().toISOString().split('T')[0],
            published: true
        }
    })

    console.log('Seeding finished (JS).')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
