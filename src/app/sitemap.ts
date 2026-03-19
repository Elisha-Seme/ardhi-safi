import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ardhisafi.co.ke';

    // Core static pages
    const staticRoutes = [
        '',
        '/about',
        '/capabilities',
        '/capabilities/sales-letting',
        '/capabilities/property-management',
        '/capabilities/property-investment',
        '/projects',
        '/insights',
        '/properties',
        '/contact',
        '/privacy',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic blog post pages
    const blogs = await prisma.blogPost.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
    });

    const blogRoutes = blogs.map((post) => ({
        url: `${baseUrl}/insights/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    // Dynamic property listing — single page with filters, not individual pages,
    // so /properties is already in static routes. If individual property pages
    // are added later, query active properties here.

    return [...staticRoutes, ...blogRoutes];
}
