import { Metadata } from 'next';
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";

export const dynamic = 'force-dynamic';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await prisma.blogPost.findUnique({
        where: { slug }
    });

    if (!post) return { title: 'Post Not Found' };

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
            authors: [post.author],
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await prisma.blogPost.findUnique({
        where: { slug }
    });

    if (!post) return notFound();

    // Map DB post to the structure expected by BlogPostClient
    const formattedPost = {
        ...post,
        image: post.imageUrl || "/blog/market-analysis.jpg" // Fallback
    };

    return <BlogPostClient post={formattedPost} />;
}
