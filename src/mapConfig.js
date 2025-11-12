const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const center = {lat:51.56588106892094, long: -0.009357074623904631};
const zoom = 20;
const size = "640x640";

const mapURL = 
    "https://maps.googleapis.com/maps/api/staticmap"+
    `?center=${center.lat},${center.long}` +
    `&zoom=${zoom}` +
    `&size=${size}` +
    "&maptype=satellite" +
    `&key=${API_KEY}`;

export { mapURL };



// console.log("map url: " + mapURL);


//51.56588106892094, -0.009357074623904631