require('dotenv').config();
const { MongoClient } = require('mongodb');
const axios = require('axios');
const { promptForCity, promptForName, promptSavePlace } = require('./prompts');
const apiKey = process.env.GOOGLE_API_KEY;

const placeTypes = ['restaurant', 'cafe', 'bar', 'bakery', 'meal_takeaway'];
const coordinates = '56.81089975011982, 24.61620625074004';
const radius = 2500;

// const [latitudeStr, longitudeStr] = coordinates.split(',');
// const latitude = parseFloat(latitudeStr.trim());
// const longitude = parseFloat(longitudeStr.trim());

const processPlace = async (place) => {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const collection = client.db('placesdb').collection('test2');
  const existingPlace = await collection.findOne({ place_id: place.place_id });

  console.log('\n');
  console.log('==============');
  console.log(place.name);

  saveAnswer = promptSavePlace();

  if (!saveAnswer) {
    console.log(`Don\'t save ${place.name}`);
    return;
  }

  place.name = promptForName();

  if (!existingPlace) {
    delete place.icon;
    delete place.scope;
    delete place.photos;
    delete place.reference;
    delete place.types;
    delete place['plus_code'];
    delete place['opening_hours'];
    delete place['icon_background_color'];
    delete place['icon_mask_base_uri'];
    const city = await getCityFromLatLng(place.geometry.location.lat, place.geometry.location.lng);
    if (city) {
      place.city = city;
    } else {
      place.city = promptForCity();
    }

    await collection.insertOne(place);
    console.log(`Inserted place with place_id: ${place.place_id}`);
  } else {
    console.log(`Place with place_id: ${place.place_id} already exists.`);

  }
};

const fetchData = async (url, pageToken = '') => {
  try {
    let nextPageUrl = url;
    if (pageToken) {
      nextPageUrl = `${url}&pagetoken=${pageToken}`;
    }

    const response = await axios.get(nextPageUrl);
    const data = response.data.results;

    for (const place of data) {
      const details = await getPlaceDetails(place.place_id);
      const mergedPlaceData = { ...place, ...details };
      await processPlace(mergedPlaceData);
    }

    if (response.data.next_page_token) {
      setTimeout(() => {
        fetchData(response.data.next_page_token);
      }, 5000);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const getPlaceDetails = async (place_id) => {
  const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=takeout,delivery,dine_in,serves_beer,website,formatted_phone_number,current_opening_hours,secondary_opening_hours&key=${apiKey}`;
  try {
    const response = await axios.get(detailsUrl);
    return response.data.result;
  } catch (error) {
    console.error(`Error fetching details for place_id: ${place_id}`, error);
  }
};

const getCityFromLatLng = async (latitude, longitude) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

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
};

placeTypes.forEach(type => {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates}&radius=${radius}&type=${type}&key=${apiKey}`;
  fetchData(url);
});


