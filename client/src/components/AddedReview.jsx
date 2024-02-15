import React from 'react';

const AddedReview = ({ review }) => {
  return (
    <div className="added-review">
      <p>{review.reviewText}</p>
      <p>Spice Rating: {review.spiceRating}</p>
      {/* Additional information or styling can be added here */}
    </div>
  );
};

export default AddedReview;
