// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useQuery, useMutation } from '@apollo/client';
// import { GET_RESTAURANT } from '../utils/queries';
// import { ADD_REVIEW } from '../utils/mutations';

// const SingleRestaurant = () => {
//   const { id } = useParams();
//   const { loading, error, data } = useQuery(GET_RESTAURANT, {
//     variables: { id }
//   });

//   const [reviewText, setReviewText] = useState('');
//   const [spiceRating, setSpiceRating] = useState(0);

//   const [addReview] = useMutation(ADD_REVIEW, {
//     refetchQueries: [{ query: GET_RESTAURANT, variables: { id } }]
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (!data || !data.restaurant) {
//         console.error('Restaurant data is not available');
//         return;
//       }

//       const { data: { addReview: newReview } } = await addReview({
//         variables: { restaurantId: data.restaurant._id, reviewText, spiceRating }
//       });

//       // Optionally, you can handle success
//       console.log(newReview);
//       // Reset form fields
//       setReviewText('');
//       setSpiceRating(0);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   const { restaurant } = data;

//   return (
//     <div>
//       <h1>{restaurant.name}</h1>
//       <p>{restaurant.address}</p>
//       <p>Rating: {restaurant.rating}</p>
//       <h4>Spice Rating: {restaurant.spiceRating}</h4>
//       <h2>Reviews:</h2>
//       <ul>
//         {/* Render existing reviews */}
//         {restaurant.reviews.map(review => (
//           <li key={review._id}>
//             <p>{review.reviewText}</p>
//             <p>Spice Rating: {review.spiceRating}</p>
//           </li>
//         ))}
//       </ul>
//       <h2>Add a Review:</h2>
//       <form onSubmit={handleSubmit}>
//         <textarea
//           value={reviewText}
//           onChange={(e) => setReviewText(e.target.value)}
//           placeholder="Write your review here..."
//         />
//         <label>Spice Rating:</label>
//         <input
//           type="number"
//           value={spiceRating}
//           onChange={(e) => setSpiceRating(Number(e.target.value))}
//         />
//         <button type="submit">Submit Review</button>
//       </form>
//     </div>
//   );
// };

// export default SingleRestaurant;

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_RESTAURANT } from '../utils/queries';
import { ADD_REVIEW } from '../utils/mutations';

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

      const { data: { addReview: newReview } } = await addReview({
        variables: { restaurantId: data.restaurant._id, reviewText, spiceRating }
      });

      // Optionally, you can handle success
      console.log(newReview);
      // Reset form fields
      setReviewText('');
      setSpiceRating(0);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.restaurant) return <p>No restaurant found.</p>; // Handle missing restaurant data

  const { restaurant } = data;

  return (
    <div>
      <h1>{restaurant.name}</h1>
      <p>{restaurant.address}</p>
      <p>Rating: {restaurant.rating}</p>
      <h4>Spice Rating: {restaurant.spiceRating}</h4>
      <h2>Reviews:</h2>
      <ul>
        {/* Render existing reviews if available */}
        {restaurant.reviews && restaurant.reviews.map(review => (
          <li key={review._id}>
            <p>{review.reviewText}</p>
            <p>Spice Rating: {review.spiceRating}</p>
          </li>
        ))}
      </ul>
      <h2>Add a Review:</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here..."
        />
        <label>Spice Rating:</label>
        <input
          type="number"
          value={spiceRating}
          onChange={(e) => setSpiceRating(Number(e.target.value))}
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default SingleRestaurant;
