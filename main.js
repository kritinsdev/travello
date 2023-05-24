import mapboxgl from "mapbox-gl";
import { API_KEY } from "./config";

class App {
  constructor() {
    this.currentLocationLat = null;
    this.currentLocationLng = null;
    this.map = null;
    this.token = API_KEY;
    mapboxgl.accessToken = this.token;

    this.initMap();
  }

  initMap() {
    this.map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/kritinsdev/clhb5zy9v014j01pgbidw9x8k', // style URL
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
      await geolocationPromise;
      this.loadAndDisplayPlaces();
    });
  }

  async loadAndDisplayPlaces() {
    try {
      const response = await fetch("data.json");
      const data = await response.json();

      // Calculate distances and add them to the place objects
      const dataWithDistances = await Promise.all(
        data.map(async (item) => {
          const distance = await this.getWalkingDistance(
            this.currentLocationLat,
            this.currentLocationLng,
            item.geometry.location.lat,
            item.geometry.location.lng
          );
          return { ...item, distance };
        })
      );

      // Sort places by distance
      const sortedData = dataWithDistances.sort((a, b) => a.distance - b.distance);

      // Create markers for the sorted places
      this.createMarkers(sortedData);

      // Display the sorted places
      this.displayPlaces(sortedData);
    } catch (error) {
      console.error("Error loading JSON data:", error);
    }
  }

  async createMarkers(places) {
    places.forEach((place) => {
      const { name, vicinity, types } = place;

      const directionsLink = `https://www.google.com/maps/dir/?api=1&origin=${this.currentLocationLat},${this.currentLocationLng}&destination=${place.geometry.location.lat},${place.geometry.location.lng}&travelmode=driving`;

      const popupContent = `
            <div>
              <h3>${name}</h3>
              <p>${vicinity}</p>
              <a href="${directionsLink}" target="_blank">Get Directions</a>
            </div>
          `;

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent);
      const icon = this.getIconFileName(types);

      const markerElement = document.createElement("div");
      markerElement.className = "marker";
      markerElement.innerHTML = `<img src="${icon}" alt="Location Icon" width="24" height="24">`;

      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([
          place.geometry.location.lng,
          place.geometry.location.lat,
        ])
        .setPopup(popup)
        .addTo(this.map);
    });
  }

  displayPlaces(places) {
    const placesContainer = document.getElementById("places");
    placesContainer.innerHTML = ""; // Clear the existing content

    places.forEach((place) => {
      const { name, vicinity, distance, website, formatted_phone_number } = place;

      const directionsLink = `https://www.google.com/maps/dir/?api=1&origin=${this.currentLocationLat},${this.currentLocationLng}&destination=${place.geometry.location.lat},${place.geometry.location.lng}&travelmode=driving`;

      const placeElement = document.createElement("div");
      placeElement.className = "place";
      placeElement.innerHTML = `
            <h3>${name}</h3>
            <p>Distance: ${distance.toFixed(2)} km</p>
            <a href="${directionsLink}" target="_blank">Get Directions</a>
          `;

      placesContainer.appendChild(placeElement);
    });
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

  getIconFileName(types) {
    if (types.length > 1) {
      return "./icons/restaurant.png";
    }

    if (types.includes("bakery")) {
      return "./icons/bakery.png";
    } else if (types.includes("restaurant")) {
      return "./icons/restaurant.png";
    } else if (types.includes("bar")) {
      return "./icons/bar.png";
    } else if (types.includes("cafe")) {
      return "./icons/cafe.png";
    } else if (types.includes("takeaway")) {
      return "./icons/takeaway.png";
    }
  }
}

// new App();
// const response = await fetch("data.json")
//   .then((res) => res.json())
//   .then(res => console.log(res));