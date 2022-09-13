import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { BiMale, BiFemale, BiHandicap } from 'react-icons/bi';

import { TOILET_TYPE } from './constants';
import './FilterModal.scss';

const FilterModal = ({ show, state, handleModalClose, handleModalSubmit }) => {
  const [modalState, setModalState] = useState(state);
  const onFieldsChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    if (name === 'haveShowers') {
      setModalState({
        ...modalState,
        haveShowers: !modalState.haveShowers,
      });
    } else {
      setModalState({
        ...modalState,
        gender: value,
      });
    }
  };

  const onSubmit = () => {
    handleModalSubmit(modalState);
    handleModalClose();
  };

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Apply Filters</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="mb-2">
            <h6>I am looking for:</h6>
          </Row>

          <Row className="mb-3">
            <Col className="col-4 d-flex justify-content-center">
              <Button
                variant="light"
                value={TOILET_TYPE.MALE}
                onClick={onFieldsChange}
              >
                <BiMale size={32} />
              </Button>
            </Col>
            <Col className="col-4 d-flex justify-content-center">
              <Button
                variant="light"
                value={TOILET_TYPE.FEMALE}
                onClick={onFieldsChange}
              >
                <BiFemale size={32} />
              </Button>
            </Col>
            <Col className="col-4 d-flex justify-content-center">
              <Button
                variant="light"
                value={TOILET_TYPE.HANDICAPPED}
                onClick={onFieldsChange}
              >
                <BiHandicap size={32} />
              </Button>
            </Col>
          </Row>

          <Row className="mb-2">
            <h6>Utilities</h6>
          </Row>
          <Row>
            <Form.Check
              className="checkbox"
              label="Showers"
              name="haveShowers"
              onChange={onFieldsChange}
              checked={modalState.haveShowers}
            />
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterModal;
