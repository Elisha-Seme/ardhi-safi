"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
                            {/* Featured Image */}
                            {post.image && (
                                <div className="relative h-64 md:h-80 rounded-xl mb-8 overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 768px"
                                    />
                                </div>
                            )}

                            <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-primary prose-a:text-accent prose-strong:text-primary">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {post.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
