"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Save, X, Loader2, Building2, MapPin, DollarSign, Ruler, Bed, LayoutGrid, Tag } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import { createProperty, updateProperty } from "./actions";
import { getCountyNames, getSubCounties, getWards } from "@/data/countyLocations";

const LocationMapPicker = dynamic(() => import("@/components/LocationMapPicker"), { ssr: false });

interface PropertyFormProps {
    initialData?: any;
}

export default function PropertyForm({ initialData }: PropertyFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        description: initialData?.description || "",
        location: initialData?.location || "",
        county: initialData?.county || "",
        subcounty: initialData?.subcounty || "",
        ward: initialData?.ward || "",
        price: initialData?.price || 0,
        transaction: initialData?.transaction || "sale",
        type: initialData?.type || "residential",
        category: initialData?.category || "listing",
        bedrooms: initialData?.bedrooms || 0,
        bathrooms: initialData?.bathrooms || 0,
        area: initialData?.area || 0,
        areaUnit: initialData?.areaUnit || "sq ft",
        featured: initialData?.featured || false,
        imageUrl: initialData?.imageUrl || "",
        latitude: initialData?.latitude || "",
        longitude: initialData?.longitude || "",
        active: initialData?.active ?? true,
    });

    const countyNames = getCountyNames();
    const subCounties = formData.county ? getSubCounties(formData.county) : [];
    const wards = formData.subcounty ? getWards(formData.county, formData.subcounty) : [];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const fd = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            fd.append(key, String(value));
        });

        try {
            const result = initialData
                ? await updateProperty(initialData.id, fd)
                : await createProperty(fd);

            if (result.success) {
                router.push("/admin/properties");
            } else {
                setError(result.error);
            }
        } catch (err) {
            console.error(err);
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                        <div className="flex items-center gap-2 pb-4 border-b border-slate-50">
                            <Building2 size={20} className="text-accent" />
                            <h2 className="font-heading text-primary font-bold">Property Details</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Property Title</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all"
                                    placeholder="e.g., Luxury 4-Bedroom Villa in Karen"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</label>
                                <textarea
                                    required
                                    rows={6}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all resize-none"
                                    placeholder="Detailed description of the property, features, and amenities..."
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Location (Free text)</label>
                                <div className="relative">
                                    <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        required
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all"
                                        placeholder="e.g., Karen, Nairobi"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Price (KES)</label>
                                <div className="relative">
                                    <DollarSign size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="number"
                                        required
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-50">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                    <MapPin size={12} className="inline mr-1 text-accent" />
                                    Map Location (Optional)
                                </label>
                                <p className="text-xs text-slate-400 mb-3">Search for an address or click directly on the map to set coordinates.</p>
                                <LocationMapPicker
                                    latitude={formData.latitude}
                                    longitude={formData.longitude}
                                    onChange={(lat, lng) => setFormData({ ...formData, latitude: lat, longitude: lng })}
                                />
                            </div>
                        </div>

                        {/* County / Sub-county / Ward cascading dropdowns */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">County</label>
                                <select
                                    value={formData.county}
                                    onChange={(e) => setFormData({ ...formData, county: e.target.value, subcounty: "", ward: "" })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all appearance-none text-sm"
                                >
                                    <option value="">Select County</option>
                                    {countyNames.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Sub-County</label>
                                <select
                                    value={formData.subcounty}
                                    onChange={(e) => setFormData({ ...formData, subcounty: e.target.value, ward: "" })}
                                    disabled={!formData.county}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all appearance-none text-sm disabled:opacity-50"
                                >
                                    <option value="">Select Sub-County</option>
                                    {subCounties.map((sc) => (
                                        <option key={sc} value={sc}>{sc}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Ward</label>
                                <select
                                    value={formData.ward}
                                    onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                                    disabled={!formData.subcounty}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all appearance-none text-sm disabled:opacity-50"
                                >
                                    <option value="">Select Ward</option>
                                    {wards.map((w) => (
                                        <option key={w} value={w}>{w}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                        <div className="flex items-center gap-2 pb-4 border-b border-slate-50">
                            <LayoutGrid size={20} className="text-accent" />
                            <h2 className="font-heading text-primary font-bold">Specifications</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Area</label>
                                <div className="relative">
                                    <Ruler size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="number"
                                        required
                                        value={formData.area}
                                        onChange={(e) => setFormData({ ...formData, area: Number(e.target.value) })}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Area Unit</label>
                                <select
                                    value={formData.areaUnit}
                                    onChange={(e) => setFormData({ ...formData, areaUnit: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all appearance-none"
                                >
                                    <option value="sq ft">sq ft</option>
                                    <option value="acres">Acres</option>
                                    <option value="hectares">Hectares</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Bedrooms</label>
                                <div className="relative">
                                    <Bed size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="number"
                                        value={formData.bedrooms}
                                        onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Config */}
                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Transaction Type</label>
                            <div className="flex bg-slate-100 p-1 rounded-xl">
                                {["sale", "rent"].map((t) => (
                                    <button
                                        key={t}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, transaction: t })}
                                        className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${formData.transaction === t
                                                ? "bg-white text-primary shadow-sm"
                                                : "text-slate-400 hover:text-slate-600"
                                            }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Property Type</label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all appearance-none text-sm"
                            >
                                <option value="residential">Residential</option>
                                <option value="commercial">Commercial</option>
                                <option value="land">Land</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                <Tag size={14} className="inline mr-1 text-accent" />
                                Category
                            </label>
                            <div className="flex bg-slate-100 p-1 rounded-xl">
                                {[{ value: "listing", label: "Listing" }, { value: "project", label: "Ardhi Safi Project" }].map((c) => (
                                    <button
                                        key={c.value}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, category: c.value })}
                                        className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${formData.category === c.value
                                                ? "bg-white text-primary shadow-sm"
                                                : "text-slate-400 hover:text-slate-600"
                                            }`}
                                    >
                                        {c.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Featured Listing</label>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.featured}
                                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                                <span className="ml-3 text-sm font-medium text-slate-500">Show on Home Page</span>
                            </label>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Property Image</label>
                        <ImageUpload
                            name="imageUrl"
                            defaultValue={formData.imageUrl}
                            onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-accent hover:bg-accent-dark text-primary font-bold py-4 rounded-xl transition-all shadow-lg shadow-accent/20 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                            {initialData ? "Update Property" : "Save Property"}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl transition-all"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
