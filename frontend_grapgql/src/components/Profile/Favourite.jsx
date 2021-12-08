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
        const { restaurant, ...favourite } = fav;
        return (
          <Col className="restaurant-card">
            <RestaurantCard
              restaurant={restaurant}
              dispatch={dispatch}
              setRestaurantSelected={setRestaurantSelected}
              existingFavourite={[favourite]}
              // eslint-disable-next-line no-underscore-dangle
              key={restaurant._id}
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
    const path = '/user/getFavourites/';
    try {
      const headers = {
        Authorization: `JWT ${window.localStorage.getItem('token')}`,
      };
      // eslint-disable-next-line no-underscore-dangle
      const response = await axios.post(url + path, { userId: user._id }, { headers });
      if (response.status === 200) {
        const result = response.data.response;
        if (response.error == null) {
          setFavouriteCards(getFavouriteCards(result.favourites));
        }
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
