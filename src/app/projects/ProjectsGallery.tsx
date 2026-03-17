"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { format } from "date-fns";



interface GalleryItem {
    id: string;
    title: string;
    category: string;
    imageUrl: string;
    date: Date;
}

interface ProjectsGalleryProps {
    items: GalleryItem[];
    categories: string[];
}

const ITEMS_PER_PAGE = 12;

export default function ProjectsGallery({ items, categories }: ProjectsGalleryProps) {
    const [activeCategory, setActiveCategory] = useState("All");
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    const filteredItems = activeCategory === "All"
        ? items
        : items.filter((item) => item.category === activeCategory);

    const visibleItems = filteredItems.slice(0, visibleCount);

    return (
        <>
            {/* Filters */}
            <section className="py-8 bg-white border-b border-gray-100 sticky top-16 z-30">
                <div className="section-container flex flex-wrap items-center justify-center gap-3">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => { setActiveCategory(cat); setVisibleCount(ITEMS_PER_PAGE); }}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                                    ? "bg-accent text-primary shadow-lg shadow-accent/20"
                                    : "bg-gray-100 text-text-secondary hover:bg-gray-200"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-24 bg-surface min-h-[500px]">
                <div className="section-container">
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {visibleItems.map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 break-inside-avoid bg-white"
                            >
                                {item.imageUrl ? (
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        width={800}
                                        height={600}
                                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                ) : (
                                    <div className="w-full aspect-[4/3] flex items-center justify-center bg-gray-100">
                                        <ImageIcon size={48} className="text-gray-300" />
                                    </div>
                                )}

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <span className="inline-block px-3 py-1 bg-accent text-primary text-[10px] font-bold uppercase tracking-widest rounded-full self-start mb-3">
                                        {item.category}
                                    </span>
                                    <h3 className="text-white font-heading text-xl">{item.title}</h3>
                                    <p className="text-white/60 text-xs mt-1">
                                        Added {format(new Date(item.date), 'MMMM yyyy')}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {visibleCount < filteredItems.length && (
                        <div className="text-center mt-12">
                            <button
                                onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                                className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-full transition-all text-sm"
                            >
                                Load More ({filteredItems.length - visibleCount} remaining)
                            </button>
                        </div>
                    )}

                    {filteredItems.length === 0 && (
                        <div className="text-center py-20">
                            <ImageIcon className="mx-auto text-gray-300 mb-4" size={48} />
                            <p className="text-text-secondary italic text-lg">No images found in this category.</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
