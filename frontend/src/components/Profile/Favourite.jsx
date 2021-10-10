import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import RestaurantCard from '../Catelog/RestaurantCard';

const config = require('../../config/config.json');

const env = process.env.node_env || 'development';
const { url } = config[env];
const GROUP_SIZE = 4;

const Favourite = () => {
  const user = useSelector((state) => state.user);
  const [favouriteCards, setFavouriteCards] = useState([]);
  const [restaurantSelected, setRestaurantSelected] = useState(false);
  const dispatch = useDispatch();

  const redirect = restaurantSelected ? (<Redirect to="/menu" />) : '';

  const getFavouriteCards = (favourites) => {
    const groups = [];
    favourites.forEach((favourite, index) => {
      if (index % GROUP_SIZE === 0) {
        groups.push([favourite]);
      } else {
        groups[groups.length - 1].push(favourite);
      }
    });
    return groups.map((group) => {
      const cols = group.map((fav) => {
        const { Restaurant, ...favourite } = fav;
        return (
          <Col className="restaurant-card">
            <RestaurantCard
              restaurant={Restaurant}
              dispatch={dispatch}
              setRestaurantSelected={setRestaurantSelected}
              existingFavourite={[favourite]}
              key={Restaurant.id}
            />
          </Col>
        );
      });
      return (
        <Row>
          {cols}
        </Row>
      );
    });
  };

  const getFavouritesWithRestaurant = async () => {
    const path = '/favourites/getFavouritesWithRestaurant/';
    try {
      const headers = {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      };
      const response = await axios.post(url + path, { id: user.id }, { headers });
      if (response.status === 200
        && response.error == null) {
        setFavouriteCards(getFavouriteCards(response.data.favourites));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFavouritesWithRestaurant();
  }, []);
  return (
    <div>
      {redirect}
      <Container fluid>
        {favouriteCards}
      </Container>
    </div>
  );
};

export default Favourite;
