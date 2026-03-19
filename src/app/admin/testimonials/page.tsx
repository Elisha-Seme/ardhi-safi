import prisma from "@/lib/prisma";
import {
    Plus,
    User as UserIcon,
    Edit,
    Trash2,
    Star,
    Quote,
    Layout
} from "lucide-react";
import Link from "next/link";
import { deleteTestimonial } from "./actions";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export default async function AdminTestimonialsPage() {
    const testimonials = await prisma.testimonial.findMany({
        orderBy: { id: 'desc' }
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-heading text-primary">Testimonials</h1>
                    <p className="text-text-secondary text-sm mt-1">Manage client feedback and social proof displayed across the website.</p>
                </div>
                <Link
                    href="/admin/testimonials/new"
                    className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-primary font-bold rounded-2xl shadow-lg shadow-accent/20 transition-all text-sm"
                >
                    <Plus size={18} /> Add Testimonial
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all flex flex-col">
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            className={i < testimonial.rating ? "fill-accent text-accent" : "fill-gray-100 text-gray-200"}
                                        />
                                    ))}
                                </div>
                                <Quote size={20} className="text-accent/20" />
                            </div>

                            <p className="text-text-secondary text-sm italic mb-6 line-clamp-4 flex-1">
                                &ldquo;{testimonial.quote}&rdquo;
                            </p>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <UserIcon size={16} className="text-primary/40" />
                                </div>
                                <div>
                                    <h4 className="font-heading text-primary text-sm line-clamp-1">{testimonial.name}</h4>
                                    <p className="text-text-secondary text-[10px] uppercase tracking-wider">{testimonial.location} • {testimonial.category}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-surface border-t border-gray-50 flex items-center justify-between">
                            <div>
                                <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md ${testimonial.active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-600'}`}>
                                    {testimonial.active ? 'Active' : 'Hidden'}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Link
                                    href={`/admin/testimonials/${testimonial.id}`}
                                    className="p-2 hover:bg-accent/10 text-primary rounded-lg transition-colors"
                                    title="Edit Testimonial"
                                >
                                    <Edit size={16} />
                                </Link>
                                <form action={async () => { "use server"; await deleteTestimonial(testimonial.id); revalidatePath("/admin/testimonials"); }}>
                                    <button
                                        type="submit"
                                        className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                                        title="Delete Testimonial"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                ))}
                {testimonials.length === 0 && (
                    <div className="col-span-full py-20 bg-white rounded-3xl border border-dashed border-gray-200 text-center flex flex-col items-center">
                        <Layout className="mx-auto text-gray-200 mb-4" size={48} />
                        <p className="text-text-secondary italic">No testimonials added yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
