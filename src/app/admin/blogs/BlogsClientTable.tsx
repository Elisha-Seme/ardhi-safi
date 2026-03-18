"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Eye, Edit, Trash2, FileText, User as UserIcon, Calendar } from "lucide-react";
import { deleteBlog } from "./actions";
import { blogCategories } from "@/data/blogs";

export default function BlogsClientTable({ blogs }: { blogs: any[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All Categories");

    const filteredBlogs = blogs.filter((post) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
            post.title?.toLowerCase().includes(query) ||
            post.author?.toLowerCase().includes(query) ||
            post.category?.toLowerCase().includes(query);
            
        const matchesCategory = categoryFilter === "All Categories" || post.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-6">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-4">
                <div className="w-full md:flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by title, author or category..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent focus:border-accent focus:bg-white rounded-xl outline-none transition-all text-sm"
                    />
                </div>
                <div className="w-full md:w-auto">
                    <select 
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="w-full md:w-auto px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-medium outline-none cursor-pointer"
                    >
                        <option>All Categories</option>
                        {blogCategories.filter(c => c !== "All").map(cat => (
                            <option key={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Desktop Table */}
                <div className="hidden sm:block overflow-x-auto overflow-y-auto max-h-[600px]">
                    <table className="w-full text-left relative">
                        <thead className="sticky top-0 bg-gray-50 border-b border-gray-100 shadow-sm z-10">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Article</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Details</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Status</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredBlogs.length > 0 ? (
                                filteredBlogs.map((post) => (
                                    <tr key={post.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-14 h-14 bg-surface rounded-xl flex items-center justify-center shrink-0 border border-gray-100 overflow-hidden">
                                                    {post.imageUrl ? (
                                                        <Image src={post.imageUrl} alt="" fill className="object-cover rounded-xl" />
                                                    ) : (
                                                        <FileText className="text-accent" size={24} />
                                                    )}
                                                </div>
                                                <div className="max-w-md">
                                                    <h4 className="text-sm font-bold text-primary group-hover:text-accent transition-colors line-clamp-1">{post.title}</h4>
                                                    <p className="text-xs text-text-secondary line-clamp-1 mt-1">{post.excerpt}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 font-medium">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-xs text-text-secondary">
                                                    <UserIcon size={12} className="text-accent" /> {post.author}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-text-secondary">
                                                    <Calendar size={12} className="text-accent" /> {post.date}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-text-secondary">
                                                    <FileText size={12} className="text-accent" /> {post.category || 'Uncategorized'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${post.published ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"
                                                }`}>
                                                {post.published ? "Published" : "Draft"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {post.published ? (
                                                    <Link
                                                        href={`/insights/${post.slug}`}
                                                        target="_blank"
                                                        className="p-2 hover:bg-blue-50 text-blue-500 rounded-lg transition-colors"
                                                        title="View Live"
                                                    >
                                                        <Eye size={18} />
                                                    </Link>
                                                ): null}
                                                <Link
                                                    href={`/admin/blogs/${post.id}`}
                                                    className="p-2 hover:bg-accent/10 text-primary rounded-lg transition-colors"
                                                    title="Edit Article"
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                                <form action={deleteBlog.bind(null, post.id) as any}>
                                                    <button
                                                        type="submit"
                                                        className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                                                        title="Delete Article"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-20 text-center text-text-secondary italic">
                                        No articles found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
