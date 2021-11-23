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
const search = (criteria) => {
    //handle input object
    const name = (criteria.name === '') ? undefined : criteria.name;
    const rating = (criteria.rating === '') ? undefined : Number(criteria.rating);
    const distance = (criteria.distance === '') ? undefined : Number(criteria.distance);
    const price = (criteria.price === '') ? undefined : Number(criteria.price);
    const cuisine_id = (criteria.cuisine === '') ? undefined : cuisineIdFinder(criteria.cuisine);

    // handle invalid inputs
    if ((typeof name !== 'string' && typeof name !== 'undefined') ||
        rating > 5 || rating < 1 || 
        distance < 1 || 
        price < 1
        ) {
        return 'Invalid input';
    };

    if (cuisine_id === 'Invalid Cuisine type') {
        return 'Invalid Cuisine type';
    };
    
    if (name === undefined && rating === undefined && distance === undefined && price === undefined && cuisine_id === undefined) {
        return 'No search criteria found. Try again!';
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
    if (results.length === 0) {
        results = 'Your search yielded no results. Try again!'
    }
    // return results
    return results;

}

module.exports = { search };

