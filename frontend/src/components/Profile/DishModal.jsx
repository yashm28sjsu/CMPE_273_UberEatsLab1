import React, { useEffect, useState } from 'react';
import {
  Button, Col, Form, Modal, Row,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';

const config = require('../../config/config.json');

const env = process.env.NODE_ENV || 'development';
const { url } = config[env];

const DishModal = ({ show, setShow, dish }) => {
  const user = useSelector((state) => state.user);
  const [image, setImage] = useState('');
  const [dishData, setDishData] = useState({});
  const [imageURL, setImageURL] = useState('');
  // console.log(dish);
  const onChangeListener = (e) => {
    const key = e.target.getAttribute('name');
    const { value } = e.target;
    console.log(JSON.stringify(dishData));
    const clone = { ...dishData };
    clone[key] = value;
    setDishData(clone);
  };

  const setFile = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    const path = '/file/upload';
    const formData = new FormData();
    formData.append('file', image);
    const headers = {
      Authorization: `JWT ${window.localStorage.getItem('token')}`,
      // 'Content-Type': 'multipart/form-data',
    };
    const response = await axios.post(
      url + path,
      // eslint-disable-next-line no-underscore-dangle
      formData,
      { headers },
    );
    if (response.status === 200) {
      if (response.error != null) {
        console.log(response.error);
      } else {
        setImageURL(response.data.url);
      }
    }
  };

  const handleClose = () => setShow(false);
  const saveDish = async () => {
    // eslint-disable-next-line no-underscore-dangle
    const path = dish._id ? '/dish/update' : '/dish/create/';
    console.log(JSON.stringify(dishData));
    // eslint-disable-next-line no-unused-vars
    // const { createdAt, updatedAt, ...payload } = dishData;
    try {
      const headers = {
        Authorization: `JWT ${window.localStorage.getItem('token')}`,
      };
      const response = await axios.post(
        url + path,
        // eslint-disable-next-line no-underscore-dangle
        { ...dishData, restaurantId: user._id, image: imageURL },
        { headers },
      );
      if (response.status === 200
        && response.error == null) {
        handleClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const { _id, __v, ...remaining } = dish;
    setDishData({ ...remaining, id: _id });
    setImageURL(dish.image);
  }, [dish]);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{dish.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body />
        <Form className="modal-form">
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Name
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" defaultValue={dish.name} className="modal-Qty" name="name" onChange={(e) => onChangeListener(e)} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Description
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" defaultValue={dish.description} className="modal-Qty" name="description" onChange={(e) => onChangeListener(e)} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Image
            </Form.Label>
            <Col sm="10">
              {imageURL !== '' ? <a href={imageURL}>Open Image</a> : '' }
              {/* <Form.Control
                disabled
                type="text"
                defaultValue={dish.image}
                className="modal-Qty"
                name="image"
                id="iamge"
              /> */}
              <Form.Control type="file" onChange={(e) => setFile(e)} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Ingredients
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" defaultValue={dish.ingredients} className="modal-Qty" name="ingredients" onChange={(e) => onChangeListener(e)} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Price
            </Form.Label>
            <Col sm="10">
              <Form.Control type="number" step=".01" defaultValue={dish.price} className="modal-Qty" name="price" onChange={(e) => onChangeListener(e)} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Type
            </Form.Label>
            <Col sm="10">
              <Form.Control as="select" defaultValue={dish.name} className="modal-Qty" name="type" onChange={(e) => onChangeListener(e)}>
                <option value="VEGAN">Vegan</option>
                <option value="">Non-Veg</option>
                <option value="VEG">Vegetarian</option>
              </Form.Control>
            </Col>
          </Form.Group>
        </Form>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpload}>
            Upload
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveDish}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DishModal;
