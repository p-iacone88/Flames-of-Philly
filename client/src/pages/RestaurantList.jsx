import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_RESTAURANTS } from '../utils/queries';
import './RestaurantList.css';

const RestaurantList = () => {
  const { loading, error, data } = useQuery(GET_RESTAURANTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Restaurant List</h1>
      <ul>
        {data.restaurants.map(restaurant => (
          <li key={restaurant._id}>
            <Link to={`/restaurant/${restaurant._id}`}>
              <h2>{restaurant.name}</h2>
            </Link>
            <p>{restaurant.address}</p>
            <p>Rating: {restaurant.rating}</p>
            <p>Spice Rating: {restaurant.spiceRating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;

