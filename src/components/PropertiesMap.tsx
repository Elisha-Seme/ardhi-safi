"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    InfoWindow,
    useAdvancedMarkerRef,
    useMap,
} from "@vis.gl/react-google-maps";
import Link from "next/link";
import Image from "next/image";
import { BedDouble, Bath, Maximize, ChevronRight, Search, MapPin } from "lucide-react";

interface Property {
    id: string;
    title: string;
    location: string;
    price: number;
    transaction: string;
    type: string;
    imageUrl: string | null;
    latitude: number | null;
    longitude: number | null;
    bedrooms?: number | null;
    bathrooms?: number | null;
    area?: number;
    areaUnit?: string;
}

interface MapBounds {
    ne: { lat: number; lng: number };
    sw: { lat: number; lng: number };
}

function formatPrice(price: number): string {
    if (price >= 1_000_000) {
        return `${(price / 1_000_000).toFixed(price % 1_000_000 === 0 ? 0 : 1)}M`;
    }
    if (price >= 1_000) {
        return `${(price / 1_000).toFixed(0)}K`;
    }
    return price.toLocaleString();
}

function formatPriceFull(price: number): string {
    return new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        maximumFractionDigits: 0,
    }).format(price);
}

// --- Price Tag Marker ---
function PriceMarker({
    property,
    isHovered,
    isSelected,
    onHover,
    onSelect,
}: {
    property: Property;
    isHovered: boolean;
    isSelected: boolean;
    onHover: (id: string | null) => void;
    onSelect: (id: string | null) => void;
}) {
    const [markerRef, marker] = useAdvancedMarkerRef();
    const isSale = property.transaction === "sale";

    return (
        <>
            <AdvancedMarker
                ref={markerRef}
                position={{ lat: property.latitude!, lng: property.longitude! }}
                title={property.title}
                onClick={() => onSelect(isSelected ? null : property.id)}
                zIndex={isHovered || isSelected ? 999 : 1}
            >
                <div
                    onMouseEnter={() => onHover(property.id)}
                    onMouseLeave={() => onHover(null)}
                    className="flex flex-col items-center cursor-pointer select-none"
                    style={{ transform: isHovered || isSelected ? "scale(1.2)" : "scale(1)", transition: "transform 0.15s" }}
                >
                    {/* Shiny gold location pin */}
                    <div className="animate-bounce-gentle">
                        <div className="relative">
                            <MapPin
                                size={22}
                                fill="url(#gold-gradient)"
                                stroke="#92600a"
                                strokeWidth={1.5}
                                className="drop-shadow-lg"
                            />
                            <div className="absolute inset-0 animate-gold-shimmer rounded-full pointer-events-none" />
                        </div>
                    </div>
                    {/* Price tag */}
                    <div className={`
                        -mt-1 px-2 py-1 rounded-md font-bold text-[11px] whitespace-nowrap
                        transition-all duration-150 border
                        ${isHovered || isSelected
                            ? "bg-primary text-white border-primary shadow-xl"
                            : isSale
                                ? "bg-white text-gray-900 border-gray-300 shadow-md"
                                : "bg-emerald-500 text-white border-emerald-400 shadow-md"
                        }
                    `}>
                        KES {formatPrice(property.price)}
                        {!isSale && <span className="text-[9px] font-normal opacity-80">/mo</span>}
                    </div>
                    {/* Arrow pointer below price */}
                    <div className={`
                        w-2 h-2 rotate-45 -mt-1 z-0
                        ${isHovered || isSelected
                            ? "bg-primary"
                            : isSale ? "bg-white border-r border-b border-gray-300" : "bg-emerald-500"
                        }
                    `} />
                </div>
            </AdvancedMarker>

            {isSelected && marker && (
                <InfoWindow anchor={marker} onCloseClick={() => onSelect(null)} maxWidth={280}>
                    <Link href={`/properties/${property.id}`} className="block group">
                        <div className="flex flex-col gap-2 p-0.5">
                            {property.imageUrl && (
                                <div className="relative h-36 w-full rounded-lg overflow-hidden">
                                    <Image src={property.imageUrl} alt={property.title} fill className="object-cover" />
                                    <div className="absolute top-2 left-2">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                            isSale ? "bg-amber-400 text-gray-900" : "bg-emerald-500 text-white"
                                        }`}>
                                            {isSale ? "For Sale" : "For Rent"}
                                        </span>
                                    </div>
                                </div>
                            )}
                            <div>
                                <p className="font-bold text-gray-900 text-base">
                                    {formatPriceFull(property.price)}
                                    {!isSale && <span className="text-xs font-normal text-gray-500">/mo</span>}
                                </p>
                                <h4 className="font-semibold text-gray-900 text-xs leading-tight line-clamp-1 mt-0.5">
                                    {property.title}
                                </h4>
                                <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">{property.location}</p>
                                <div className="flex items-center gap-3 mt-1.5 text-[11px] text-gray-500">
                                    {property.bedrooms && <span className="flex items-center gap-0.5"><BedDouble size={11} /> {property.bedrooms} bd</span>}
                                    {property.bathrooms && <span className="flex items-center gap-0.5"><Bath size={11} /> {property.bathrooms} ba</span>}
                                    {property.area && <span className="flex items-center gap-0.5"><Maximize size={11} /> {property.area.toLocaleString()} {property.areaUnit}</span>}
                                </div>
                                <div className="flex items-center gap-1 mt-2 text-[11px] font-bold text-blue-600">
                                    View Details <ChevronRight size={11} />
                                </div>
                            </div>
                        </div>
                    </Link>
                </InfoWindow>
            )}
        </>
    );
}

// --- Boundary Rectangle Drawer ---
function BoundaryDrawer({ bounds }: { bounds: MapBounds | null }) {
    const map = useMap();
    const rectRef = useRef<google.maps.Rectangle | null>(null);

    useEffect(() => {
        if (!map) return;

        // Remove previous rectangle
        if (rectRef.current) {
            rectRef.current.setMap(null);
            rectRef.current = null;
        }

        if (!bounds) return;

        const rect = new google.maps.Rectangle({
            bounds: {
                north: bounds.ne.lat,
                south: bounds.sw.lat,
                east: bounds.ne.lng,
                west: bounds.sw.lng,
            },
            map,
            strokeColor: "#1D3C34",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#1D3C34",
            fillOpacity: 0.08,
            clickable: false,
        });
        rectRef.current = rect;

        // Fit map to bounds
        const gBounds = new google.maps.LatLngBounds(
            { lat: bounds.sw.lat, lng: bounds.sw.lng },
            { lat: bounds.ne.lat, lng: bounds.ne.lng }
        );
        map.fitBounds(gBounds, 40);

        return () => {
            rect.setMap(null);
        };
    }, [map, bounds]);

    return null;
}

// --- Map Movement Detector ---
function MapMoveDetector({
    onBoundsChanged,
    searchBounds,
}: {
    onBoundsChanged: (bounds: MapBounds) => void;
    searchBounds: MapBounds | null;
}) {
    const map = useMap();
    const [showSearchButton, setShowSearchButton] = useState(false);
    const initialLoadRef = useRef(true);
    const currentBoundsRef = useRef<MapBounds | null>(null);

    useEffect(() => {
        if (!map) return;

        const listener = map.addListener("idle", () => {
            const b = map.getBounds();
            if (!b) return;

            const ne = b.getNorthEast();
            const sw = b.getSouthWest();
            const newBounds: MapBounds = {
                ne: { lat: ne.lat(), lng: ne.lng() },
                sw: { lat: sw.lat(), lng: sw.lng() },
            };
            currentBoundsRef.current = newBounds;

            // Don't show button on initial load or after a search
            if (initialLoadRef.current) {
                initialLoadRef.current = false;
                return;
            }

            setShowSearchButton(true);
        });

        return () => google.maps.event.removeListener(listener);
    }, [map]);

    // Reset when search bounds change (user did a new search)
    useEffect(() => {
        initialLoadRef.current = true;
        setShowSearchButton(false);
    }, [searchBounds]);

    if (!showSearchButton) return null;

    return (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
            <button
                onClick={() => {
                    if (currentBoundsRef.current) {
                        onBoundsChanged(currentBoundsRef.current);
                        setShowSearchButton(false);
                    }
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 font-semibold text-sm rounded-full shadow-xl border border-gray-200 hover:bg-gray-50 transition-all hover:shadow-2xl"
            >
                <Search size={14} />
                Search this area
            </button>
        </div>
    );
}

// --- POI Hider — hides all non-property markers ---
function POIHider() {
    const map = useMap();
    useEffect(() => {
        if (!map) return;
        // Hide POI labels and icons via map feature layer (works without Cloud styling)
        try {
            const style = [
                { featureType: "poi", stylers: [{ visibility: "off" }] },
                { featureType: "poi.business", stylers: [{ visibility: "off" }] },
                { featureType: "poi.government", stylers: [{ visibility: "off" }] },
                { featureType: "poi.medical", stylers: [{ visibility: "off" }] },
                { featureType: "poi.school", stylers: [{ visibility: "off" }] },
                { featureType: "poi.sports_complex", stylers: [{ visibility: "off" }] },
                { featureType: "poi.place_of_worship", stylers: [{ visibility: "off" }] },
                { featureType: "transit", stylers: [{ visibility: "off" }] },
            ];
            (map as google.maps.Map).setOptions({ styles: style });
        } catch {
            // Cloud-styled maps may ignore this, which is fine
        }
    }, [map]);
    return null;
}

// --- Focus Handler ---
function MapFocusHandler({ location }: { location: { lat: number; lng: number } | null }) {
    const map = useMap();
    useEffect(() => {
        if (map && location) {
            map.panTo(location);
            map.setZoom(14);
        }
    }, [map, location]);
    return null;
}

// --- Main Map Component ---
export default function PropertiesMap({
    properties,
    focusLocation,
    hoveredPropertyId,
    searchBounds,
    onPropertyHover,
    onPropertySelect,
    onSearchArea,
}: {
    properties: Property[];
    focusLocation?: { lat: number; lng: number } | null;
    hoveredPropertyId?: string | null;
    searchBounds?: MapBounds | null;
    onPropertyHover?: (id: string | null) => void;
    onPropertySelect?: (id: string | null) => void;
    onSearchArea?: (bounds: MapBounds) => void;
}) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
    const validProperties = properties.filter((p) => p.latitude && p.longitude);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleHover = useCallback((id: string | null) => {
        onPropertyHover?.(id);
    }, [onPropertyHover]);

    const handleSelect = useCallback((id: string | null) => {
        setSelectedId(id);
        onPropertySelect?.(id);
    }, [onPropertySelect]);

    const handleSearchArea = useCallback((bounds: MapBounds) => {
        onSearchArea?.(bounds);
    }, [onSearchArea]);

    // Calculate default center/zoom
    let defaultCenter = { lat: -1.2921, lng: 36.8219 };
    let defaultZoom = 12;

    if (searchBounds) {
        defaultCenter = {
            lat: (searchBounds.ne.lat + searchBounds.sw.lat) / 2,
            lng: (searchBounds.ne.lng + searchBounds.sw.lng) / 2,
        };
    } else if (validProperties.length === 1) {
        defaultCenter = { lat: validProperties[0].latitude!, lng: validProperties[0].longitude! };
        defaultZoom = 15;
    } else if (validProperties.length > 1) {
        const lats = validProperties.map((p) => p.latitude!);
        const lngs = validProperties.map((p) => p.longitude!);
        defaultCenter = {
            lat: (Math.min(...lats) + Math.max(...lats)) / 2,
            lng: (Math.min(...lngs) + Math.max(...lngs)) / 2,
        };
        const maxDiff = Math.max(Math.max(...lats) - Math.min(...lats), Math.max(...lngs) - Math.min(...lngs));
        if (maxDiff > 5) defaultZoom = 7;
        else if (maxDiff > 2) defaultZoom = 8;
        else if (maxDiff > 1) defaultZoom = 9;
        else if (maxDiff > 0.3) defaultZoom = 11;
        else defaultZoom = 13;
    }

    return (
        <APIProvider apiKey={apiKey}>
            <div className="relative w-full h-full">
                {/* Gold gradient for map pin icons — defined once, referenced by all markers */}
                <svg width="0" height="0" className="absolute">
                    <defs>
                        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ffd700" />
                            <stop offset="30%" stopColor="#ffec80" />
                            <stop offset="50%" stopColor="#ffd700" />
                            <stop offset="70%" stopColor="#daa520" />
                            <stop offset="100%" stopColor="#b8860b" />
                        </linearGradient>
                    </defs>
                </svg>
                <Map
                    defaultCenter={defaultCenter}
                    defaultZoom={defaultZoom}
                    mapId="properties-map"
                    style={{ width: "100%", height: "100%" }}
                    gestureHandling="greedy"
                    disableDefaultUI={true}
                    zoomControl={true}
                    mapTypeControl={false}
                    streetViewControl={false}
                    fullscreenControl={false}
                    clickableIcons={false}
                    colorScheme="LIGHT"
                >
                    <POIHider />
                    {validProperties.map((property) => (
                        <PriceMarker
                            key={property.id}
                            property={property}
                            isHovered={hoveredPropertyId === property.id}
                            isSelected={selectedId === property.id}
                            onHover={handleHover}
                            onSelect={handleSelect}
                        />
                    ))}
                    <BoundaryDrawer bounds={searchBounds || null} />
                    <MapMoveDetector
                        onBoundsChanged={handleSearchArea}
                        searchBounds={searchBounds || null}
                    />
                    {!searchBounds && <MapFocusHandler location={focusLocation || null} />}
                </Map>

                {/* Property count overlay */}
                <div className="absolute bottom-4 left-4 z-20">
                    <div className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md border border-gray-200">
                        {validProperties.length} {validProperties.length === 1 ? "property" : "properties"} on map
                    </div>
                </div>
            </div>
        </APIProvider>
    );
}
