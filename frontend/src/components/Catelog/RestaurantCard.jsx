import React from 'react';
import { Card } from 'react-bootstrap';
import restaurantActions from '../../actions/restaurant';

const selectRestaurant = (e, dispatch, setRestaurantSelected, restaurant) => {
  e.preventDefault();
  setRestaurantSelected(true);
  dispatch(restaurantActions.getRestaurantSelectedAction(restaurant));
};

const RestaurantCard = ({ restaurant, dispatch, setRestaurantSelected }) => (
  <Card
    style={{ width: '12rem', height: '18rem' }}
    onClick={(e) => selectRestaurant(e, dispatch, setRestaurantSelected, restaurant)}
  >
    <Card.Img variant="top" src={restaurant.picture} />
    <Card.Body>
      <Card.Title className="card-title">{restaurant.name}</Card.Title>
      <Card.Text className="card-text">
        {/* {restaurant.deliveryFee} */}
        $0 Delivery Fee 25–35 min
        {/* {restaurant.deliveryTime} */}
      </Card.Text>
    </Card.Body>
  </Card>
);

export default RestaurantCard;
