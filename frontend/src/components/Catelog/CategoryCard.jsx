import React from 'react';
import { Card } from 'react-bootstrap';

const CategoryCard = ({ category }) => (
  <Card style={{ width: '8rem', height: '8rem' }}>
    <Card.Img variant="top" src={category.icon} className="category" />
    <Card.Body>
      <Card.Title className="card-title">{category.alt}</Card.Title>
    </Card.Body>
  </Card>
);

export default CategoryCard;
