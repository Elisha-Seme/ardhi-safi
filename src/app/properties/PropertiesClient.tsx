"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

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
    SlidersHorizontal,
    Map as MapIcon,
} from "lucide-react";
import LocationSearch from "@/components/LocationSearch";

const PropertiesMap = dynamic(() => import("@/components/PropertiesMap"), { ssr: false });

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
    latitude: number | null;
    longitude: number | null;
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
    initialFilters: {
        q: string; transaction: string; type: string; sort: string;
        category: string; county: string; priceMin: string; priceMax: string;
        beds: string; baths: string;
    };
    pagination: { page: number; totalPages: number; totalCount: number };
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(initialFilters.q);
    const [filterTransaction, setFilterTransaction] = useState(initialFilters.transaction);
    const [filterType, setFilterType] = useState(initialFilters.type);
    const [filterCategory, setFilterCategory] = useState(initialFilters.category);
    const [filterCounty, setFilterCounty] = useState(initialFilters.county);
    const [filterPriceMin, setFilterPriceMin] = useState(initialFilters.priceMin);
    const [filterPriceMax, setFilterPriceMax] = useState(initialFilters.priceMax);
    const [filterBeds, setFilterBeds] = useState(initialFilters.beds);
    const [filterBaths, setFilterBaths] = useState(initialFilters.baths);
    const [sortBy, setSortBy] = useState(initialFilters.sort);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [showMoreFilters, setShowMoreFilters] = useState(false);
    const [showMap, setShowMap] = useState(true);
    const [mapFocus, setMapFocus] = useState<{ lat: number; lng: number } | null>(null);
    const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);
    const [searchBounds, setSearchBounds] = useState<{ ne: { lat: number; lng: number }; sw: { lat: number; lng: number } } | null>(null);

    const pushFilters = useCallback((overrides: Record<string, string>) => {
        const params = new URLSearchParams(searchParams.toString());
        // Reset to page 1 when changing filters (not when explicitly setting page)
        if (!("page" in overrides)) {
            params.delete("page");
        }
        for (const [key, value] of Object.entries(overrides)) {
            if (!value || value === "all" || value === "newest" || value === "any" || value === "" || (key === "page" && value === "1")) {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        }
        const qs = params.toString();
        router.push(qs ? `/properties?${qs}` : "/properties");
    }, [router, searchParams]);

    const activeFilterCount = [
        filterTransaction !== "all",
        filterType !== "all",
        filterCategory !== "all",
        filterCounty !== "",
        filterPriceMin !== "",
        filterPriceMax !== "",
        filterBeds !== "any",
        filterBaths !== "any",
    ].filter(Boolean).length;

    function clearFilters() {
        setSearchQuery("");
        setFilterTransaction("all");
        setFilterType("all");
        setFilterCategory("all");
        setFilterCounty("");
        setFilterPriceMin("");
        setFilterPriceMax("");
        setFilterBeds("any");
        setFilterBaths("any");
        setSortBy("newest");
        setShowMoreFilters(false);
        setSearchBounds(null);
        setMapFocus(null);
        router.push("/properties");
    }

    return (
        <div>
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

            {/* Search & Filter Bar — Zillow-style */}
            <section className="relative -mt-8 z-20">
                <div className="section-container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 md:p-6"
                    >
                        {/* Row 1: Location + Transaction Toggle + Search button */}
                        <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                            <LocationSearch
                                value={filterCounty}
                                onChange={(val) => { setFilterCounty(val); }}
                                onLocationSelect={(coords) => {
                                    if (coords.bounds) {
                                        setSearchBounds(coords.bounds);
                                        setMapFocus(null);
                                        // Push bounds to URL for server-side geo filtering
                                        pushFilters({
                                            county: filterCounty,
                                            neLat: String(coords.bounds.ne.lat),
                                            neLng: String(coords.bounds.ne.lng),
                                            swLat: String(coords.bounds.sw.lat),
                                            swLng: String(coords.bounds.sw.lng),
                                        });
                                    } else {
                                        setMapFocus({ lat: coords.lat, lng: coords.lng });
                                        setSearchBounds(null);
                                    }
                                    if (!showMap) setShowMap(true);
                                }}
                                placeholder="Search by county, area, or ward..."
                                className="flex-1 min-w-0"
                            />

                            {/* Buy / Rent toggle pills */}
                            <div className="flex bg-gray-100 p-1 rounded-xl self-stretch sm:self-center">
                                {[
                                    { value: "all", label: "All" },
                                    { value: "sale", label: "Buy" },
                                    { value: "rent", label: "Rent" },
                                ].map((t) => (
                                    <button
                                        key={t.value}
                                        type="button"
                                        suppressHydrationWarning
                                        onClick={() => { setFilterTransaction(t.value); pushFilters({ transaction: t.value }); }}
                                        className={`flex-1 sm:flex-none px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                                            filterTransaction === t.value
                                                ? "bg-white text-primary shadow-sm"
                                                : "text-gray-400 hover:text-gray-600"
                                        }`}
                                    >
                                        {t.label}
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                suppressHydrationWarning
                                onClick={() => pushFilters({ q: searchQuery, county: filterCounty })}
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-primary font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-accent/30 text-sm w-full sm:w-auto"
                            >
                                <Search size={16} />
                                Search
                            </button>
                        </div>

                        {/* Row 1.5: Property Type — Residential / Commercial / Land */}
                        <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mr-1">Type</span>
                            {[
                                { value: "all", label: "All", icon: Building2 },
                                { value: "residential", label: "Residential", icon: BedDouble },
                                { value: "commercial", label: "Commercial", icon: Building2 },
                                { value: "land", label: "Land", icon: Maximize },
                            ].map((t) => (
                                <button
                                    key={t.value}
                                    type="button"
                                    suppressHydrationWarning
                                    onClick={() => { setFilterType(t.value); pushFilters({ type: t.value }); }}
                                    className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                                        filterType === t.value
                                            ? "bg-primary text-white shadow-md shadow-primary/20"
                                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                    }`}
                                >
                                    <t.icon size={13} />
                                    {t.label}
                                </button>
                            ))}
                        </div>

                        {/* Row 2: Price range + Beds + Baths + Type + More */}
                        <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-gray-100">
                            {/* Price range */}
                            <div className="flex items-center gap-2 flex-1 sm:flex-none">
                                <input
                                    type="number"
                                    value={filterPriceMin}
                                    suppressHydrationWarning
                                    onChange={(e) => setFilterPriceMin(e.target.value)}
                                    onBlur={() => pushFilters({ priceMin: filterPriceMin })}
                                    onKeyDown={(e) => { if (e.key === "Enter") pushFilters({ priceMin: filterPriceMin }); }}
                                    placeholder="Min Price"
                                    className="flex-1 min-w-0 w-28 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-accent/20 focus:border-accent focus:outline-none transition-all"
                                />
                                <span className="text-gray-300 text-xs flex-shrink-0">–</span>
                                <input
                                    type="number"
                                    value={filterPriceMax}
                                    suppressHydrationWarning
                                    onChange={(e) => setFilterPriceMax(e.target.value)}
                                    onBlur={() => pushFilters({ priceMax: filterPriceMax })}
                                    onKeyDown={(e) => { if (e.key === "Enter") pushFilters({ priceMax: filterPriceMax }); }}
                                    placeholder="Max Price"
                                    className="flex-1 min-w-0 w-28 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-accent/20 focus:border-accent focus:outline-none transition-all"
                                />
                            </div>

                            <div className="w-px h-6 bg-gray-200 hidden md:block" />

                            {/* Beds button group */}
                            <div className="flex items-center gap-1">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mr-1">Beds</span>
                                {["any", "1", "2", "3", "4"].map((b) => (
                                    <button
                                        key={b}
                                        type="button"
                                        suppressHydrationWarning
                                        onClick={() => { setFilterBeds(b); pushFilters({ beds: b }); }}
                                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                                            filterBeds === b
                                                ? "bg-accent text-primary shadow-sm"
                                                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                        }`}
                                    >
                                        {b === "any" ? "Any" : `${b}+`}
                                    </button>
                                ))}
                            </div>

                            <div className="w-px h-6 bg-gray-200 hidden md:block" />

                            {/* Baths button group */}
                            <div className="flex items-center gap-1">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mr-1">Baths</span>
                                {["any", "1", "2", "3"].map((b) => (
                                    <button
                                        key={b}
                                        type="button"
                                        suppressHydrationWarning
                                        onClick={() => { setFilterBaths(b); pushFilters({ baths: b }); }}
                                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                                            filterBaths === b
                                                ? "bg-accent text-primary shadow-sm"
                                                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                        }`}
                                    >
                                        {b === "any" ? "Any" : `${b}+`}
                                    </button>
                                ))}
                            </div>



                            {/* More Filters toggle */}
                            <button
                                type="button"
                                suppressHydrationWarning
                                onClick={() => setShowMoreFilters(!showMoreFilters)}
                                className={`flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                                    showMoreFilters ? "bg-accent/10 text-primary" : "bg-gray-50 border border-gray-200 text-gray-500 hover:bg-gray-100"
                                }`}
                            >
                                <SlidersHorizontal size={13} />
                                More
                            </button>

                            {/* Sort */}
                            <select
                                value={sortBy}
                                suppressHydrationWarning
                                onChange={(e) => { setSortBy(e.target.value); pushFilters({ sort: e.target.value }); }}
                                className="ml-auto px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium outline-none cursor-pointer focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                            >
                                <option value="newest">Newest First</option>
                                <option value="price-asc">Price: Low → High</option>
                                <option value="price-desc">Price: High → Low</option>
                            </select>
                        </div>

                        {/* More Filters Panel */}
                        {showMoreFilters && (
                            <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-gray-100">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Category</span>
                                    <select
                                        value={filterCategory}
                                        suppressHydrationWarning
                                        onChange={(e) => { setFilterCategory(e.target.value); pushFilters({ category: e.target.value }); }}
                                        className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium outline-none cursor-pointer focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                                    >
                                        <option value="all">All</option>
                                        <option value="listing">Listings</option>
                                        <option value="project">Ardhi Safi Projects</option>
                                    </select>
                                </div>
                                <div className="relative flex-1 min-w-[200px]">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        suppressHydrationWarning
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === "Enter") pushFilters({ q: searchQuery }); }}
                                        onBlur={() => pushFilters({ q: searchQuery })}
                                        placeholder="Keyword search (title, description...)"
                                        className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-accent/20 focus:border-accent focus:outline-none transition-all"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Active filters & view toggle */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-3 flex-wrap">
                                <p className="text-sm text-text-secondary">
                                    <span className="font-bold text-primary">{pagination.totalCount}</span>{" "}
                                    {pagination.totalCount === 1 ? "property" : "properties"} found
                                </p>
                                {activeFilterCount > 0 && (
                                    <button
                                        onClick={clearFilters}
                                        className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-semibold hover:bg-red-100 transition-colors"
                                    >
                                        <X size={12} /> Clear {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""}
                                    </button>
                                )}
                            </div>
                            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                                <button
                                    suppressHydrationWarning
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
                                    suppressHydrationWarning
                                    onClick={() => setViewMode("list")}
                                    className={`p-2 rounded-md transition-colors ${
                                        viewMode === "list"
                                            ? "bg-white text-primary shadow-sm"
                                            : "text-gray-400 hover:text-gray-600"
                                    }`}
                                >
                                    <List size={16} />
                                </button>
                                <div className="w-px h-6 bg-gray-200 mx-1" />
                                <button
                                    suppressHydrationWarning
                                    onClick={() => setShowMap(!showMap)}
                                    className={`p-2 rounded-md transition-colors flex items-center gap-2 text-xs font-bold ${
                                        showMap
                                            ? "bg-accent text-primary shadow-sm"
                                            : "text-gray-400 hover:text-gray-600"
                                    }`}
                                >
                                    <MapIcon size={16} />
                                    {showMap ? "Hide Map" : "Show Map"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content: Zillow-style — Map LEFT, Cards RIGHT */}
            <div className={`flex flex-col ${showMap ? "lg:flex-row lg:h-[calc(100vh-200px)]" : ""}`}>
                {/* Map Section — sticky full height */}
                {showMap && (
                    <div
                        className="w-full lg:w-[55%] lg:sticky lg:top-0 z-10 h-[350px] lg:h-full"
                    >
                        <PropertiesMap
                            properties={properties}
                            focusLocation={mapFocus}
                            hoveredPropertyId={hoveredPropertyId}
                            searchBounds={searchBounds}
                            onPropertyHover={setHoveredPropertyId}
                            onSearchArea={(bounds) => {
                                setSearchBounds(bounds);
                                pushFilters({
                                    neLat: String(bounds.ne.lat),
                                    neLng: String(bounds.ne.lng),
                                    swLat: String(bounds.sw.lat),
                                    swLng: String(bounds.sw.lng),
                                });
                            }}
                        />
                    </div>
                )}

                {/* List Section — scrollable */}
                <div className={`flex-1 overflow-y-auto bg-surface py-6 px-4 md:px-6 ${showMap ? "" : "section-container py-16"}`}>
                    <div className={!showMap ? "section-container" : ""}>
                        {properties.length > 0 ? (
                            <div className={`grid gap-6 ${
                                !showMap 
                                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                                    : viewMode === "grid" 
                                        ? "grid-cols-1 md:grid-cols-2" 
                                        : "grid-cols-1"
                            }`}>
                                {properties.map((property, i) => (
                                    <motion.div
                                        key={property.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05, duration: 0.4 }}
                                        onMouseEnter={() => setHoveredPropertyId(property.id)}
                                        onMouseLeave={() => setHoveredPropertyId(null)}
                                    >
                                        <Link
                                            href={`/properties/${property.id}`}
                                            className={`block group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${
                                                viewMode === "list" ? "flex flex-col md:flex-row h-full md:h-64" : ""
                                            } ${hoveredPropertyId === property.id ? "ring-2 ring-accent shadow-xl -translate-y-1" : ""}`}
                                        >
                                            <div className={`relative bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden flex-shrink-0 ${
                                                viewMode === "list" ? "w-full md:w-64 h-48 md:h-full" : "h-60"
                                            }`}>
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

                                            <div className="p-6 flex-1 flex flex-col justify-between">
                                                <div>
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
                                                </div>

                                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-text-secondary">
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
                            <div className="flex items-center justify-center gap-2 mt-12 pb-8">
                                <button
                                    onClick={() => pushFilters({ page: String(pagination.page - 1) })}
                                    disabled={pagination.page <= 1}
                                    className="p-2.5 rounded-xl border border-gray-200 text-primary hover:bg-accent/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => i + 1).map((p) => (
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
                </div>
            </div>

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
