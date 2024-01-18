import React from "react";

const ReviewList = (props) => {
  
  let userReviews = props.userReviews;



  const  handleDeleteAtsiliepimas = (id) => {

    props.onDelete(id);
  };


  return (
    <div>
      {userReviews.map((review) => (
        <div key={review.id} class="user-review card mb-3">
          <div class="card-header d-flex">
            {review.name} ({review.date_time})
            <span>{<StarRating rating={review.rating} />}</span>
            <button  onClick={()=> { handleDeleteAtsiliepimas(review.id)}} class="btn btn-danger ms-auto">Delete</button>
          </div>
          <div class="card-body">
            <p class="card-text">{review.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const StarRating = ({ rating }) => {
  const fullStars = "★".repeat(Math.floor(rating));
  const emptyStars = "☆".repeat(5 - Math.ceil(rating));
  return (
    <span>
      {fullStars}
      {emptyStars}
    </span>
  );
};

export default ReviewList;

