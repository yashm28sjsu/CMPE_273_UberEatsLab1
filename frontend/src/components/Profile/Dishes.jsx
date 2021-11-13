import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Button, Col, Container, Row,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import DishCard from '../Menu/DishCard';
import DishModal from './DishModal';

const config = require('../../config/config.json');

const env = process.env.NODE_ENV || 'development';
const { url } = config[env];

const GROUP_SIZE = 5;

const Dishes = () => {
  const user = useSelector((state) => state.user);
  const [dishCards, setDishCards] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedDish, setSelectedDish] = useState(false);

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
    const path = '/restaurant/getDishes';
    try {
      const headers = {
        Authorization: `JWT ${window.localStorage.getItem('token')}`,
      };
      // eslint-disable-next-line no-underscore-dangle
      const response = await axios.post(url + path, { restaurantId: user._id }, { headers });
      if (response.status === 200) {
        console.log(JSON.stringify(response.data.response));
        const result = response.data.response;
        if (result.dishes != null
          && result.dishes) {
          const { dishes } = result;
          setDishCards(getDishCards(dishes));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const newDish = () => {
    setSelectedDish({
      name: '', ingredients: '', price: 0, image: '', type: '',
    });
    setShow(true);
  };

  useEffect(() => {
    getDishes();
  }, []);

  return (
    <div>
      <Button variant="primary" style={{ backgroundColor: '#4F9300', border: 'none' }} onClick={(_e) => newDish()}>
        Add New Dish
      </Button>
      <Container fluid className="dish-container" style={{ marginLeft: '30px' }}>
        {dishCards}
      </Container>
      <DishModal
        dish={selectedDish}
        show={show}
        setShow={setShow}
      />
    </div>
  );
};

export default Dishes;
