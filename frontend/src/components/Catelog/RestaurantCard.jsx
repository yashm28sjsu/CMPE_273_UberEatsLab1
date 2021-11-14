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
    const path = '/favourite/create/';
    try {
      const headers = {
        Authorization: `JWT ${window.localStorage.getItem('token')}`,
      };
      const response = await axios.post(url + path,
        // eslint-disable-next-line no-underscore-dangle
        { restaurantId: restaurant._id, userId: user._id }, { headers });
      if (response.status === 200) {
        const result = response.data.response;
        if (result.error == null) {
          setFavourite(result.favourites);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const unfavouriteRestaurant = async () => {
    const path = '/favourite/remove/';
    try {
      const headers = {
        Authorization: `JWT ${window.localStorage.getItem('token')}`,
      };
      const response = await axios.post(url + path,
        // eslint-disable-next-line no-underscore-dangle
        { id: favourite._id }, { headers });
      if (response.status === 200) {
        const result = response.data.response;
        console.log(JSON.stringify(result));
        if (result.error == null) {
          setFavourite(null);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const favouriteListener = async (_e) => {
    if (favourite != null) {
      await unfavouriteRestaurant();
    } else {
      await favouriteRestaurant();
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
        src={
          restaurant.picture && restaurant.picture.length > 0
            ? restaurant.picture
            : 'https://cdn.shopify.com/s/files/1/1533/4185/files/UE_Logo_Horizontal_RGB_Pepper_Green_2x_009564db-7d56-4259-b812-ca98a9f89779.png?height=628&pad_color=fff&v=1612214712&width=1200'
        }
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
        <Button variant="primary" type="submit" className="submit" onClick={(e) => favouriteListener(e)}>{favourite != null ? 'Un-Favourite' : 'Favourite'}</Button>
      </Card.Body>
    </Card>
  );
};

export default RestaurantCard;
