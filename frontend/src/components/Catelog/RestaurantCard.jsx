import React from 'react';
import { Card } from 'react-bootstrap';

const RestaurantCard = ({ restaurant }) => (
  <Card style={{ width: '12rem', height: '18rem' }}>
    <Card.Img variant="top" src={restaurant.url} />
    <Card.Body>
      <Card.Title className="card-title">{restaurant.title}</Card.Title>
      <Card.Text class="card-text">
        {restaurant.deliveryFee}
        {' '}
        {restaurant.deliveryTime}
      </Card.Text>
    </Card.Body>
  </Card>
);

export default RestaurantCard;
