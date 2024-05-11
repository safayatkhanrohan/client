import React from "react";

const ListReviews = ({ reviews }) => {
  return (
    <div className="reviews w-75">
    <h3>Other's Reviews:</h3>
    {reviews && reviews.map((review) => (
      <React.Fragment key={review._id}>
        <hr />
        <div className="review-card my-3">
          <div className="rating-outer">
            <div className="rating-inner" style={{width: `${review.rating * 20}%`}}></div>
          </div>
          <p className="review_user">{review.name}</p>
          <p className="review_comment">{review.comment}</p>
        </div>
        <hr />
      </React.Fragment>
    ))}
  </div>
  );
};

export default ListReviews;
