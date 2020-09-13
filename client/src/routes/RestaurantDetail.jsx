import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import RestaurantFinder from '../apis/RestaurantFinder';
import StarRating from '../components/StarRating';
import Reviews from '../components/Reviews';

import { RestaurantsContext } from '../context/RestaurantsContext';
import AddReview from '../components/AddReview';
//import { render } from 'react-dom';

const RestaurantDetail = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(id);
        const response = await RestaurantFinder.get(`/restaurants/${id}`);
        setSelectedRestaurant(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [])

  return (
    <div>{selectedRestaurant && (
      <>
        <h1 className="text-center display-1">{selectedRestaurant.restaurant.name}</h1>
        <div className="text-center">
          <StarRating rating={selectedRestaurant.restaurant.average_rating || 0} />
          <span className="text-warning ml-1">({selectedRestaurant.restaurant.count || 0})</span>
        </div>
        <div className="mt-3">
          {<Reviews reviews={selectedRestaurant.reviews} />}
        </div>
        <AddReview />
      </>
    )}</div>
  );
}

export default RestaurantDetail;