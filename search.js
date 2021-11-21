const { restaurants, cuisines } = require('./data.js');



const search = (name, rating, distance, price, cuisine_id) => {

    // need to handle invalid inputs

    if ((typeof name !== 'string' && typeof name !== 'undefined') ||
        rating > 5 || rating < 1 || 
        distance < 1 || 
        price < 1 || 
        cuisine_id < 1 || cuisine_id > 19
        ) {
        return 'Invalid input';
    }

    if (name === undefined && rating === undefined && distance === undefined && price === undefined && cuisine_id === undefined) {
        return 'No search criteria found';
    }

    //search for results
    let results = restaurants;
    if (cuisine_id) {
        results = results.filter(rest => Number(rest.cuisine_id) === cuisine_id);
    }
    if (distance) {
        results = results.filter(rest => Number(rest.distance) <= distance);
    }
    if (rating) {
        results = results.filter(rest => Number(rest.customer_rating) >= rating);
    }
    if (price) {
        results = results.filter(rest => Number(rest.price) <= price);
    }
    if (name) {
        const lowerName = name.toLowerCase();
        results = results.filter(rest => {
            const lowerRestName = rest.name.toLowerCase();
            return lowerRestName.includes(lowerName)
        });
    }



    //sort results
    



    //return results
    return results;

}

console.log('THIS IS THE TEST! ---------->', 
    search(undefined, undefined, undefined, undefined, undefined));
