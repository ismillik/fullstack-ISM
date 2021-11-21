const fs = require('fs');
const Papa = require('papaparse');
const path = require('path');

const restaurantsPath = path.join(__dirname, 'csv/restaurants.csv');
const cuisinesPath = path.join(__dirname, 'csv/cuisines.csv');

const restaurantsRaw = fs.readFileSync(restaurantsPath, {encoding: 'utf8'});
const cuisinesRaw = fs.readFileSync(cuisinesPath, {encoding: 'utf8'});

let restaurants;
let cuisines;

Papa.parse(restaurantsRaw, {
    header: true,
    complete: function(results) {
        restaurants = results.data;
    }
});

Papa.parse(cuisinesRaw, {
    header: true,
    complete: function(results) {
        cuisines = results.data;
    }
});

module.exports = { restaurants, cuisines };

//if I were building a more complete app, I would use the above arrays to load 
//a database and use the db to access this information when needed in the app