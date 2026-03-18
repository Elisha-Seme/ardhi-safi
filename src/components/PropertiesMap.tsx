"use client";

import { useCallback, useState, useEffect } from "react";
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

interface Property {
    id: string;
    title: string;
    location: string;
    price: number;
    transaction: string;
    imageUrl: string | null;
    latitude: number | null;
    longitude: number | null;
}

function formatPrice(price: number): string {
    return new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        maximumFractionDigits: 0,
    }).format(price);
}

function PropertyMarker({ property }: { property: Property }) {
    const [markerRef, marker] = useAdvancedMarkerRef();
    const [infoOpen, setInfoOpen] = useState(false);

    return (
        <>
            <AdvancedMarker
                ref={markerRef}
                position={{ lat: property.latitude!, lng: property.longitude! }}
                title={property.title}
                onClick={() => setInfoOpen(true)}
            />
            {infoOpen && (
                <InfoWindow anchor={marker} onCloseClick={() => setInfoOpen(false)} maxWidth={220}>
                    <div className="flex flex-col gap-2 p-1">
                        {property.imageUrl && (
                            <div className="relative h-24 w-full rounded-lg overflow-hidden">
                                <Image
                                    src={property.imageUrl}
                                    alt={property.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div>
                            <h4 className="font-heading text-primary font-bold text-sm leading-tight line-clamp-1">
                                {property.title}
                            </h4>
                            <p className="text-[10px] text-text-secondary mt-0.5">{property.location}</p>
                            <div className="flex items-center justify-between mt-1">
                                <span className="text-xs font-bold text-accent">
                                    {formatPrice(property.price)}
                                </span>
                                <Link
                                    href={`/properties/${property.id}`}
                                    className="text-[10px] font-bold text-primary hover:underline hover:text-accent transition-colors"
                                >
                                    View Details →
                                </Link>
                            </div>
                        </div>
                    </div>
                </InfoWindow>
            )}
        </>
    );
}

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

export default function PropertiesMap({ properties, focusLocation }: { properties: Property[]; focusLocation?: { lat: number; lng: number } | null }) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
    const validProperties = properties.filter((p) => p.latitude && p.longitude);

    // Calculate bounds
    let defaultCenter = { lat: -1.2921, lng: 36.8219 }; // Nairobi
    let defaultZoom = 12;

    if (validProperties.length === 1) {
        defaultCenter = {
            lat: validProperties[0].latitude!,
            lng: validProperties[0].longitude!,
        };
        defaultZoom = 15;
    } else if (validProperties.length > 1) {
        const lats = validProperties.map((p) => p.latitude!);
        const lngs = validProperties.map((p) => p.longitude!);
        defaultCenter = {
            lat: (Math.min(...lats) + Math.max(...lats)) / 2,
            lng: (Math.min(...lngs) + Math.max(...lngs)) / 2,
        };
        const latDiff = Math.max(...lats) - Math.min(...lats);
        const lngDiff = Math.max(...lngs) - Math.min(...lngs);
        const maxDiff = Math.max(latDiff, lngDiff);
        if (maxDiff > 5) defaultZoom = 7;
        else if (maxDiff > 2) defaultZoom = 8;
        else if (maxDiff > 1) defaultZoom = 9;
        else if (maxDiff > 0.3) defaultZoom = 11;
        else defaultZoom = 13;
    }

    return (
        <APIProvider apiKey={apiKey}>
            <Map
                defaultCenter={defaultCenter}
                defaultZoom={defaultZoom}
                mapId="properties-map"
                style={{ width: "100%", height: "100%" }}
                gestureHandling="greedy"
                disableDefaultUI={false}
                zoomControl={true}
                mapTypeControl={false}
                streetViewControl={false}
                fullscreenControl={true}
            >
                {validProperties.map((property) => (
                    <PropertyMarker key={property.id} property={property} />
                ))}
                <MapFocusHandler location={focusLocation || null} />
            </Map>
        </APIProvider>
    );
}
