import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import './Catelog.css';
import RestaurantCard from './RestaurantCard';

const restaurants = require('./catelog.json');

const Catelog = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;

  const cards = restaurants.map((restaurant, index) => (
    <RestaurantCard restaurant={restaurant} key={restaurant.url} />
  ));

  return (
    <div className="right">
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
          {cards}
        </ItemsCarousel>
      </div>
    </div>
  );
};

export default Catelog;
