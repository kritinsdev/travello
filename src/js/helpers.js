export const createDirectionsLink = (currentLocLat, currentLocLng, place) => {
    return `https://www.google.com/maps/dir/?api=1&origin=${currentLocLat},${currentLocLng}&destination=${place.geometry.location.lat},${place.geometry.location.lng}&travelmode=driving`;
}