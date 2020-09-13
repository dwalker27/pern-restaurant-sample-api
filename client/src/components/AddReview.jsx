import React, { useState } from 'react'
import { useLocation, useParams, useHistory } from 'react-router';
import RestaurantFinder from '../apis/RestaurantFinder';

const AddReview = () => {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();

  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    await RestaurantFinder.post(`/restaurants/${id}/addReview`, { //use const response to use it
      name: name,
      review: review,
      rating: rating
    });
    history.push('/');
    history.push(location.pathname);
  };

  return (
    <div className="mb-2">
      <form action="">
        <div className="form-row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" id="name" className="form-control" />
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select value={rating} onChange={(e) => setRating(e.target.value)} id="rating" className="custom-select">
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="review">Review</label>
          <textarea value={review} onChange={(e) => setReview(e.target.value)} className="form-control"></textarea>
        </div>
        <button type="submit" onClick={handleSubmitReview} className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default AddReview
