import prisma from "@/lib/prisma";
import { format } from "date-fns";
import {
    Trash2,
    Mail,
    Phone,
    Building2,
    Globe,
    MapPin,
    MessageSquare
} from "lucide-react";
import { deleteLead } from "./actions";
import { revalidatePath } from "next/cache";

export default async function AdminLeadsPage() {
    const leads = await prisma.lead.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-heading text-primary">Contact Leads</h1>
                <p className="text-text-secondary text-sm mt-1">Inquiries and messages submitted through the website contact form.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-surface border-b border-gray-100/50">
                                <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-text-secondary">Date</th>
                                <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-text-secondary">Contact Info</th>
                                <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-text-secondary">Company Details</th>
                                <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-text-secondary">Message Preview</th>
                                <th className="py-4 px-6 text-xs font-bold uppercase tracking-widest text-text-secondary text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {leads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-5 px-6 whitespace-nowrap">
                                        <p className="text-sm font-medium text-primary">
                                            {format(new Date(lead.createdAt), 'MMM d, yyyy')}
                                        </p>
                                        <p className="text-xs text-text-secondary">
                                            {format(new Date(lead.createdAt), 'h:mm a')}
                                        </p>
                                    </td>
                                    <td className="py-5 px-6">
                                        <p className="text-sm font-bold text-primary mb-1">{lead.name}</p>
                                        <div className="space-y-1">
                                            <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-xs text-accent hover:underline">
                                                <Mail size={12} /> {lead.email}
                                            </a>
                                            {lead.phone && (
                                                <a href={`tel:${lead.phone}`} className="flex items-center gap-2 text-xs text-text-secondary hover:text-primary transition-colors">
                                                    <Phone size={12} /> {lead.phone}
                                                </a>
                                            )}
                                            {(lead.nationality || lead.gender) && (
                                                <div className="flex items-center gap-2 text-[10px] text-text-secondary uppercase tracking-wider mt-2">
                                                    {lead.nationality && <span>{lead.nationality}</span>}
                                                    {lead.nationality && lead.gender && <span>•</span>}
                                                    {lead.gender && <span>{lead.gender}</span>}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-5 px-6">
                                        <div className="space-y-1.5">
                                            {lead.company ? (
                                                <p className="flex items-center gap-2 text-xs text-primary font-medium">
                                                    <Building2 size={12} className="text-text-secondary" /> {lead.company}
                                                </p>
                                            ) : (
                                                <p className="text-xs text-text-secondary italic">No company</p>
                                            )}
                                            {lead.jobTitle && (
                                                <p className="text-xs text-text-secondary">{lead.jobTitle}</p>
                                            )}
                                            {(lead.country || lead.county) && (
                                                <p className="flex items-center gap-2 text-[10px] text-text-secondary uppercase tracking-wider mt-2">
                                                    <MapPin size={10} />
                                                    {lead.country && lead.country}
                                                    {lead.country && lead.county && ' - '}
                                                    {lead.county && lead.county}
                                                </p>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-5 px-6 max-w-xs">
                                        <div className="flex items-start gap-2">
                                            <MessageSquare size={14} className="text-accent shrink-0 mt-0.5" />
                                            <p className="text-sm text-text-secondary line-clamp-3" title={lead.message}>
                                                {lead.message}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6 text-right">
                                        <form action={async () => { "use server"; await deleteLead(lead.id); revalidatePath("/admin/leads"); }}>
                                            <button
                                                type="submit"
                                                className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors inline-block"
                                                title="Delete Lead"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                            {leads.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-16 text-center text-text-secondary italic">
                                        <Globe size={32} className="mx-auto text-gray-200 mb-3" />
                                        No inquiries have been received yet.
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
