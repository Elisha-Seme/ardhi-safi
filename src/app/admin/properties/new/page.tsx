import PropertyForm from "../PropertyForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Add Property | Ardhi Safi Admin",
};

export default function NewPropertyPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <Link href="/admin/properties" className="inline-flex items-center gap-2 text-slate-500 hover:text-accent transition-colors mb-4 text-xs font-bold uppercase tracking-wider">
                        <ArrowLeft size={14} /> Back to Properties
                    </Link>
                    <h1 className="text-2xl font-heading text-primary font-bold tracking-tight">Add New <span className="gradient-text">Property</span></h1>
                </div>
            </div>

            <PropertyForm />
        </div>
    );
}
