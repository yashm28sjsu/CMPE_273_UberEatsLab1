import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Form, Row, Col,
} from 'react-bootstrap';
import actions from '../../actions/search';
import './FilterSidebar.css';

const FilterSidebar = () => {
  const dispatch = useDispatch();

  const deliveryModeUpdated = () => {

  };

  return (
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
                onClick={(_e) => dispatch(actions.getDeliveryModeUpdatedAction('DELIVERY'))}
              />
              <Form.Check
                inline
                label="Pickup"
                name="deliveryMode"
                type="radio"
                onClick={(_e) => dispatch(actions.getDeliveryModeUpdatedAction('DELIVERY'))}
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
                onClick={(e) => dispatch(actions.getVegUpdatedAction(e.target.value))}
              />
              <Form.Check
                inline
                label="Vegan"
                name="dietary"
                type="checkbox"
                onClick={(e) => dispatch(actions.getVeganUpdatedAction(e.target.value))}
              />
            </div>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

export default FilterSidebar;
