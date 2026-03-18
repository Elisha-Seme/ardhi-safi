"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Home, Building2, BedDouble, Maximize } from "lucide-react";
import { transactionTypes } from "@/data/counties";
import LocationSearch from "@/components/LocationSearch";

interface Slide {
    id: string;
    title: string;
    subtitle: string | null;
    imageUrl: string;
    order: number;
}

export default function HomeHero({ slides }: { slides: Slide[] }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [searchCounty, setSearchCounty] = useState("");
    const [searchType, setSearchType] = useState("");
    const [searchTransaction, setSearchTransaction] = useState("");
    const router = useRouter();

    function handleSearch() {
        const params = new URLSearchParams();
        if (searchCounty) params.set("county", searchCounty);
        if (searchType) params.set("type", searchType);
        if (searchTransaction) params.set("transaction", searchTransaction);
        const query = params.toString();
        router.push(`/properties${query ? `?${query}` : ""}`);
    }

    const displaySlides = slides.length > 0 ? slides : [
        { id: "fallback-1", title: "Nairobi Skyline", subtitle: "Shelter for all. Clear titles.", imageUrl: "/hero/nairobi.jpg", order: 0 }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((curr) => (curr + 1) % displaySlides.length);
        }, 8000);
        return () => clearInterval(timer);
    }, [displaySlides.length]);

    return (
        <section className="relative h-screen min-h-[700px] flex items-center bg-black">
            {/* Animated background */}
            <div className="absolute inset-0">
                {displaySlides.map((slide, i) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
                            i === currentSlide 
                                ? "opacity-100 z-20" 
                                : i === (currentSlide - 1 + displaySlides.length) % displaySlides.length
                                    ? "opacity-100 z-10"
                                    : "opacity-0 z-0"
                        }`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/80 via-primary/60 to-transparent z-10" />
                        <div className="absolute inset-0 bg-primary/40 z-10" />
                        <Image
                            src={slide.imageUrl}
                            alt={slide.title}
                            fill
                            priority={i === 0}
                            className={`object-cover transition-transform duration-[15000ms] ease-linear ${
                                i === currentSlide || i === (currentSlide - 1 + displaySlides.length) % displaySlides.length 
                                    ? "scale-110" 
                                    : "scale-100"
                            }`}
                            sizes="100vw"
                        />
                    </div>
                ))}
                {/* Animated pattern overlay */}
                <div className="absolute inset-0 opacity-5 z-20">
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 2px 2px, rgba(184,155,94,0.3) 1px, transparent 0)",
                            backgroundSize: "40px 40px",
                        }}
                    />
                </div>
            </div>

            <div className="relative z-30 section-container w-full">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <p className="text-accent text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-medium drop-shadow-md">
                            Licensed by EARB Kenya
                        </p>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading text-white mb-6 leading-tight drop-shadow-xl">
                            Find Your Perfect{" "}
                            <span className="gradient-text">Property</span> in Kenya
                        </h1>
                        <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 drop-shadow-md">
                            {displaySlides[currentSlide].subtitle}
                        </p>
                    </motion.div>

                    {/* Search Engine */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/15 p-4 md:p-6 shadow-2xl"
                    >
                        <div className="space-y-4">
                            {/* Row 1: Location + Buy/Rent + Search */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <LocationSearch
                                    value={searchCounty}
                                    onChange={(val) => setSearchCounty(val)}
                                    placeholder="Search location..."
                                    variant="dark"
                                />
                                <div className="relative">
                                    <Building2 size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" />
                                    <select
                                        value={searchTransaction}
                                        suppressHydrationWarning
                                        onChange={(e) => setSearchTransaction(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white text-sm appearance-none focus:border-accent focus:outline-none transition-colors [&>option]:text-black"
                                    >
                                        <option value="">Buy or Rent</option>
                                        {transactionTypes.map((t) => (
                                            <option key={t.value} value={t.value}>{t.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <button 
                                    onClick={handleSearch} 
                                    type="button" 
                                    suppressHydrationWarning
                                    className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-primary font-semibold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-accent/30 text-sm"
                                >
                                    <Search size={18} />
                                    Search Properties
                                </button>
                            </div>

                            {/* Row 2: Property Type Toggle */}
                            <div className="flex flex-wrap justify-center gap-2">
                                {[
                                    { value: "", label: "All", icon: Home },
                                    { value: "residential", label: "Residential", icon: BedDouble },
                                    { value: "commercial", label: "Commercial", icon: Building2 },
                                    { value: "land", label: "Land", icon: Maximize },
                                ].map((t) => (
                                    <button
                                        key={t.value}
                                        type="button"
                                        suppressHydrationWarning
                                        onClick={() => setSearchType(t.value)}
                                        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                                            searchType === t.value
                                                ? "bg-accent text-primary shadow-lg shadow-accent/30"
                                                : "bg-white/10 text-white/70 hover:bg-white/20 border border-white/10"
                                        }`}
                                    >
                                        <t.icon size={14} />
                                        {t.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Slide indicators */}
                    <div className="flex justify-center gap-2 mt-8">
                        {displaySlides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentSlide(i)}
                                suppressHydrationWarning
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentSlide ? "w-8 bg-accent" : "bg-white/30 hover:bg-white/50"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
