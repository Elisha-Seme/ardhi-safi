"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Building2, Clock, User } from "lucide-react";

interface Blog {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string | null;
    imageUrl?: string | null;
}

interface InsightsListProps {
    initialPosts: Blog[];
    categories: string[];
}

const ITEMS_PER_PAGE = 9;

export default function InsightsList({ initialPosts, categories }: InsightsListProps) {
    const [activeCategory, setActiveCategory] = useState("All");
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    const filteredPosts = activeCategory === "All"
        ? initialPosts
        : initialPosts.filter((p) => p.category === activeCategory);

    const visiblePosts = filteredPosts.slice(0, visibleCount);

    return (
        <>
            {/* Category Filters */}
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

            {/* Blog Grid */}
            <section className="py-24 bg-surface">
                <div className="section-container">
                    {filteredPosts.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {visiblePosts.map((post, i) => (
                                    <motion.div
                                        key={post.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.08 }}
                                    >
                                        <Link href={`/insights/${post.slug}`} className="group block">
                                            <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full">
                                                <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative overflow-hidden">
                                                    {post.imageUrl ? (
                                                        <Image src={post.imageUrl} alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                                                    ) : (
                                                        <Building2 size={32} className="text-primary/20" />
                                                    )}
                                                    <div className="absolute top-4 left-4">
                                                        <span className="px-3 py-1 bg-accent text-primary text-xs font-semibold rounded-full">
                                                            {post.category}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="p-6">
                                                    <div className="flex items-center gap-4 text-xs text-text-secondary mb-3">
                                                        <span className="flex items-center gap-1">
                                                            <Clock size={12} />
                                                            {new Date(post.date).toLocaleDateString("en-KE", {
                                                                year: "numeric",
                                                                month: "long",
                                                                day: "numeric",
                                                            })}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <User size={12} />
                                                            {post.readTime}
                                                        </span>
                                                    </div>
                                                    <h3 className="font-heading text-lg text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-text-secondary text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                                                    <div className="flex items-center gap-2 text-accent text-sm font-medium">
                                                        Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {visibleCount < filteredPosts.length && (
                                <div className="text-center mt-12">
                                    <button
                                        onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                                        className="px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-full transition-all text-sm"
                                    >
                                        Load More Articles ({filteredPosts.length - visibleCount} remaining)
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-20 text-text-secondary italic">
                            No articles found in this category yet.
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
