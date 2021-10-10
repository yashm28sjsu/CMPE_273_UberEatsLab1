import React from 'react';
import { Card } from 'react-bootstrap';

const DishCard = ({
  dish, setShow, setSelectedDish,
}) => {
  const selectDish = (e) => {
    e.preventDefault();
    setSelectedDish(dish);
    setShow(true);
  };

  return (
    <Card
      style={{ width: '12rem', height: '20rem' }}
      onClick={(e) => selectDish(e)}
    >
      <Card.Title className="card-title" style={{ margin: '10px' }}>{dish.name}</Card.Title>
      <Card.Img variant="top" src={dish.image} style={{ height: '150px', width: '100%' }} />
      <Card.Body>
        <Card.Title className="card-title">{`$${Math.round(dish.price * 100) / 100}`}</Card.Title>
        <Card.Text className="card-text">
          {dish.description.length <= 50 ? dish.description : `${dish.description.substring(0, 49)}...`}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default DishCard;
