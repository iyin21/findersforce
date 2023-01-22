import { RefObject } from "react"
import { mapStyles } from "./GoogleMapStyles"

const handleGoogleMaps = (
    mapRef: RefObject<HTMLDivElement | null>,
    { lat, lng }: { lat: number; lng: number }
) => {
    const center: google.maps.LatLngLiteral = {
        lat: parseFloat(`${lat}`),
        lng: parseFloat(`${lng}`),
    }

    if (mapRef.current && window.google) {
        new window.google.maps.Map(mapRef.current, {
            center,
            zoom: 8,
            styles: mapStyles,
            backgroundColor: "#f5f5f5",
        })
    }
}

export default handleGoogleMaps
