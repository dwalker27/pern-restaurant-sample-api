import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import StarRating from '../components/StarRating';
const RestaurantList = (props) => {

  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  let history = useHistory();

  //make an api call to the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/restaurants");
        setRestaurants(response.data.data.restaurants);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

  }, []);

  //deleting something
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await RestaurantFinder.delete(`/restaurants/${id}`);
      setRestaurants(restaurants.filter(restaurant => {
        return restaurant.id !== id;
      }));
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  //updating something

  const handleUpdate = async (e, id) => {
    e.stopPropagation();
    try {
      history.push(`/restaurants/${id}/update`);
    } catch (err) {
      console.log(err);
    }
  }

  //select restaurant

  const handleRestaurantSelect = (id) => {
    history.push(`/restaurants/${id}`)
  }


  return (
    <div>
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Rating</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants && restaurants.map((key) => {
            return (
              <tr onClick={() => handleRestaurantSelect(key.id)} key={key.id}>
                <td>{key.name}</td>
                <td>{key.location}</td>
                <td>
                  {"$".repeat(key.price_range)}
                </td>
                <td><StarRating rating={key.average_rating} /><span className="text-warning ml-1">({key.count || 0})</span></td>
                <td><button onClick={(e) => handleUpdate(e, key.id)} className="btn btn-warning">Update</button></td>
                <td><button onClick={(e) => handleDelete(e, key.id)} className="btn btn-danger">Delete</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
};

export default RestaurantList;
