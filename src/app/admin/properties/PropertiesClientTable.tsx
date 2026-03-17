"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit2, Trash2, Building2, MapPin, Search } from "lucide-react";

export function formatPrice(price: number) {
    return new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        maximumFractionDigits: 0,
    }).format(price);
}

export default function PropertiesClientTable({ properties, deletePropertyAction }: { properties: any[], deletePropertyAction: any }) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProperties = properties.filter((p) => {
        const query = searchQuery.toLowerCase();
        return (
            p.title?.toLowerCase().includes(query) ||
            p.location?.toLowerCase().includes(query) ||
            p.type?.toLowerCase().includes(query)
        );
    });

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between bg-slate-50/50 gap-4">
                <h2 className="font-heading text-primary font-bold">All Properties</h2>
                <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search properties..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-accent/20 focus:outline-none w-full sm:w-64"
                    />
                </div>
            </div>

            <div className="overflow-x-auto overflow-y-auto max-h-[600px]">
                <table className="w-full text-left relative">
                    <thead className="sticky top-0 bg-slate-50 border-b border-slate-200 shadow-sm z-10">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Property</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Location</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredProperties.length > 0 ? (
                            filteredProperties.map((property: any) => (
                                <tr key={property.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                                                {property.imageUrl ? (
                                                    <img src={property.imageUrl} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                        <Building2 size={24} />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-primary truncate max-w-[200px]">{property.title}</p>
                                                <p className="text-[11px] text-slate-400 capitalize">{property.type} • {property.bedrooms || 0} Beds</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 text-slate-500">
                                            <MapPin size={14} className="text-accent" />
                                            <span className="text-xs">{property.location}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-primary text-sm">
                                        {formatPrice(property.price)}
                                        {property.transaction === 'rent' && <span className="text-[10px] font-normal text-slate-400">/mo</span>}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${property.transaction === 'sale'
                                                ? 'bg-emerald-100 text-emerald-700'
                                                : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {property.transaction === 'sale' ? 'For Sale' : 'For Rent'}
                                        </span>
                                        {property.featured && (
                                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent/20 text-primary">
                                                Featured
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/properties/${property.id}/edit`}
                                                className="p-2 text-slate-400 hover:text-accent hover:bg-accent/10 rounded-lg transition-all"
                                            >
                                                <Edit2 size={16} />
                                            </Link>
                                            <form action={deletePropertyAction}>
                                                <input type="hidden" name="id" value={property.id} />
                                                <button type="submit" className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                                    <Trash2 size={16} />
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                                    No properties found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
