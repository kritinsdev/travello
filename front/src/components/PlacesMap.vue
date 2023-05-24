<template>
    <div class="mapWrap">
        <div id="map" class="map"></div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import mapboxgl from 'mapbox-gl';
import { API_KEY } from '../config';

let map = ref(null);
let currentLocationLat = ref(null);
let currentLocationLng = ref(null);
const token = API_KEY;
mapboxgl.accessToken = token;

onMounted(async () => {
    await initMap();

    // loadAndDisplayPlaces();
});

const initMap = () => {
    map.value = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/kritinsdev/clhb5zy9v014j01pgbidw9x8k',
        center: [24.6060, 56.8138],
        zoom: 15,
    });

    const geolocateControl = new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
    });

    const geolocationPromise = new Promise((resolve) => {
        geolocateControl.on('geolocate', (e) => {
            currentLocationLat.value = e.coords.latitude;
            currentLocationLng.value = e.coords.longitude;
            resolve();
        });
    });

    map.value
        .addControl(geolocateControl)
        .addControl(new mapboxgl.NavigationControl());

    map.value.on("load", async () => {
        geolocateControl.trigger();
        await geolocationPromise;
        // loadAndDisplayPlaces();
    });
}

// ... continue with other methods from your App class
// such as loadAndDisplayPlaces(), createMarkers(), displayPlaces(),
// getWalkingDistance(), and getIconFileName() ...
// Note that `this` in the App class is replaced with the Vue composition API's ref variables in the Vue component.

</script>

<style lang="scss" scoped>
.mapWrap {
    flex: 0 0 70%;
}

.map {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
}
</style>
