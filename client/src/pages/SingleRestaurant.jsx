// SingleRestaurant.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the restaurant ID from the URL
import { getRestaurantById } from './queries'; // Assuming your queries.js file is in the same directory

const SingleRestaurant = () => {
  const { id } = useParams(); // Get the restaurant ID from the URL
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    // Fetch restaurant data when the component mounts
    fetchRestaurant();
  }, []);

  const fetchRestaurant = async () => {
    try {
      const response = await getRestaurantById(id);
      setRestaurant(response);
    } catch (error) {
      console.error('Error fetching restaurant:', error);
    }
  };

  return (
    <div>
      {restaurant ? (
        <div>
          <h1>{restaurant.name}</h1>
          <p>{restaurant.description}</p>
          {/* Display other details about the restaurant, such as reviews and comments */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SingleRestaurant;
