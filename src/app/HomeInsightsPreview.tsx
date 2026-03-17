"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Building2, ChevronRight } from "lucide-react";

interface BlogPreview {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: string | null;
}

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

export default function HomeInsightsPreview({ posts }: { posts: BlogPreview[] }) {
    return (
        <section className="py-24 bg-surface">
            <div className="section-container">
                <motion.div {...fadeInUp} className="text-center mb-16">
                    <p className="text-accent text-sm tracking-[0.2em] uppercase mb-3 font-medium">Latest Articles</p>
                    <h2 className="text-3xl md:text-5xl font-heading text-primary mb-4">
                        Insights
                    </h2>
                    <p className="text-text-secondary max-w-2xl mx-auto">
                        Stay informed with our expert analysis of the Kenyan real estate market.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post, i) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link href={`/insights/${post.slug}`} className="group block h-full">
                                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                                    <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center shrink-0 relative overflow-hidden">
                                        <Building2 size={32} className="text-primary/20" />
                                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-xs text-accent font-semibold uppercase tracking-wider">{post.category}</span>
                                            <span className="text-xs text-text-secondary">{post.readTime}</span>
                                        </div>
                                        <h3 className="font-heading text-lg text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-text-secondary text-sm line-clamp-2 mb-4 flex-1">{post.excerpt}</p>
                                        <div className="flex items-center gap-2 text-accent text-sm font-medium">
                                            Read More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                    {posts.length === 0 && (
                        <div className="col-span-full py-12 text-center text-text-secondary italic">
                            Articles and market analysis coming soon.
                        </div>
                    )}
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/insights"
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white hover:bg-primary-light font-semibold rounded-full transition-all text-sm shadow-xl shadow-primary/20 hover:shadow-primary/30"
                    >
                        View All Insights
                        <ChevronRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
