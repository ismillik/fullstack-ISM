import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            rating: '',
            distance: '',
            price: '',
            cuisine: '',
            options: '',
            message: 'This is where the results will go.'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    };

    async handleSubmit(evt) {
        evt.preventDefault();
        const criteria = {
            name: this.state.name,
            rating: this.state.rating,
            distance: this.state.distance,
            price: this.state.price,
            cuisine: this.state.cuisine
        };
        const response = await axios.post(`/api/search`, criteria);
        if (typeof response.data === 'object') {
            this.setState({
                options: response.data,
                message: 'Here are the ordered results.'
            });
        }
        else {
            this.setState({
                message: response.data
            })
        };
    };

    render() {
        const { handleChange, handleSubmit } = this;
        const { name, rating, distance, price, cuisine, message, options } = this.state;
        return (
            <div id='main'>
                <div id='content-wrapper'>
                    <h1>Where should we get lunch?</h1>
                    <h4>Let's set some criteria. All fields optional.</h4>
                    <div id= 'form'>
                        <form onSubmit= {handleSubmit}>
                            <div id='inputs'>
                                <label name='name'>Restaurant Name:</label>
                                <input 
                                    id='name'
                                    type='text'
                                    name='name'
                                    value={name}
                                    onChange={handleChange}
                                />
                                <label name='rating'>Rating (1-5):</label>
                                <input 
                                    id='rating'
                                    type='number'
                                    min= '1'
                                    max= '5'
                                    name='rating'
                                    value={rating}
                                    onChange={handleChange}
                                />
                                <label name='distance'>Distance:</label>
                                <input 
                                    id='distance'
                                    type='number'
                                    min= '1'
                                    name='distance'
                                    value={distance}
                                    onChange={handleChange}
                                />
                                <label name='price'>Price:</label>
                                <input 
                                    id='price'
                                    type='number'
                                    min= '1'
                                    name='price'
                                    value={price}
                                    onChange={handleChange}
                                />
                                <label name='cuisine'>Cuisine Type:</label>
                                <input 
                                    id='cuisine'
                                    type='text'
                                    name='cuisine'
                                    value={cuisine}
                                    onChange={handleChange}
                                />
                            </div>
                            <button type='submit'>Submit</button>
                        </form>
                    </div>
                    <div id='results'>
                        <h4>Results:</h4>
                        <p><i>{message}</i></p>
                        {options.length ? (
                            <ul id='results-list'>
                                {options.map((restaurant, idx) => {
                                    return (
                                        <li key= {idx}>
                                            <p><strong>Option {idx + 1}: {restaurant.name}</strong> Rating: {restaurant.customer_rating} Distance: {restaurant.distance}</p>
                                        </li>
                                    )
                                })}
                            </ul> 
                        ):(
                        <div></div>
                        )}               
                    </div>
                </div>
                
            </div>
        )
    }
 }

 ReactDOM.render(<Main />, document.getElementById('app'));