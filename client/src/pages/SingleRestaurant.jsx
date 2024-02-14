import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_RESTAURANT } from './queries';

const SingleRestaurant = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_RESTAURANT, {
    variables: { id }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { restaurant } = data;

  return (
    <div>
      <h1>{restaurant.name}</h1>
      <p>{restaurant.address}</p>
      <p>Rating: {restaurant.rating}</p>
      <p>Spice Rating: {restaurant.spiceRating}</p>
      {/* Perhaps a description of the restaurant */}
    </div>
  );
};

export default SingleRestaurant;
