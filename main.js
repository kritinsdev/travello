import mapboxgl from "mapbox-gl";

class App {
    constructor() {
        this.currentLocationLat = null;
        this.currentLocationLng = null;

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                this.currentLocationLat = position.coords.latitude;
                this.currentLocationLng = position.coords.longitude;
            });
        } else {
            console.log("Geolocation is not available");
        }

        mapboxgl.accessToken = 'pk.eyJ1Ijoia3JpdGluc2RldiIsImEiOiJjbGg2bTFxaGMwN2IyM2Vyb3Jrcjk2aHZoIn0.uRk6fvC2fOvRIX_SypSxbQ';
        
        this.map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/kritinsdev/clh6ok83a00s101quf9jk49sx', // style URL
            center: [24.586785, 56.8239321], // starting position [lng, lat]
            zoom: 14, // starting zoom
        });


        this.map.on("load", () => {
            this.loadMarkers();
        });
    }

    async loadMarkers() {
        try {
            const response = await fetch("data.json");
            const data = await response.json();

            data.forEach((item) => {
                const { name, vicinity } = item;
                const popupContent = `
                  <div>
                    <h3>${name}</h3>
                    <p>${vicinity}</p>
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
            });
        } catch (error) {
            console.error("Error loading JSON data:", error);
        }
    }
}

new App();