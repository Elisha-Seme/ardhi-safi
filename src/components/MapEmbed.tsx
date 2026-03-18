"use client";

import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

const LAT = -1.3019660481003512;
const LNG = 36.82220056855264;

export default function MapEmbed() {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

    return (
        <APIProvider apiKey={apiKey}>
            <Map
                defaultCenter={{ lat: LAT, lng: LNG }}
                defaultZoom={16}
                mapId="contact-map"
                style={{ width: "100%", height: "100%" }}
                gestureHandling="cooperative"
                disableDefaultUI={true}
                zoomControl={true}
            >
                <AdvancedMarker
                    position={{ lat: LAT, lng: LNG }}
                    title="Ardhi Safi Limited — B2-06, Manga House, Kiambere Road, Upper Hill, Nairobi"
                />
            </Map>
        </APIProvider>
    );
}
