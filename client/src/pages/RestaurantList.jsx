// RestaurantList.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { getAllRestaurants } from './queries'; // Assuming your queries.js file is in the same directory

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Fetch restaurant data when the component mounts
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await getAllRestaurants();
      setRestaurants(response);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  return (
    <div>
      <h1>Restaurant List</h1>
      <ul>
        {restaurants.map(restaurant => (
          <li key={restaurant._id}>
            {/* Use Link to navigate to the single restaurant view */}
            <Link to={`/restaurant/${restaurant._id}`}>
              <h2>{restaurant.name}</h2>
            </Link>
            <p>{restaurant.description}</p>
            {/* You can display other information about the restaurant here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
