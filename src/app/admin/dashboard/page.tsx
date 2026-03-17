import prisma from "@/lib/prisma";
import {
    FileText,
    Users,
    ImageIcon,
    MessageSquare,
    TrendingUp,
    Clock,
    ExternalLink
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
    // Fetch statistics from DB
    const [blogCount, teamCount, leadCount, recentLeads, heroCount] = await Promise.all([
        prisma.blogPost.count(),
        prisma.teamMember.count(),
        prisma.lead.count(),
        prisma.lead.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' }
        }),
        prisma.heroSlide.count()
    ]);

    const stats = [
        { name: "Total Blogs", value: blogCount, icon: FileText, color: "bg-blue-500", href: "/admin/blogs" },
        { name: "Team Members", value: teamCount, icon: Users, color: "bg-emerald-500", href: "/admin/team" },
        { name: "Total Leads", value: leadCount, icon: MessageSquare, color: "bg-accent", href: "/admin/leads" },
        { name: "Hero Slides", value: heroCount, icon: ImageIcon, color: "bg-purple-500", href: "/admin/hero" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-heading text-primary">Overview</h1>
                <p className="text-text-secondary text-sm mt-1">Snapshot of your digital real estate.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((item) => (
                    <Link key={item.name} href={item.href}>
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`${item.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-current/10`}>
                                    <item.icon size={24} />
                                </div>
                                <TrendingUp size={16} className="text-emerald-500" />
                            </div>
                            <p className="text-text-secondary text-xs font-bold uppercase tracking-wider">{item.name}</p>
                            <h3 className="text-3xl font-heading text-primary mt-1">{item.value}</h3>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Leads */}
                <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="font-heading text-primary flex items-center gap-2">
                            <MessageSquare size={18} className="text-accent" />
                            Recent Inquiries
                        </h2>
                        <Link href="/admin/leads" className="text-xs font-bold text-accent hover:underline flex items-center gap-1">
                            View All <ExternalLink size={12} />
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {recentLeads.length > 0 ? (
                            recentLeads.map((lead) => (
                                <div key={lead.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h4 className="text-sm font-bold text-primary">{lead.name}</h4>
                                            <p className="text-xs text-text-secondary">{lead.email}</p>
                                        </div>
                                        <span className="text-[10px] text-text-secondary flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full uppercase tracking-tighter">
                                            <Clock size={10} /> {format(new Date(lead.createdAt), 'MMM d, p')}
                                        </span>
                                    </div>
                                    <p className="text-sm text-text-secondary line-clamp-1 italic">"{lead.message}"</p>
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center text-text-secondary">
                                <p className="text-sm italic">No inquiries yet.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-6">
                    <div className="bg-primary p-8 rounded-3xl text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
                        <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                            <FileText size={120} />
                        </div>
                        <h3 className="text-xl font-heading mb-4 relative z-10">Write an Insight</h3>
                        <p className="text-white/60 text-sm mb-6 relative z-10 line-relaxed">
                            Share your market expertise with your audience. Boost your SEO with a new blog post.
                        </p>
                        <Link href="/admin/blogs/new" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary font-bold rounded-2xl text-sm relative z-10 hover:bg-white transition-all">
                            Start Writing
                        </Link>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
                        <h3 className="text-lg font-heading text-primary mb-4">Site Status</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-text-secondary">Database</span>
                                <span className="flex items-center gap-2 text-xs font-bold text-emerald-500">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Connected
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-text-secondary">Auth Service</span>
                                <span className="flex items-center gap-2 text-xs font-bold text-emerald-500">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Protected
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-text-secondary">Storage</span>
                                <span className="flex items-center gap-2 text-xs font-bold text-emerald-500">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Local (v1)
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
