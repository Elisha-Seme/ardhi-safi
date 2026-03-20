"use client";

import { useEffect } from "react";
import { APIProvider, Map, AdvancedMarker, useMap } from "@vis.gl/react-google-maps";

function formatPrice(price: number): string {
    return new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        maximumFractionDigits: 0,
    }).format(price);
}

function POIHider() {
    const map = useMap();
    useEffect(() => {
        if (!map) return;
        (map as google.maps.Map).setOptions({
            styles: [
                { featureType: "poi", stylers: [{ visibility: "off" }] },
                { featureType: "transit", stylers: [{ visibility: "off" }] },
            ],
        });
    }, [map]);
    return null;
}

export default function PropertyLocationMap({
    latitude,
    longitude,
    title,
    price,
    transaction,
}: {
    latitude: number;
    longitude: number;
    title: string;
    price: number;
    transaction: string;
}) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
    const isSale = transaction === "sale";

    return (
        <APIProvider apiKey={apiKey}>
            <Map
                defaultCenter={{ lat: latitude, lng: longitude }}
                defaultZoom={15}
                mapId="property-detail-map"
                style={{ width: "100%", height: "100%" }}
                gestureHandling="cooperative"
                disableDefaultUI={true}
                zoomControl={true}
                mapTypeControl={false}
                streetViewControl={false}
                fullscreenControl={false}
                clickableIcons={false}
            >
                <POIHider />
                <AdvancedMarker
                    position={{ lat: latitude, lng: longitude }}
                    title={title}
                >
                    {/* Dramatic bouncy price marker */}
                    <div className="relative flex flex-col items-center animate-bounce-gentle">
                        {/* Price tag */}
                        <div className={`
                            px-5 py-3 rounded-xl font-bold text-base whitespace-nowrap
                            shadow-2xl relative z-10 border-2
                            ${isSale
                                ? "bg-primary text-white border-primary shadow-primary/40"
                                : "bg-emerald-500 text-white border-emerald-400 shadow-emerald-500/40"
                            }
                        `}>
                            {formatPrice(price)}
                            {!isSale && <span className="text-sm font-normal opacity-80 ml-1">/mo</span>}
                        </div>

                        {/* Arrow pointer */}
                        <div className={`
                            w-4 h-4 rotate-45 -mt-2.5 z-0
                            ${isSale ? "bg-primary" : "bg-emerald-500"}
                        `} />

                        {/* Pulse ring */}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                            <div className={`
                                w-8 h-8 rounded-full animate-ping opacity-25
                                ${isSale ? "bg-primary" : "bg-emerald-500"}
                            `} />
                        </div>

                        {/* Center dot */}
                        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2">
                            <div className={`
                                w-4 h-4 rounded-full border-2 border-white shadow-lg
                                ${isSale ? "bg-primary" : "bg-emerald-500"}
                            `} />
                        </div>
                    </div>
                </AdvancedMarker>
            </Map>
        </APIProvider>
    );
}
