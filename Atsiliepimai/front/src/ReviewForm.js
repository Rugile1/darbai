import React, { useState } from "react";

const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [isTextValid, setIsTextValid] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim() === "") {
      setIsTextValid(false);
      return;
    }

    const newReview = {
      vardas: name,
      pastas: email,
      vertinimas: rating,
      tekstas: text,
    };

    onSubmit(newReview);

    setRating(3);
    setName("");
    setEmail("");
    setText("");
    setIsTextValid(true);
  };

  return (
    <div>
      <h2 className="my-3">Leave a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <span className="input-group-text">Your Rating:</span>
          <div className="input-group-text">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                style={{ cursor: "pointer" }}
              >
                {star <= rating ? "★" : "☆"}&nbsp;
              </span>
            ))}
          </div>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Your Name:</span>
          <input
            type="text"
            className="form-control"
            placeholder="Your Name"
            aria-label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span className="input-group-text">Email</span>
          <input
            type="email"
            className="form-control"
            placeholder="your.email@example.com"
            aria-label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <span className="input-group-text">Review Text</span>
          <textarea
            className={`form-control ${!isTextValid && "is-invalid"}`}
            aria-label="Review Text"
            required
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setIsTextValid(true);
            }}
          ></textarea>
          {!isTextValid && (
            <div className="invalid-feedback">
              Review text is required.
            </div>
          )}
        </div>
        <div className="input-group mt-3">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
