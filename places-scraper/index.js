require('dotenv').config();
const axios = require('axios');
const { MongoClient } = require('mongodb');

const apiKey = process.env.GOOGLE_API_KEY;

const coordinates = '56.818134138919454, 24.580090170734703';

const [latitudeStr, longitudeStr] = coordinates.split(',');
const latitude = parseFloat(latitudeStr.trim());
const longitude = parseFloat(longitudeStr.trim());

const radius = 1000;
const placeTypes = ['restaurant', 'cafe', 'bar', 'bakery', 'meal_takeaway'];

const fetchData = async (url, pageToken = '') => {
  try {
    let nextPageUrl = url;
    if (pageToken) {
      nextPageUrl = `${url}&pagetoken=${pageToken}`;
    }

    const response = await axios.get(nextPageUrl);
    const data = response.data.results;

    // Fetch additional place fields and save to MongoDB
    for (const place of data) {
      const details = await getPlaceDetails(place.place_id);
      const mergedPlaceData = { ...place, ...details };
      await saveToMongoDB(mergedPlaceData);
    }

    // If there is a next_page_token, fetch the next set of results
    if (response.data.next_page_token) {
      // Wait a few seconds before making the next request
      setTimeout(() => {
        fetchData(response.data.next_page_token);
      }, 5000);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


const saveToMongoDB = async (place) => {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const collection = client.db('placesdb').collection('test');

    const existingPlace = await collection.findOne({ place_id: place.place_id });

    console.log(place);

    if (!existingPlace) {
      delete place.icon;
      delete place.scope;
      delete place.photos;
      delete place.reference;
      delete place['plus_code'];
      delete place['opening_hours'];
      delete place['icon_background_color'];
      delete place['icon_mask_base_uri'];

      place.types = place.types.filter(type => ['cafe', 'restaurant', 'bar', 'bakery', 'meal_takeaway'].includes(type));

      // Get city from latitude and longitude
      const city = await getCityFromLatLng(place.geometry.location.lat, place.geometry.location.lng);
      if (city) {
        place.city = city;
      } else {
        console.log('City not found');
      }

      // await collection.insertOne(place);
      console.log(`Inserted place with place_id: ${place.place_id}`);
    } else {
      console.log('======================================================');
      console.log(`Place with place_id: ${place.place_id} already exists.`);
      console.log('======================================================');
      console.log('\n');
    }
  } catch (error) {
    console.error('Error saving data to MongoDB:', error);
  } finally {
    await client.close();
  }
};

const getPlaceDetails = async (place_id) => {
  const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=takeout,delivery,dine_in,serves_beer,website,formatted_phone_number,opening_hours&key=${apiKey}`;

  try {
    const response = await axios.get(detailsUrl);
    return response.data.result;
  } catch (error) {
    console.error(`Error fetching details for place_id: ${place_id}`, error);
  }
};

async function getCityFromLatLng(latitude, longitude) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK') {
      const city = data.results[0].address_components.find(
        (component) => component.types.includes('locality')
      );

      if (city) {
        return city.long_name;
      }
    }
  } catch (error) {
    console.error('Error fetching location data:', error);
  }

  return null;
}

placeTypes.forEach(type => {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates}&radius=${radius}&type=${type}&key=${apiKey}`;
  fetchData(url);
});