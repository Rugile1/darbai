import { useState, useEffect } from "react";
import ReviewList from "./ReviewList";
import SortingOptions from "./SortingOptions";
import ReviewForm from "./ReviewForm";

const App = () => {
  const [userReviews, setUserReviews] = useState([]);
  const [sortBy, setSortBy] = useState("new"); //new, old, good, bad
  const [averageUserRating, setAverageUserRating] = useState(0);
  const [editID, setEditID] = useState(0);

  let reloadData = () => {
    fetch('http://localhost:3001/api/atsiliepimai/sort/' + sortBy, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }, 
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setUserReviews(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  let updateRating = () => {
    fetch('http://localhost:3001/api/atsiliepimai/vertinimas', {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }, 
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // setUserReviews(data);
        setAverageUserRating(data[0].average);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };



  useEffect( () => {
    reloadData();
    updateRating();
  }, [sortBy]);


  // const averageUserRating =
  //   userReviews.length > 0
  //     ? userReviews.reduce((total, review) => total + review.rating, 0) /
  //       userReviews.length
  //     : 0;

  const addNewReview = (newReviewData) => {

    fetch('http://localhost:3001/api/atsiliepimai/', {
      method: 'POST',
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReviewData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {

        reloadData();
        updateRating();
      })
      .catch((error) => {
        console.error("Error adding review:", error);
      });
  };

  const deleteReview = async (id) => {
    const response = await fetch(`http://localhost:3001/api/atsiliepimai/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
   

    reloadData();
  };




  return (
    <div id="my-app">
      <h2>User Reviews</h2>
      <div class="review-controls">
        <span class="review-average">
          Average Rating ({averageUserRating.toFixed(1)})
          {/* Here you can keep the star rating generation */}
        </span>
        <span class="sort-label" id="sort-by">
          Sort Reviews By
        </span>
        <SortingOptions sortBy={sortBy} setSortBy={setSortBy}/>
      </div>
      <ReviewList userReviews={userReviews} editID={editID} setEditID={setEditID} onDelete={deleteReview}/>
      <ReviewForm onSubmit={addNewReview} />
    </div>
  );
};

export default App;

