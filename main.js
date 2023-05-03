import mapboxgl from "mapbox-gl";

class App {
    constructor() {
        this.currentLocationLat = null;
        this.currentLocationLng = null;
        this.token = 'pk.eyJ1Ijoia3JpdGluc2RldiIsImEiOiJjbGg2bTFxaGMwN2IyM2Vyb3Jrcjk2aHZoIn0.uRk6fvC2fOvRIX_SypSxbQ';

        mapboxgl.accessToken = this.token;

        this.initApp();
    }

    initMap() {
        this.map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/kritinsdev/clh6ok83a00s101quf9jk49sx', // style URL
            center: [this.currentLocationLng, this.currentLocationLat], // starting position [lng, lat]
            zoom: 15, // starting zoom
        });

        // Create a red marker for the user's current location
        const userMarkerElement = document.createElement("div");
        userMarkerElement.className = "marker";
        userMarkerElement.style.width = "20px";
        userMarkerElement.style.height = "20px";
        userMarkerElement.style.borderRadius = "50%";
        userMarkerElement.style.backgroundColor = "red";

        // Add the marker to the map
        const userMarker = new mapboxgl.Marker(userMarkerElement)
            .setLngLat([this.currentLocationLng, this.currentLocationLat])
            .addTo(this.map);

        this.map.on("load", () => {
            this.loadMarkers();
        });
    }

    async loadMarkers() {
        try {
            const response = await fetch("data.json");
            const data = await response.json();

            // Use Promise.all() and Array.map() to handle async operations
            await Promise.all(
                data.map(async (item) => {
                    const { name, vicinity } = item;
                    const distance = await this.getWalkingDistance(
                        this.currentLocationLat,
                        this.currentLocationLng,
                        item.geometry.location.lat,
                        item.geometry.location.lng
                    );

                    // Create a Google Maps Directions link with the current location as the starting point
                    const directionsLink = `https://www.google.com/maps/dir/?api=1&origin=${this.currentLocationLat},${this.currentLocationLng}&destination=${item.geometry.location.lat},${item.geometry.location.lng}&travelmode=driving`;

                    const popupContent = `
                <div>
                  <h3>${name}</h3>
                  <p>${vicinity}</p>
                  <p>Walking Distance: ${distance.toFixed(2)} km</p>
                  <a href="${directionsLink}" target="_blank">Get Directions</a>
                </div>
              `;

                    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent);

                    const marker = new mapboxgl.Marker()
                        .setLngLat([
                            item.geometry.location.lng,
                            item.geometry.location.lat,
                        ])
                        .setPopup(popup)
                        .addTo(this.map);
                })
            );
        } catch (error) {
            console.error("Error loading JSON data:", error);
        }
    }


    async getWalkingDistance(lat1, lon1, lat2, lon2) {
        const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${lon1},${lat1};${lon2},${lat2}?access_token=${this.token}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            const distance = data.routes[0].distance / 1000; // distance in kilometers
            return distance;
        } catch (error) {
            console.error('Error fetching driving distance:', error);
        }
    }

    initApp() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.geolocationSuccess, this.showError, { enableHighAccuracy: true });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    geolocationSuccess = (position) => {
        console.log("Latitude: " + position.coords.latitude);
        console.log("Longitude: " + position.coords.longitude);
        console.log("Accuracy: " + position.coords.accuracy + " meters");

        this.currentLocationLat = position.coords.latitude;
        this.currentLocationLng = position.coords.longitude;
        this.initMap();
    }

    showError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                console.log("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                console.log("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                console.log("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                console.log("An unknown error occurred.");
                break;
        }
    }

}

new App();