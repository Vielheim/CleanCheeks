import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { BiMale, BiFemale, BiHandicap } from 'react-icons/bi';

import { TOILET_TYPE } from '../constants';
import './FilterOptions.scss';

const FilterOptions = ({ state, handleFilterChange, handleOptionsFocus }) => {
  const onFieldsChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    if (name === 'haveShowers') {
      handleFilterChange({
        ...state,
        haveShowers: !state.haveShowers,
      });
    } else {
      handleFilterChange({
        ...state,
        gender: value,
      });
    }
  };

  return (
    <Card onFocus={handleOptionsFocus}>
      <Card.Body>
        <Card.Title>Filters</Card.Title>
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
              checked={state.haveShowers}
            />
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default FilterOptions;
