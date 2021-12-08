import React from 'react';
import Catelogs from '../Catelog/Catelogs';
import FilterSidebar from '../FilterSidebar/FilterSidebar';
import './FeedContainer.css';

const FeedContainer = () => (
  <div className="split-vertical">
    <FilterSidebar />
    <Catelogs />
  </div>
);

export default FeedContainer;
