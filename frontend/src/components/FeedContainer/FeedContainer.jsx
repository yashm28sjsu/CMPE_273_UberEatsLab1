import React from 'react';
import Catelog from '../Catelog/Catelog';
import FilterSidebar from '../FilterSidebar/FilterSidebar';
import './FeedContainer.css';

const FeedContainer = () => (
  <div className="split-vertical">
    <FilterSidebar />
    <Catelog />
  </div>
);

export default FeedContainer;
