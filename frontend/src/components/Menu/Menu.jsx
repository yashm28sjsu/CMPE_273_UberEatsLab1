import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import DishCard from './DishCard';
import './Menu.css';
import DishModal from './DishModal';

const dishes = require('./Dishes.json');

const GROUP_SIZE = 5;

const Menu = () => {
  const [show, setShow] = useState(false);
  const [selectedDish, setSelectedDish] = useState({});
  const selectedRestaurant = useSelector((state) => state.restaurant);
  const existing = useSelector((state) => (
    state.dishes.dishes.filter((dishState) => dishState.name === selectedDish.name)
  ));
  const backgroundImage = {
    height: '30%',
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.6)), url(${selectedRestaurant.url})`,
  };

  const dishesGroups = [];
  dishes.forEach((dish, index) => {
    if (index % GROUP_SIZE === 0) {
      dishesGroups.push([dish]);
    } else {
      dishesGroups[dishesGroups.length - 1].push(dish);
    }
  });

  const dishCards = dishesGroups.map((group) => {
    const cols = group.map((dish) => (
      <Col className="restaurant-card">
        <DishCard
          dish={dish}
          key={dish.name}
          show={show}
          setShow={setShow}
          setSelectedDish={setSelectedDish}
        />
      </Col>
    ));
    return (
      <Row>
        {cols}
      </Row>
    );
  });

  return (
    <div className="Menu">
      <div style={backgroundImage}>
        <h1 className="menu-title">{selectedRestaurant.title}</h1>
      </div>
      <Container fluid className="dish-container" style={{ marginLeft: '30px' }}>
        {dishCards}
      </Container>
      <DishModal
        dish={selectedDish}
        show={show}
        setShow={setShow}
        restaurant={selectedRestaurant}
        defaultQty={existing.length > 0 ? existing[0].qty : 0}
      />
    </div>
  );
};

export default Menu;
