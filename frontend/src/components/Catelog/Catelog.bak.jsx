import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import { Container, Row, Col } from 'react-bootstrap';
import RestaurantCard from './RestaurantCard';
import './Catelog.css';

// const restaurants = require('./Catelog.json');

const GROUP_SIZE = 3;

const Catelog = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;

  // const popularCards = restaurants.map((restaurant) => (
  //   <RestaurantCard restaurant={restaurant} key={restaurant.url} />
  // ));

  // const groups = [];
  // restaurants.forEach((restaurant, index) => {
  //   if (index % GROUP_SIZE === 0) {
  //     groups.push([restaurant]);
  //   } else {
  //     groups[groups.length - 1].push(restaurant);
  //   }
  // });

  // const allCards = groups.map((group) => {
  //   const cols = group.map((restaurant) => (
  //     <Col>
  //       <RestaurantCard restaurant={restaurant} key={restaurant.url} />
  //     </Col>
  //   ));
  //   return (
  //     <Row>
  //       {cols}
  //     </Row>
  //   );
  // });

  return (
    <div className="right">
      <h2 className="stay-left">Popular Near You</h2>
      {/* <div style={{ padding: `0 ${chevronWidth}px` }}>
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
      <br />
      <Container fluid>
         {allCards}
  </Container> */}
    </div>
  );
};

export default Catelog;
