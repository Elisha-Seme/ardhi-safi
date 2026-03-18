import prisma from "@/lib/prisma";
import Link from "next/link";
import {
    Plus,
    FileText,
    Edit,
    Trash2,
    Eye,
    Search,
    Calendar,
    User as UserIcon
} from "lucide-react";
import { format } from "date-fns";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import BlogsClientTable from "./BlogsClientTable";

export default async function AdminBlogsPage() {
    const blogs = await prisma.blogPost.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-heading text-primary">Insights &amp; Blogs</h1>
                    <p className="text-text-secondary text-sm mt-1">Manage your market analysis and articles.</p>
                </div>
                <Link
                    href="/admin/blogs/new"
                    className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-dark text-primary font-bold rounded-2xl shadow-lg shadow-accent/20 transition-all text-sm w-fit"
                >
                    <Plus size={18} /> New Article
                </Link>
            </div>

            <BlogsClientTable blogs={blogs} />
        </div>
    );
}
