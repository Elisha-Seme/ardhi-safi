"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    MapPin,
    Search,
    Building2,
    ChevronLeft,
    ChevronRight,
    X,
    BedDouble,
    Bath,
    Maximize,
    LayoutGrid,
    List,
} from "lucide-react";

interface Property {
    id: string;
    title: string;
    description: string;
    location: string;
    price: number;
    transaction: string;
    type: string;
    bedrooms: number | null;
    bathrooms: number | null;
    area: number;
    areaUnit: string;
    featured: boolean;
    imageUrl: string | null;
    active: boolean;
}

function formatPrice(price: number): string {
    return new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        maximumFractionDigits: 0,
    }).format(price);
}

export default function PropertiesClient({
    properties,
    types,
    locations,
    initialFilters,
    pagination,
}: {
    properties: Property[];
    types: string[];
    locations: string[];
    initialFilters: { q: string; transaction: string; type: string; sort: string };
    pagination: { page: number; totalPages: number; totalCount: number };
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(initialFilters.q);
    const [filterTransaction, setFilterTransaction] = useState(initialFilters.transaction);
    const [filterType, setFilterType] = useState(initialFilters.type);
    const [sortBy, setSortBy] = useState(initialFilters.sort);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const pushFilters = useCallback((overrides: Record<string, string>) => {
        const params = new URLSearchParams(searchParams.toString());
        // Reset to page 1 when changing filters (not when explicitly setting page)
        if (!("page" in overrides)) {
            params.delete("page");
        }
        for (const [key, value] of Object.entries(overrides)) {
            if (!value || value === "all" || value === "newest" || value === "" || (key === "page" && value === "1")) {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        }
        const qs = params.toString();
        router.push(qs ? `/properties?${qs}` : "/properties");
    }, [router, searchParams]);

    const activeFilterCount = [filterTransaction !== "all", filterType !== "all"].filter(Boolean).length;

    function clearFilters() {
        setSearchQuery("");
        setFilterTransaction("all");
        setFilterType("all");
        setSortBy("newest");
        router.push("/properties");
    }

    return (
        <div className="overflow-hidden">
            {/* Hero Banner */}
            <section className="relative pt-36 pb-20 bg-primary overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]">
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 2px 2px, rgba(184,155,94,0.5) 1px, transparent 0)",
                            backgroundSize: "32px 32px",
                        }}
                    />
                </div>
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse at 20% 50%, rgba(184,155,94,0.1) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(184,155,94,0.08) 0%, transparent 50%)",
                    }}
                />
                <div className="section-container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4 font-medium">
                            Browse Our Portfolio
                        </p>
                        <h1 className="text-4xl md:text-6xl font-heading text-white mb-4 leading-tight">
                            All <span className="gradient-text">Properties</span>
                        </h1>
                        <p className="text-white/60 max-w-lg mx-auto text-base">
                            Discover premium properties across Kenya — from luxury residences to
                            prime commercial spaces.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Search & Filter Bar */}
            <section className="relative -mt-8 z-20">
                <div className="section-container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 md:p-6"
                    >
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="relative flex-1">
                                <Search
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={18}
                                />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === "Enter") pushFilters({ q: searchQuery }); }}
                                    onBlur={() => pushFilters({ q: searchQuery })}
                                    placeholder="Search by title, location, or type..."
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent focus:outline-none transition-all"
                                />
                            </div>

                            {/* Quick Filters */}
                            <div className="flex gap-3 flex-wrap md:flex-nowrap">
                                <select
                                    value={filterTransaction}
                                    onChange={(e) => { setFilterTransaction(e.target.value); pushFilters({ transaction: e.target.value }); }}
                                    className="px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none cursor-pointer focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                                >
                                    <option value="all">Buy or Rent</option>
                                    <option value="sale">For Sale</option>
                                    <option value="rent">For Rent</option>
                                </select>

                                <select
                                    value={filterType}
                                    onChange={(e) => { setFilterType(e.target.value); pushFilters({ type: e.target.value }); }}
                                    className="px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none cursor-pointer focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                                >
                                    <option value="all">All Types</option>
                                    {types.map((t) => (
                                        <option key={t} value={t}>
                                            {t.charAt(0).toUpperCase() + t.slice(1)}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={sortBy}
                                    onChange={(e) => { setSortBy(e.target.value); pushFilters({ sort: e.target.value }); }}
                                    className="px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none cursor-pointer focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="price-asc">Price: Low → High</option>
                                    <option value="price-desc">Price: High → Low</option>
                                </select>
                            </div>
                        </div>

                        {/* Active filters & view toggle */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-3">
                                <p className="text-sm text-text-secondary">
                                    <span className="font-bold text-primary">{pagination.totalCount}</span>{" "}
                                    {pagination.totalCount === 1 ? "property" : "properties"} found
                                </p>
                                {activeFilterCount > 0 && (
                                    <button
                                        onClick={clearFilters}
                                        className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-semibold hover:bg-red-100 transition-colors"
                                    >
                                        <X size={12} /> Clear filters
                                    </button>
                                )}
                            </div>
                            <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-2 rounded-md transition-colors ${
                                        viewMode === "grid"
                                            ? "bg-white text-primary shadow-sm"
                                            : "text-gray-400 hover:text-gray-600"
                                    }`}
                                >
                                    <LayoutGrid size={16} />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-2 rounded-md transition-colors ${
                                        viewMode === "list"
                                            ? "bg-white text-primary shadow-sm"
                                            : "text-gray-400 hover:text-gray-600"
                                    }`}
                                >
                                    <List size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Property Grid / List */}
            <section className="py-16 bg-surface min-h-[400px]">
                <div className="section-container">
                    {properties.length > 0 ? (
                        viewMode === "grid" ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {properties.map((property, i) => (
                                    <motion.div
                                        key={property.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05, duration: 0.4 }}
                                    >
                                        <Link href={`/properties/${property.id}`} className="block group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                            <div className="relative h-60 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                                                {property.imageUrl ? (
                                                    <Image
                                                        src={property.imageUrl}
                                                        alt={property.title}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <Building2 size={48} className="text-primary/20" />
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

                                                {/* Badges */}
                                                <div className="absolute top-4 left-4 z-20 flex gap-2">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md ${
                                                            property.transaction === "sale"
                                                                ? "bg-accent/90 text-primary"
                                                                : "bg-emerald-500/90 text-white"
                                                        }`}
                                                    >
                                                        {property.transaction === "sale"
                                                            ? "For Sale"
                                                            : "For Rent"}
                                                    </span>
                                                    {property.featured && (
                                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-primary backdrop-blur-md">
                                                            ★ Featured
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Price */}
                                                <div className="absolute bottom-4 left-4 z-20">
                                                    <p className="text-white font-bold text-xl drop-shadow-md">
                                                        {formatPrice(property.price)}
                                                        {property.transaction === "rent" && (
                                                            <span className="text-sm font-normal opacity-80">
                                                                /mo
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="p-6">
                                                <h3 className="font-heading text-lg text-primary mb-2 group-hover:text-accent transition-colors line-clamp-1">
                                                    {property.title}
                                                </h3>
                                                <p className="text-text-secondary text-sm flex items-center gap-1 mb-3">
                                                    <MapPin size={14} className="text-accent flex-shrink-0" />
                                                    {property.location}
                                                </p>
                                                <p className="text-text-secondary text-xs mb-4 line-clamp-2">
                                                    {property.description}
                                                </p>

                                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                    <div className="flex gap-4 text-xs text-text-secondary">
                                                        {property.bedrooms && (
                                                            <span className="flex items-center gap-1">
                                                                <BedDouble size={13} className="text-accent" />
                                                                {property.bedrooms} Beds
                                                            </span>
                                                        )}
                                                        {property.bathrooms && (
                                                            <span className="flex items-center gap-1">
                                                                <Bath size={13} className="text-accent" />
                                                                {property.bathrooms} Baths
                                                            </span>
                                                        )}
                                                        <span className="flex items-center gap-1">
                                                            <Maximize size={13} className="text-accent" />
                                                            {property.area.toLocaleString()} {property.areaUnit}
                                                        </span>
                                                    </div>
                                                    <ChevronRight
                                                        size={16}
                                                        className="text-accent group-hover:translate-x-1 transition-transform"
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            /* List View */
                            <div className="space-y-4">
                                {properties.map((property, i) => (
                                    <motion.div
                                        key={property.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.04, duration: 0.4 }}
                                    >
                                        <Link href={`/properties/${property.id}`} className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group">
                                            <div className="relative w-full md:w-72 h-52 md:h-auto flex-shrink-0 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                                                {property.imageUrl ? (
                                                    <Image
                                                        src={property.imageUrl}
                                                        alt={property.title}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                        sizes="(max-width: 768px) 100vw, 288px"
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <Building2 size={40} className="text-primary/20" />
                                                    </div>
                                                )}
                                                <div className="absolute top-4 left-4 z-10 flex gap-2">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md ${
                                                            property.transaction === "sale"
                                                                ? "bg-accent/90 text-primary"
                                                                : "bg-emerald-500/90 text-white"
                                                        }`}
                                                    >
                                                        {property.transaction === "sale"
                                                            ? "For Sale"
                                                            : "For Rent"}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex-1 p-6 flex flex-col justify-center">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h3 className="font-heading text-lg text-primary group-hover:text-accent transition-colors">
                                                            {property.title}
                                                        </h3>
                                                        <p className="text-text-secondary text-sm flex items-center gap-1 mt-1">
                                                            <MapPin size={14} className="text-accent" />
                                                            {property.location}
                                                        </p>
                                                    </div>
                                                    <p className="text-primary font-bold text-lg whitespace-nowrap">
                                                        {formatPrice(property.price)}
                                                        {property.transaction === "rent" && (
                                                            <span className="text-xs font-normal text-text-secondary">
                                                                /mo
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                                <p className="text-text-secondary text-sm line-clamp-2 mb-4">
                                                    {property.description}
                                                </p>
                                                <div className="flex items-center gap-5 text-xs text-text-secondary">
                                                    <span className="px-2 py-1 bg-gray-100 rounded-md capitalize font-medium">
                                                        {property.type}
                                                    </span>
                                                    {property.bedrooms && (
                                                        <span className="flex items-center gap-1">
                                                            <BedDouble size={13} className="text-accent" />
                                                            {property.bedrooms} Beds
                                                        </span>
                                                    )}
                                                    {property.bathrooms && (
                                                        <span className="flex items-center gap-1">
                                                            <Bath size={13} className="text-accent" />
                                                            {property.bathrooms} Baths
                                                        </span>
                                                    )}
                                                    <span className="flex items-center gap-1">
                                                        <Maximize size={13} className="text-accent" />
                                                        {property.area.toLocaleString()} {property.areaUnit}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        )
                    ) : (
                        /* Empty State */
                        <div className="text-center py-20">
                            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-2xl flex items-center justify-center">
                                <Building2 size={36} className="text-gray-300" />
                            </div>
                            <h3 className="text-xl font-heading text-primary mb-2">No properties found</h3>
                            <p className="text-text-secondary text-sm mb-6 max-w-md mx-auto">
                                We couldn&apos;t find any properties matching your criteria. Try adjusting your
                                search or clearing your filters.
                            </p>
                            <button
                                onClick={clearFilters}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-primary font-semibold rounded-xl transition-all text-sm"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                    {/* Pagination */}
                    {pagination.totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-12">
                            <button
                                onClick={() => pushFilters({ page: String(pagination.page - 1) })}
                                disabled={pagination.page <= 1}
                                className="p-2.5 rounded-xl border border-gray-200 text-primary hover:bg-accent/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                                <button
                                    key={p}
                                    onClick={() => pushFilters({ page: String(p) })}
                                    className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                                        p === pagination.page
                                            ? "bg-accent text-primary shadow-lg shadow-accent/20"
                                            : "border border-gray-200 text-text-secondary hover:bg-gray-50"
                                    }`}
                                >
                                    {p}
                                </button>
                            ))}
                            <button
                                onClick={() => pushFilters({ page: String(pagination.page + 1) })}
                                disabled={pagination.page >= pagination.totalPages}
                                className="p-2.5 rounded-xl border border-gray-200 text-primary hover:bg-accent/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-primary text-white">
                <div className="section-container text-center">
                    <h2 className="text-3xl md:text-4xl font-heading mb-4">
                        Can&apos;t Find What You&apos;re Looking For?
                    </h2>
                    <p className="text-white/60 max-w-lg mx-auto mb-8">
                        Our team has access to exclusive off-market listings across Kenya. Reach out and
                        let us help you find your perfect property.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-dark text-primary font-bold rounded-full transition-all shadow-lg shadow-accent/20 text-sm"
                    >
                        Contact Us Today
                        <ChevronRight size={16} />
                    </Link>
                </div>
            </section>
        </div>
    );
}
