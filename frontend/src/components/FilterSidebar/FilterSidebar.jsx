import React from 'react';
import {
  Form, Row, Col,
} from 'react-bootstrap';
import './FilterSidebar.css';

const FilterSidebar = () => (
  <div className="left">
    <h3 className="stay-left">All Stores</h3>
    <Form className="stay-left">
      <Form.Group as={Row} className="mb-3">
        <Col sm="10">
          <div className="mb-3">
            <span className="filter-label">Delivery Mode</span>
            <br />
            <Form.Check
              inline
              selected
              label="Delivery"
              name="deliveryMode"
              type="radio"
            />
            <Form.Check
              inline
              label="Pickup"
              name="deliveryMode"
              type="radio"
            />
          </div>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Col sm="10">
          <div className="mb-3">
            <span className="filter-label">Dietary</span>
            <br />
            <Form.Check
              inline
              label="Vegetarian"
              name="dietary"
              type="checkbox"
            />
            <Form.Check
              inline
              label="Vegan"
              name="dietary"
              type="checkbox"
            />
          </div>
        </Col>
      </Form.Group>
    </Form>
  </div>
);

export default FilterSidebar;
