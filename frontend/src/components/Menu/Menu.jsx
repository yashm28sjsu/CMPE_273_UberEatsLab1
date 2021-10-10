import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import DishCard from './DishCard';
import './Menu.css';
import DishModal from './DishModal';

const config = require('../../config/config.json');

const env = process.env.NODE_ENV || 'development';
const { url } = config[env];

const GROUP_SIZE = 5;

const Menu = () => {
  const [show, setShow] = useState(false);
  const [selectedDish, setSelectedDish] = useState({});
  const selectedRestaurant = useSelector((state) => state.restaurant);
  const existing = useSelector((state) => (
    state.dishes.dishes.filter((dishState) => dishState.name === selectedDish.name)
  ));
  const [dishCards, setDishCards] = useState([]);

  const getDishCards = (dishes) => {
    const dishesGroups = [];
    dishes.forEach((dish, index) => {
      if (index % GROUP_SIZE === 0) {
        dishesGroups.push([dish]);
      } else {
        dishesGroups[dishesGroups.length - 1].push(dish);
      }
    });

    return dishesGroups.map((group) => {
      const cols = group.map((dish) => (
        <Col className="restaurant-card">
          <DishCard
            dish={dish}
            key={dish.id}
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
  };

  const getDishes = async () => {
    const path = `/dish/getDishes/${selectedRestaurant.id}`;
    try {
      const response = await axios.get(url + path);
      if (response.status === 200
        && response.data.dishes != null
        && response.data.dishes) {
        const { dishes } = response.data;
        console.log(dishes);
        setDishCards(getDishCards(dishes));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDishes();
  }, []);

  const backgroundImage = {
    height: '30%',
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.6)), url(${selectedRestaurant.picture})`,
  };

  return (
    <div className="Menu">
      <div style={backgroundImage}>
        <h1 className="menu-title">{selectedRestaurant.name}</h1>
        <p className="menu-subtitle">{selectedRestaurant.description}</p>
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
