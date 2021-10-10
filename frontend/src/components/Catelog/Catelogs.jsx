import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ItemsCarousel from 'react-items-carousel';
import { Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router';
import axios from 'axios';
import RestaurantCard from './RestaurantCard';
import './Catelog.css';
import CategoryCard from './CategoryCard';

const config = require('../../config/config.json');

const env = process.env.NODE_ENV || 'development';
const { url } = config[env];

const categories = require('./Categories.json');

const GROUP_SIZE = 4;
const CATEGORY_GROUP_SIZE = 5;

const Catelogs = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [restaurantSelected, setRestaurantSelected] = useState(false);
  const [popularCards, setPopularCards] = useState([]);
  const [allCards, setAllCards] = useState([]);
  const dispatch = useDispatch();

  const getPopularCards = (restaurants) => restaurants.map((restaurant) => (
    <RestaurantCard
      restaurant={restaurant}
      dispatch={dispatch}
      setRestaurantSelected={setRestaurantSelected}
      key={restaurant.id}
    />
  ));

  const getAllCards = (restaurants) => {
    const groups = [];
    restaurants.forEach((restaurant, index) => {
      if (index % GROUP_SIZE === 0) {
        groups.push([restaurant]);
      } else {
        groups[groups.length - 1].push(restaurant);
      }
    });

    return groups.map((group) => {
      const cols = group.map((restaurant) => (
        <Col className="restaurant-card">
          <RestaurantCard
            restaurant={restaurant}
            dispatch={dispatch}
            setRestaurantSelected={setRestaurantSelected}
            key={restaurant.id}
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

  const getRestaurants = async () => {
    const path = '/restaurant/getAll';
    try {
      const response = await axios.get(url + path);
      if (response.status === 200
        && response.data.restaurants != null
        && response.data.restaurants) {
        const { restaurants } = response.data;
        setPopularCards(getPopularCards(restaurants));
        setAllCards(getAllCards(restaurants));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  const chevronWidth = 40;
  const redirect = restaurantSelected ? (<Redirect to="/menu" />) : '';

  const categoriesGroups = [];
  categories.forEach((category, index) => {
    if (index % CATEGORY_GROUP_SIZE === 0) {
      categoriesGroups.push([category]);
    } else {
      categoriesGroups[categoriesGroups.length - 1].push(category);
    }
  });

  const categoryCards = categoriesGroups.map((group) => {
    const cols = group.map((category) => (
      <Col className="restaurant-card">
        <CategoryCard category={category} id={category.id} />
      </Col>
    ));
    return (
      <Row>
        {cols}
      </Row>
    );
  });

  return (
    <div className="right">
      {redirect}
      <h2 className="stay-left">Popular Near You</h2>
      <div style={{ padding: `0 ${chevronWidth}px` }}>
        <ItemsCarousel
          infiniteLoop={false}
          gutter={0}
          activePosition="center"
          chevronWidth={60}
          disableSwipe={false}
          alwaysShowChevrons={false}
          numberOfCards={2}
          slidesToScroll={2}
          outsideChevron
          showSlither={false}
          firstAndLastGutter={false}
          activeItemIndex={activeItemIndex}
          requestToChangeActive={setActiveItemIndex}
          rightChevron=">"
          leftChevron="<"
        >
          {popularCards}
        </ItemsCarousel>
      </div>
      <h2 className="stay-left">Exlpore By Category</h2>
      <Container fluid>
        {categoryCards}
      </Container>
      <Container fluid>
        {allCards}
      </Container>
    </div>
  );
};

export default Catelogs;
