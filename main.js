import mapboxgl from "mapbox-gl";

class App {
    constructor() {
        this.currentLocationLat = null;
        this.currentLocationLng = null;
        this.map = null;
        this.token = 'pk.eyJ1Ijoia3JpdGluc2RldiIsImEiOiJjbGg2bTFxaGMwN2IyM2Vyb3Jrcjk2aHZoIn0.uRk6fvC2fOvRIX_SypSxbQ';
        mapboxgl.accessToken = this.token;

        this.initMap();
    }

    initMap() {
        this.map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/kritinsdev/clh6ok83a00s101quf9jk49sx', // style URL
            center: [24.6060, 56.8138], // starting position [lng, lat]
            zoom: 15, // starting zoom
        });

        const geolocateControl = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
        });

        // Create a promise that resolves when the user's location is found
        const geolocationPromise = new Promise((resolve) => {
            geolocateControl.on('geolocate', (e) => {
                this.currentLocationLat = e.coords.latitude;
                this.currentLocationLng = e.coords.longitude;
                resolve();
            });
        });

        this.map
            .addControl(geolocateControl)
            .addControl(new mapboxgl.NavigationControl());

        this.map.on("load", async () => {
            geolocateControl.trigger();
            // Wait for the user's location to be determined before loading markers
            await geolocationPromise;
            this.loadMarkers();
        });
    }



    async loadMarkers() {
        try {
            const response = await fetch("data.json");
            const data = await response.json();

            await Promise.all(
                data.map(async (item) => {
                    const { name, vicinity } = item;

                    // Check if the place is a bakery
                    // const distance = await this.getWalkingDistance(
                    //     this.currentLocationLat,
                    //     this.currentLocationLng,
                    //     item.geometry.location.lat,
                    //     item.geometry.location.lng
                    // );

                    // Create a Google Maps Directions link with the current location as the starting point
                    const directionsLink = `https://www.google.com/maps/dir/?api=1&origin=${this.currentLocationLat},${this.currentLocationLng}&destination=${item.geometry.location.lat},${item.geometry.location.lng}&travelmode=driving`;

                    const popupContent = `
                <div>
                  <h3>${name}</h3>
                  <p>${vicinity}</p>
                  <a href="${directionsLink}" target="_blank">Get Directions</a>
                </div>
              `;

                    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent);

                    // Create a custom marker element based on the type
                    const markerElement = document.createElement("div");
                    markerElement.className = "marker";
                    markerElement.innerHTML = `<img src="./icons/location.png" alt="Location Icon" width="24" height="24">`;

                    const marker = new mapboxgl.Marker(markerElement)
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
}

new App();