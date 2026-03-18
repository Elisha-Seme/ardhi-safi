import prisma from "@/lib/prisma";
import {
    Plus,
    ImageIcon,
    Edit,
    Trash2,
    ArrowUp,
    ArrowDown,
    Layout
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { deleteHeroSlide } from "./actions";
import { revalidatePath } from "next/cache";

export default async function AdminHeroPage() {
    const slides = await prisma.heroSlide.findMany({
        orderBy: { order: 'asc' }
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-heading text-primary">Hero Slider</h1>
                    <p className="text-text-secondary text-sm mt-1">Manage the high-impact visuals on your home page.</p>
                </div>
                <Link
                    href="/admin/hero/new"
                    className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-primary font-bold rounded-2xl shadow-lg shadow-accent/20 transition-all text-sm"
                >
                    <Plus size={18} /> Add New Slide
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {slides.map((slide) => (
                    <div key={slide.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all">
                        <div className="h-48 relative overflow-hidden bg-surface">
                            {slide.imageUrl ? (
                                <Image src={slide.imageUrl} alt={slide.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-primary/10">
                                    <ImageIcon size={48} />
                                </div>
                            )}
                            <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 bg-primary/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                                    Order: {slide.order}
                                </span>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="font-heading text-primary mb-1 line-clamp-1">{slide.title}</h3>
                            <p className="text-text-secondary text-xs line-clamp-2">{slide.subtitle}</p>

                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50">
                                <div className="flex gap-1">
                                    {/* Ordering buttons placeholder - could add logic here later */}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`/admin/hero/${slide.id}`}
                                        className="p-2 hover:bg-accent/10 text-primary rounded-lg transition-colors"
                                        title="Edit Slide"
                                    >
                                        <Edit size={16} />
                                    </Link>
                                    <form action={async () => { "use server"; await deleteHeroSlide(slide.id); revalidatePath("/admin/hero"); }}>
                                        <button
                                            type="submit"
                                            className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                                            title="Delete Slide"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {slides.length === 0 && (
                    <div className="col-span-full py-20 bg-white rounded-3xl border border-dashed border-gray-200 text-center">
                        <Layout className="mx-auto text-gray-200 mb-4" size={48} />
                        <p className="text-text-secondary italic">No slides found. Add one to welcome your visitors!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
