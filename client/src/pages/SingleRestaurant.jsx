import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_RESTAURANT } from '../utils/queries';
import { ADD_REVIEW } from '../utils/mutations';
import './SingleRestaurant.css';

const SingleRestaurant = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_RESTAURANT, {
    variables: { id }
  });

  const [reviewText, setReviewText] = useState('');
  const [spiceRating, setSpiceRating] = useState(0);

  const [addReview] = useMutation(ADD_REVIEW, {
    refetchQueries: [{ query: GET_RESTAURANT, variables: { id } }]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!data || !data.restaurant) {
        console.error('Restaurant data is not available');
        return;
      }

      await addReview({
        variables: { restaurantId: data.restaurant._id, reviewText, spiceRating }
      });

      // Reset form fields
      setReviewText('');
      setSpiceRating(0);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.restaurant) return <p>No restaurant found.</p>;

  const { restaurant } = data;

  return (
    <div className="container">
      <h1 className="heading">{restaurant.name}</h1>
      <p>{restaurant.address}</p>
      <p>Rating: {restaurant.rating}</p>
      <h4>Spice Rating: {restaurant.spiceRating}</h4>
      <h2 className="heading">Reviews:</h2>
      <ul>
        {restaurant.reviews && restaurant.reviews.map(review => (
          <li key={review._id}>
            <p>{review.reviewText}</p>
            <p>Spice Rating: {review.spiceRating}</p>
          </li>
        ))}
      </ul>
      <h2 className="heading">Add a Review:</h2>
      <form onSubmit={handleSubmit} className="form">
        <textarea
          className="input"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here..."
        ></textarea>
        <label className="label">Spice Rating:</label>
        <input
          className="input"
          type="number"
          value={spiceRating}
          onChange={(e) => setSpiceRating(Number(e.target.value))}
        />
        <button className="button" type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default SingleRestaurant;
