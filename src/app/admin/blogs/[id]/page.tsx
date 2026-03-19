import prisma from "@/lib/prisma";
import BlogForm from "../BlogForm";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const blog = await prisma.blogPost.findUnique({
        where: { id },
    });

    if (!blog) {
        notFound();
    }

    const initialData = {
        id: blog.id,
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        author: blog.author,
        category: blog.category,
        imageUrl: blog.imageUrl || "",
        readTime: blog.readTime,
        published: blog.published,
    };

    return <BlogForm mode="edit" initialData={initialData} />;
}
