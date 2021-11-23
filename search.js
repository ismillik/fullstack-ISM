const { restaurants, cuisines } = require('./data.js');

//convert cuisine into an id
const cuisineIdFinder = (str) => {
    const lowerStr = str.toLowerCase();
    const cuisineArr = cuisines.filter(cuisine => {
        const lowerCuisine = cuisine.name.toLowerCase();
        return lowerCuisine.includes(lowerStr);
    });
    if (cuisineArr.length > 1 || cuisineArr.length === 0) {
        return 'Invalid Cuisine type'
    }
    else {
        return cuisineArr[0].id;
    };
};


//search function 
const search = (name, rating, distance, price, cuisine_id) => {

    // handle invalid inputs
    if ((typeof name !== 'string' && typeof name !== 'undefined') ||
        rating > 5 || rating < 1 || 
        distance < 1 || 
        price < 1
        ) {
        return 'Invalid input';
    };
    if (name === undefined && rating === undefined && distance === undefined && price === undefined && cuisine_id === undefined) {
        return 'No search criteria found';
    };

    // search for results
    let results = restaurants;
    if (cuisine_id) {
        results = results.filter(rest => rest.cuisine_id === cuisine_id);
    };
    if (distance) {
        results = results.filter(rest => Number(rest.distance) <= distance);
    };
    if (rating) {
        results = results.filter(rest => Number(rest.customer_rating) >= rating);
    };
    if (price) {
        results = results.filter(rest => Number(rest.price) <= price);
    };
    if (name) {
        const lowerName = name.toLowerCase();
        results = results.filter(rest => {
            const lowerRestName = rest.name.toLowerCase();
            return lowerRestName.includes(lowerName)
        });
    };

    // sort results
    results.sort((a, b) => {
        if (a.distance - b.distance === 0) {
            if (b.customer_rating - a.customer_rating === 0) {
                return a.price - b.price;
            }
            return b.customer_rating - a.customer_rating;
        }
        return a.distance - b.distance;
    });

    if (results.length > 5) {
        results = results.slice(0,5);
    };

    // return results
    return results;

}

module.exports = { cuisineIdFinder, search };

// console.log('THIS IS THE TEST! ---------->', 
//     search(undefined, undefined, undefined, undefined, '12'));

// console.log('THIS IS ANOTHER TEST ------>', cuisineIdFinder('Thai'));
// console.log(typeof cuisineIdFinder('Thai'))