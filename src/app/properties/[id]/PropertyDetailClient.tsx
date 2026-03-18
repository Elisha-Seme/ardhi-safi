"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    MapPin,
    BedDouble,
    Bath,
    Maximize,
    Building2,
    ChevronRight,
    ArrowLeft,
    Phone,
    Mail,
    Tag,
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

export default function PropertyDetailClient({
    property,
    similarProperties,
}: {
    property: Property;
    similarProperties: Property[];
}) {
    return (
        <div className="overflow-hidden">
            {/* Hero with Image */}
            <section className="relative h-[50vh] md:h-[60vh] bg-primary overflow-hidden">
                {property.imageUrl ? (
                    <Image
                        src={property.imageUrl}
                        alt={property.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark">
                        <Building2 size={80} className="text-white/10" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Back button */}
                <div className="absolute top-28 left-0 right-0 z-20">
                    <div className="section-container">
                        <Link
                            href="/properties"
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors backdrop-blur-md bg-white/10 px-4 py-2 rounded-full"
                        >
                            <ArrowLeft size={16} /> All Properties
                        </Link>
                    </div>
                </div>

                {/* Property title overlay */}
                <div className="absolute bottom-0 left-0 right-0 z-20">
                    <div className="section-container pb-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md ${
                                        property.transaction === "sale"
                                            ? "bg-accent/90 text-primary"
                                            : "bg-emerald-500/90 text-white"
                                    }`}
                                >
                                    {property.transaction === "sale" ? "For Sale" : "For Rent"}
                                </span>
                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-md capitalize">
                                    {property.type}
                                </span>
                                {property.featured && (
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-accent text-primary">
                                        Featured
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl md:text-5xl font-heading text-white mb-2 drop-shadow-lg">
                                {property.title}
                            </h1>
                            <p className="text-white/80 flex items-center gap-2 text-sm">
                                <MapPin size={16} className="text-accent" />
                                {property.location}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-12 bg-surface">
                <div className="section-container">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Main content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Price & Quick Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-2xl shadow-md p-6 md:p-8"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
                                    <div>
                                        <p className="text-text-secondary text-xs uppercase tracking-wider font-bold mb-1">
                                            {property.transaction === "sale" ? "Asking Price" : "Monthly Rent"}
                                        </p>
                                        <p className="text-3xl md:text-4xl font-heading text-primary">
                                            {formatPrice(property.price)}
                                            {property.transaction === "rent" && (
                                                <span className="text-lg text-text-secondary font-normal">/mo</span>
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {property.bedrooms != null && (
                                        <div className="flex items-center gap-3 p-3 bg-surface rounded-xl">
                                            <BedDouble size={20} className="text-accent" />
                                            <div>
                                                <p className="text-xs text-text-secondary">Bedrooms</p>
                                                <p className="font-bold text-primary">{property.bedrooms}</p>
                                            </div>
                                        </div>
                                    )}
                                    {property.bathrooms != null && (
                                        <div className="flex items-center gap-3 p-3 bg-surface rounded-xl">
                                            <Bath size={20} className="text-accent" />
                                            <div>
                                                <p className="text-xs text-text-secondary">Bathrooms</p>
                                                <p className="font-bold text-primary">{property.bathrooms}</p>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3 p-3 bg-surface rounded-xl">
                                        <Maximize size={20} className="text-accent" />
                                        <div>
                                            <p className="text-xs text-text-secondary">Area</p>
                                            <p className="font-bold text-primary">
                                                {property.area.toLocaleString()} {property.areaUnit}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-surface rounded-xl">
                                        <Tag size={20} className="text-accent" />
                                        <div>
                                            <p className="text-xs text-text-secondary">Type</p>
                                            <p className="font-bold text-primary capitalize">{property.type}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Description */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-2xl shadow-md p-6 md:p-8"
                            >
                                <h2 className="text-xl font-heading text-primary mb-4">About This Property</h2>
                                <div className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
                                    {property.description}
                                </div>
                            </motion.div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Contact CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white rounded-2xl shadow-md p-6 md:p-8 sticky top-28"
                            >
                                <h3 className="text-lg font-heading text-primary mb-2">
                                    Interested in this property?
                                </h3>
                                <p className="text-text-secondary text-sm mb-6">
                                    Get in touch with our team for more details, to schedule a viewing, or to make an offer.
                                </p>

                                <div className="space-y-3">
                                    <Link
                                        href={`/contact?property=${encodeURIComponent(property.title)}&type=${property.type}&transaction=${property.transaction}`}
                                        className="flex items-center justify-center gap-2 w-full py-3.5 bg-accent hover:bg-accent-dark text-primary font-semibold rounded-xl transition-all text-sm shadow-lg shadow-accent/20"
                                    >
                                        <Mail size={16} /> Send Inquiry
                                    </Link>
                                    <a
                                        href="tel:+254780999100"
                                        className="flex items-center justify-center gap-2 w-full py-3.5 border border-gray-200 text-primary font-semibold rounded-xl hover:bg-gray-50 transition-all text-sm"
                                    >
                                        <Phone size={16} /> +254 780 999 100
                                    </a>
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <p className="text-[10px] text-text-secondary uppercase tracking-widest font-bold mb-2">
                                        Property Reference
                                    </p>
                                    <p className="text-xs text-text-secondary font-mono">{property.id}</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Similar Properties */}
            {similarProperties.length > 0 && (
                <section className="py-16 bg-white">
                    <div className="section-container">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-heading text-primary">
                                    Similar <span className="gradient-text">Properties</span>
                                </h2>
                                <p className="text-text-secondary text-sm mt-1">
                                    You might also be interested in these listings.
                                </p>
                            </div>
                            <Link
                                href="/properties"
                                className="hidden md:flex items-center gap-1 text-accent text-sm font-semibold hover:underline"
                            >
                                View All <ChevronRight size={14} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {similarProperties.map((p, i) => (
                                <motion.div
                                    key={p.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.4 }}
                                >
                                    <Link
                                        href={`/properties/${p.id}`}
                                        className="block group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                                    >
                                        <div className="relative h-52 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                                            {p.imageUrl ? (
                                                <Image
                                                    src={p.imageUrl}
                                                    alt={p.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Building2 size={40} className="text-primary/20" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                            <div className="absolute top-3 left-3 z-10">
                                                <span
                                                    className={`px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-md ${
                                                        p.transaction === "sale"
                                                            ? "bg-accent/90 text-primary"
                                                            : "bg-emerald-500/90 text-white"
                                                    }`}
                                                >
                                                    {p.transaction === "sale" ? "For Sale" : "For Rent"}
                                                </span>
                                            </div>
                                            <div className="absolute bottom-3 left-3 z-10">
                                                <p className="text-white font-bold text-lg drop-shadow-md">
                                                    {formatPrice(p.price)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-heading text-primary mb-1 group-hover:text-accent transition-colors line-clamp-1">
                                                {p.title}
                                            </h3>
                                            <p className="text-text-secondary text-xs flex items-center gap-1 mb-3">
                                                <MapPin size={12} className="text-accent" />
                                                {p.location}
                                            </p>
                                            <div className="flex gap-3 text-xs text-text-secondary">
                                                {p.bedrooms != null && (
                                                    <span className="flex items-center gap-1">
                                                        <BedDouble size={12} className="text-accent" /> {p.bedrooms} Beds
                                                    </span>
                                                )}
                                                {p.bathrooms != null && (
                                                    <span className="flex items-center gap-1">
                                                        <Bath size={12} className="text-accent" /> {p.bathrooms} Baths
                                                    </span>
                                                )}
                                                <span className="flex items-center gap-1">
                                                    <Maximize size={12} className="text-accent" />
                                                    {p.area.toLocaleString()} {p.areaUnit}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
