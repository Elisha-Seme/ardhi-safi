import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, Building2, Home, Map } from "lucide-react";
import { deleteProperty } from "./actions";
import PropertiesClientTable from "./PropertiesClientTable";

export const dynamic = 'force-dynamic';

export const metadata = {
    title: "Manage Properties | Ardhi Safi Admin",
};

export default async function AdminPropertiesPage() {
    const properties = await prisma.property.findMany({
        orderBy: { createdAt: 'desc' },
    });

    async function handleDelete(formData: FormData) {
        "use server";
        const id = formData.get("id") as string;
        await deleteProperty(id);
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-heading text-primary font-bold">Properties</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage your property listings across Kenya.</p>
                </div>
                <Link
                    href="/admin/properties/new"
                    className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-primary px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-accent/20 text-sm w-fit"
                >
                    <Plus size={18} />
                    Add Property
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Listings", count: properties.length, icon: Building2, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "For Sale", count: properties.filter((p) => p.transaction === "sale").length, icon: Home, color: "text-emerald-600", bg: "bg-emerald-50" },
                    { label: "For Rent", count: properties.filter((p) => p.transaction === "rent").length, icon: Map, color: "text-orange-600", bg: "bg-orange-50" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5">
                        <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-inner`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                            <p className="text-2xl font-heading text-primary font-bold">{stat.count}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* List */}
            <PropertiesClientTable properties={properties} deletePropertyAction={handleDelete} />
        </div>
    );
}
