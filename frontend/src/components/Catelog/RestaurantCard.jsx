import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import restaurantActions from '../../actions/restaurant';

const config = require('../../config/config.json');

const env = process.env.NODE_ENV || 'development';
const { url } = config[env];

const RestaurantCard = ({
  restaurant, dispatch, setRestaurantSelected, existingFavourite,
}) => {
  const user = useSelector((state) => state.user);
  const [favourite, setFavourite] = useState(null);

  const selectRestaurant = () => {
    setRestaurantSelected(true);
    dispatch(restaurantActions.getRestaurantSelectedAction(restaurant));
  };

  const favouriteRestaurant = async () => {
    const path = '/favourites/create/';
    try {
      const headers = {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      };
      const response = await axios.post(url + path,
        { id: user.id, favourites: { RestaurantId: restaurant.id, UserId: user.id } }, { headers });
      if (response.status === 200
        && response.error == null) {
        setFavourite(response.data.favourites);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const unfavouriteRestaurant = async () => {
    const path = '/favourites/remove/';
    try {
      const headers = {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      };
      const response = await axios.post(url + path,
        { id: user.id, favourites: { id: favourite.id } }, { headers });
      if (response.status === 200
        && response.error == null) {
        setFavourite(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const favouriteListener = async (_e) => {
    if (favourite === null) {
      await favouriteRestaurant();
    } else {
      await unfavouriteRestaurant();
    }
  };

  useEffect(() => {
    setFavourite(existingFavourite.length === 0 ? null : existingFavourite[0]);
  }, []);

  return (
    <Card
      style={{ width: '12rem', height: '18rem' }}
    >
      <Card.Img
        variant="top"
        src={restaurant.picture}
        onClick={(_e) => selectRestaurant(dispatch, setRestaurantSelected, restaurant)}
      />
      <Card.Body>
        <Card.Title
          className="card-title"
          onClick={(_e) => selectRestaurant(dispatch, setRestaurantSelected, restaurant)}
        >
          {restaurant.name}
        </Card.Title>
        <Card.Text className="card-text">
          {/* {restaurant.deliveryFee} */}
          $0 Delivery Fee 25–35 min
          {/* {restaurant.deliveryTime} */}
        </Card.Text>
        <Button variant="primary" type="submit" className="submit" onClick={(e) => favouriteListener(e)}>{favourite === null ? 'Favourite' : 'Un-Favourite'}</Button>
      </Card.Body>
    </Card>
  );
};

export default RestaurantCard;
