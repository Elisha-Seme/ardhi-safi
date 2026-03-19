import prisma from "@/lib/prisma";
import {
    Plus,
    ImageIcon,
    Edit,
    Trash2,
    Layout
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { deleteGalleryItem } from "./actions";
import { revalidatePath } from "next/cache";
import { format } from "date-fns";

export const dynamic = 'force-dynamic';

export default async function AdminGalleryPage() {
    const items = await prisma.galleryItem.findMany({
        orderBy: { date: 'desc' }
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-heading text-primary">Gallery Management</h1>
                    <p className="text-text-secondary text-sm mt-1">Manage project images and company assets.</p>
                </div>
                <Link
                    href="/admin/gallery/new"
                    className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-primary font-bold rounded-2xl shadow-lg shadow-accent/20 transition-all text-sm"
                >
                    <Plus size={18} /> Upload Image
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((item) => (
                    <div key={item.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all">
                        <div className="h-48 relative overflow-hidden bg-surface">
                            {item.imageUrl ? (
                                <Image src={item.imageUrl} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-primary/10">
                                    <ImageIcon size={48} />
                                </div>
                            )}
                            <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 bg-primary/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                                    {item.category}
                                </span>
                            </div>
                        </div>
                        <div className="p-5">
                            <h3 className="font-heading text-sm text-primary mb-1 line-clamp-1">{item.title}</h3>
                            <p className="text-text-secondary text-xs mb-4">Added: {format(new Date(item.date), 'MMM dd, yyyy')}</p>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                <div className="flex items-center gap-2 w-full justify-end">
                                    <Link
                                        href={`/admin/gallery/${item.id}`}
                                        className="p-2 hover:bg-accent/10 text-primary rounded-lg transition-colors"
                                        title="Edit Details"
                                    >
                                        <Edit size={16} />
                                    </Link>
                                    <form action={async () => { "use server"; await deleteGalleryItem(item.id); revalidatePath("/admin/gallery"); }}>
                                        <button
                                            type="submit"
                                            className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                                            title="Delete Image"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {items.length === 0 && (
                    <div className="col-span-full py-20 bg-white rounded-3xl border border-dashed border-gray-200 text-center">
                        <Layout className="mx-auto text-gray-200 mb-4" size={48} />
                        <p className="text-text-secondary italic">No images in your gallery yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
