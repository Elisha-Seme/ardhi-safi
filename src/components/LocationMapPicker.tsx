"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    useMap,
    useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { Search, MapPin, X, Loader2, Navigation } from "lucide-react";

interface LatLng { lat: number; lng: number }

interface Props {
    latitude: string;
    longitude: string;
    onChange: (lat: string, lng: string) => void;
}

interface PlaceResult {
    placeId: string;
    label: string;
    sublabel: string;
    lat: number;
    lng: number;
}

function MapClickHandler({ onPick }: { onPick: (ll: LatLng) => void }) {
    const map = useMap();
    useEffect(() => {
        if (!map) return;
        const listener = map.addListener("click", (e: google.maps.MapMouseEvent) => {
            if (e.latLng) {
                onPick({ lat: e.latLng.lat(), lng: e.latLng.lng() });
            }
        });
        return () => listener.remove();
    }, [map, onPick]);
    return null;
}

function PlacesAutocomplete({
    onSelect,
}: {
    onSelect: (result: PlaceResult) => void;
}) {
    const places = useMapsLibrary("places");
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<PlaceResult[]>([]);
    const [searching, setSearching] = useState(false);
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const search = useCallback(
        (q: string) => {
            if (!places || !q.trim() || q.trim().length < 2) {
                setResults([]);
                setOpen(false);
                return;
            }
            clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(async () => {
                setSearching(true);
                try {
                    if (!sessionTokenRef.current) {
                        sessionTokenRef.current = new google.maps.places.AutocompleteSessionToken();
                    }
                    const service = new google.maps.places.AutocompleteService();
                    const resp = await service.getPlacePredictions({
                        input: q,
                        componentRestrictions: { country: "ke" },
                        sessionToken: sessionTokenRef.current,
                    });
                    const mapped: PlaceResult[] = (resp.predictions || []).map((p) => ({
                        placeId: p.place_id,
                        label: p.structured_formatting.main_text,
                        sublabel: p.structured_formatting.secondary_text || "",
                        lat: 0,
                        lng: 0,
                    }));
                    setResults(mapped);
                    setOpen(true);
                } catch {
                    setResults([]);
                } finally {
                    setSearching(false);
                }
            }, 300);
        },
        [places]
    );

    const handleSelect = useCallback(
        async (r: PlaceResult) => {
            if (!places) return;
            // Get place details (geocode)
            const geocoder = new google.maps.Geocoder();
            try {
                const resp = await geocoder.geocode({ placeId: r.placeId });
                if (resp.results[0]) {
                    const loc = resp.results[0].geometry.location;
                    onSelect({
                        ...r,
                        lat: loc.lat(),
                        lng: loc.lng(),
                    });
                }
            } catch {
                onSelect(r);
            }
            setQuery(r.label);
            setOpen(false);
            sessionTokenRef.current = null; // Reset session after selection
        },
        [places, onSelect]
    );

    return (
        <div ref={wrapperRef} className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
            <input
                type="text"
                value={query}
                placeholder="Search streets, buildings, estates..."
                onChange={(e) => {
                    setQuery(e.target.value);
                    search(e.target.value);
                }}
                onFocus={() => { if (results.length) setOpen(true); }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        e.stopPropagation();
                        if (open && results.length > 0) handleSelect(results[0]);
                    } else if (e.key === "Escape") {
                        setOpen(false);
                    }
                }}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all"
            />
            {searching && (
                <Loader2 size={14} className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-slate-400" />
            )}

            {open && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-[1000] max-h-56 overflow-y-auto">
                    {results.map((r) => (
                        <button
                            key={r.placeId}
                            type="button"
                            onClick={() => handleSelect(r)}
                            className="w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-accent/5 transition-colors border-b border-slate-50 last:border-0"
                        >
                            <MapPin size={13} className="text-accent flex-shrink-0" />
                            <div>
                                <p className="text-sm text-primary font-medium leading-tight line-clamp-1">
                                    {r.label}
                                </p>
                                <p className="text-[10px] text-slate-400 line-clamp-1">{r.sublabel}</p>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

function MapInner({ latitude, longitude, onChange }: Props) {
    const [marker, setMarker] = useState<LatLng | null>(() => {
        const lat = parseFloat(latitude);
        const lng = parseFloat(longitude);
        return !isNaN(lat) && !isNaN(lng) ? { lat, lng } : null;
    });
    const map = useMap();

    const handlePick = useCallback(
        (ll: LatLng) => {
            setMarker(ll);
            onChange(ll.lat.toFixed(6), ll.lng.toFixed(6));
        },
        [onChange]
    );

    const handlePlaceSelect = useCallback(
        (r: PlaceResult) => {
            if (r.lat && r.lng) {
                const ll = { lat: r.lat, lng: r.lng };
                setMarker(ll);
                onChange(ll.lat.toFixed(6), ll.lng.toFixed(6));
                map?.panTo(ll);
                map?.setZoom(16);
            }
        },
        [map, onChange]
    );

    const locateMe = () => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition((pos) => {
            const ll = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            setMarker(ll);
            onChange(ll.lat.toFixed(6), ll.lng.toFixed(6));
            map?.panTo(ll);
            map?.setZoom(16);
        });
    };

    const clearPin = () => {
        setMarker(null);
        onChange("", "");
    };

    const defaultCenter = marker || { lat: -1.2921, lng: 36.8219 };

    return (
        <div className="space-y-3">
            {/* Search bar */}
            <div className="flex gap-2">
                <PlacesAutocomplete onSelect={handlePlaceSelect} />
                <button
                    type="button"
                    onClick={locateMe}
                    title="Use my current location"
                    className="flex items-center gap-1.5 px-3 py-2.5 bg-accent/10 hover:bg-accent/20 text-primary rounded-xl transition-all text-xs font-semibold whitespace-nowrap border border-accent/20"
                >
                    <Navigation size={13} />
                    My Location
                </button>
            </div>

            {/* Map container */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm" style={{ height: 380 }}>
                <Map
                    defaultCenter={defaultCenter}
                    defaultZoom={marker ? 15 : 12}
                    mapId="location-picker-map"
                    style={{ width: "100%", height: "100%" }}
                    gestureHandling="greedy"
                    disableDefaultUI={false}
                    zoomControl={true}
                    mapTypeControl={false}
                    streetViewControl={false}
                    fullscreenControl={true}
                >
                    <MapClickHandler onPick={handlePick} />
                    {marker && (
                        <AdvancedMarker position={marker} />
                    )}
                </Map>

                {/* Overlay hint */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[500] pointer-events-none">
                    <div className="bg-primary/80 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                        <MapPin size={11} />
                        Click anywhere on the map to drop a pin
                    </div>
                </div>
            </div>

            {/* Coordinate readout + clear */}
            {marker ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-mono text-emerald-700">
                            {marker.lat.toFixed(6)}, {marker.lng.toFixed(6)}
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={clearPin}
                        className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors"
                    >
                        <X size={12} />
                        Clear pin
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5">
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                    <span className="text-xs text-slate-400">No location selected — search or click on the map</span>
                </div>
            )}
        </div>
    );
}

export default function LocationMapPicker(props: Props) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
    return (
        <APIProvider apiKey={apiKey} libraries={["places"]}>
            <MapInner {...props} />
        </APIProvider>
    );
}
