import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ardhisafi.co.ke';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/api/'], // hide admin panel from indexer
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
