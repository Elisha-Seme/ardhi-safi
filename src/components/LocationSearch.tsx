"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MapPin, X, Loader2 } from "lucide-react";
import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";

interface LocationSearchProps {
    value: string;
    onChange: (value: string, meta?: { county?: string; subCounty?: string; ward?: string }) => void;
    /** Fires with lat/lng and viewport bounds when a place is selected from autocomplete */
    onLocationSelect?: (coords: {
        lat: number;
        lng: number;
        label: string;
        bounds?: { ne: { lat: number; lng: number }; sw: { lat: number; lng: number } };
    }) => void;
    placeholder?: string;
    className?: string;
    variant?: "light" | "dark";
}

interface LocationResult {
    id: string;
    label: string;
    sublabel: string;
}

function LocationSearchInner({
    value,
    onChange,
    onLocationSelect,
    placeholder = "Search any area, estate, or address...",
    className = "",
    variant = "light",
}: LocationSearchProps) {
    const places = useMapsLibrary("places");
    const [query, setQuery] = useState(value);
    const [results, setResults] = useState<LocationResult[]>([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null);

    useEffect(() => { setQuery(value); }, [value]);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const searchPlaces = useCallback(
        (q: string) => {
            if (!places || !q.trim() || q.trim().length < 2) {
                setResults([]);
                setOpen(false);
                return;
            }
            clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(async () => {
                setLoading(true);
                try {
                    if (!sessionTokenRef.current) {
                        sessionTokenRef.current = new google.maps.places.AutocompleteSessionToken();
                    }
                    const service = new google.maps.places.AutocompleteService();
                    const resp = await service.getPlacePredictions({
                        input: q,
                        componentRestrictions: { country: "ke" },
                        sessionToken: sessionTokenRef.current,
                        types: ["geocode", "establishment"],
                    });
                    const mapped: LocationResult[] = (resp.predictions || []).map((p) => ({
                        id: p.place_id,
                        label: p.structured_formatting.main_text,
                        sublabel: p.structured_formatting.secondary_text || "",
                    }));
                    setResults(mapped);
                    setOpen(true);
                } catch {
                    setResults([]);
                } finally {
                    setLoading(false);
                }
            }, 300);
        },
        [places]
    );

    function handleSelect(r: LocationResult) {
        setQuery(r.label);
        onChange(r.label);
        setOpen(false);
        setActiveIndex(-1);
        // Geocode to get coordinates + viewport bounds for map
        if (onLocationSelect) {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ placeId: r.id }).then((resp) => {
                if (resp.results[0]) {
                    const geo = resp.results[0].geometry;
                    const loc = geo.location;
                    const viewport = geo.viewport;
                    onLocationSelect({
                        lat: loc.lat(),
                        lng: loc.lng(),
                        label: r.label,
                        bounds: viewport ? {
                            ne: { lat: viewport.getNorthEast().lat(), lng: viewport.getNorthEast().lng() },
                            sw: { lat: viewport.getSouthWest().lat(), lng: viewport.getSouthWest().lng() },
                        } : undefined,
                    });
                }
            }).catch(() => {});
        }
        sessionTokenRef.current = null;
    }

    function handleKeyDown(e: React.KeyboardEvent) {
        if (!open || results.length === 0) {
            if (e.key === "Enter") { onChange(query); setOpen(false); }
            return;
        }
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((i) => (i + 1) % results.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) => (i - 1 + results.length) % results.length);
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (activeIndex >= 0) handleSelect(results[activeIndex]);
            else { onChange(query); setOpen(false); }
        } else if (e.key === "Escape") {
            setOpen(false);
        }
    }

    const isDark = variant === "dark";

    return (
        <div ref={wrapperRef} className={`relative ${className}`}>
            <MapPin
                size={18}
                className={`absolute left-3 top-1/2 -translate-y-1/2 z-10 ${isDark ? "text-accent" : "text-gray-400"}`}
            />
            <input
                ref={inputRef}
                type="text"
                value={query}
                suppressHydrationWarning
                onChange={(e) => {
                    setQuery(e.target.value);
                    searchPlaces(e.target.value);
                    setActiveIndex(-1);
                }}
                onFocus={() => {
                    if (query.trim().length >= 2 && results.length) setOpen(true);
                }}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className={
                    isDark
                        ? `w-full pl-10 pr-9 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white text-sm placeholder:text-white/50 focus:border-accent focus:outline-none transition-colors`
                        : `w-full pl-12 pr-9 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent focus:outline-none transition-all`
                }
            />

            {loading ? (
                <Loader2 size={14} className={`absolute right-3 top-1/2 -translate-y-1/2 animate-spin ${isDark ? "text-white/40" : "text-gray-400"}`} />
            ) : query && (
                <button
                    type="button"
                    suppressHydrationWarning
                    onClick={() => {
                        setQuery("");
                        setResults([]);
                        onChange("");
                        inputRef.current?.focus();
                    }}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDark ? "text-white/40 hover:text-white/70" : "text-gray-400 hover:text-gray-600"}`}
                >
                    <X size={14} />
                </button>
            )}

            {open && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 max-h-72 overflow-y-auto">
                    {results.map((r, i) => (
                        <button
                            key={r.id}
                            type="button"
                            suppressHydrationWarning
                            onClick={() => handleSelect(r)}
                            className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors ${
                                i === activeIndex
                                    ? "bg-accent/10 text-primary"
                                    : "hover:bg-gray-50 text-text-secondary"
                            }`}
                        >
                            <MapPin size={14} className="text-accent flex-shrink-0" />
                            <div className="min-w-0">
                                <span className="font-medium text-primary block truncate">{r.label}</span>
                                {r.sublabel && (
                                    <span className="block text-[11px] text-text-secondary truncate">{r.sublabel}</span>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function LocationSearch(props: LocationSearchProps) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
    return (
        <APIProvider apiKey={apiKey} libraries={["places"]}>
            <LocationSearchInner {...props} />
        </APIProvider>
    );
}
