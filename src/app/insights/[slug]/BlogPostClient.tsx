"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, User, Building2 } from "lucide-react";
import { BlogPost } from "@/data/blogs";

interface BlogPostClientProps {
    post: BlogPost;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
    return (
        <div className="overflow-hidden">
            {/* Hero */}
            <section className="relative pt-32 pb-16 bg-primary text-white">
                <div className="section-container relative z-10">
                    <Link href="/insights" className="inline-flex items-center gap-2 text-white/60 hover:text-accent transition-colors mb-8 text-sm">
                        <ArrowLeft size={16} /> Back to Insights
                    </Link>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="px-3 py-1 bg-accent text-primary text-xs font-semibold rounded-full">
                            {post.category}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-heading mt-4 mb-6 max-w-4xl">{post.title}</h1>
                        <div className="flex items-center gap-6 text-white/60 text-sm">
                            <span className="flex items-center gap-2"><User size={14} />{post.author}</span>
                            <span className="flex items-center gap-2">
                                <Clock size={14} />
                                {new Date(post.date).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}
                            </span>
                            <span>{post.readTime}</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 bg-surface">
                <div className="section-container">
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-md">
                            {/* Featured Image Placeholder */}
                            <div className="h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl mb-8 flex items-center justify-center">
                                <Building2 size={48} className="text-primary/20" />
                            </div>

                            <div className="prose prose-lg max-w-none">
                                <p className="text-text-secondary text-lg leading-relaxed mb-6">{post.excerpt}</p>
                                <p className="text-text-secondary leading-relaxed mb-6">{post.content}</p>
                                <p className="text-text-secondary leading-relaxed mb-6">
                                    The Kenyan real estate market continues to present significant opportunities for both local and international investors. With ongoing infrastructure development, including the expansion of major highways and the growing middle class, demand for quality housing and commercial spaces remains strong.
                                </p>
                                <p className="text-text-secondary leading-relaxed mb-6">
                                    At Ardhi Safi, we leverage our deep market knowledge and extensive network to help our clients navigate these opportunities with confidence. Our commitment to transparency and proper documentation ensures that every transaction is secure and compliant with all applicable regulations.
                                </p>
                                <p className="text-text-secondary leading-relaxed">
                                    For more information or to discuss investment opportunities, please don&apos;t hesitate to{" "}
                                    <Link href="/contact" className="text-accent hover:underline font-medium">contact our team</Link>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
