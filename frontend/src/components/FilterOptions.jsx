import React from 'react';

import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { BiMale, BiFemale, BiHandicap } from 'react-icons/bi';

import { ToiletType, Utilities } from '../enums/ToiletEnums';
import './FilterOptions.scss';

const FilterOptions = ({ state, handleFilterChange, handleOptionsFocus }) => {
  const onUtilitiesChange = ({ target }) => {
    const { value } = target;
    const updatedUtilities = state.utilities.includes(value)
      ? state.utilities.filter((utility) => utility !== value)
      : [...state.utilities, value];
    handleFilterChange({
      ...state,
      utilities: updatedUtilities,
    });
  };

  const onTypesChange = ({ target }) => {
    const { value } = target;
    const updatedTypes = state.types.includes(value)
      ? state.types.filter((type) => type !== value)
      : [...state.types, value];
    handleFilterChange({
      ...state,
      types: updatedTypes,
    });
  };

  const captureOnClick = (event) => {
    event.stopPropagation();
  };

  return (
    <Card onClick={handleOptionsFocus}>
      <Card.Body>
        <Card.Title>Filters</Card.Title>
        <Container>
          <Row className="mb-2">
            <h6>I am looking for:</h6>
          </Row>

          <Row className="mb-3">
            <ToggleButtonGroup
              type="checkbox"
              defaultValue={state.types}
              onClick={onTypesChange}
            >
              <ToggleButton
                id="tb-male"
                value={ToiletType.MALE}
                onClickCapture={captureOnClick}
                variant="outline-primary"
              >
                <BiMale size={32} />
              </ToggleButton>

              <ToggleButton
                id="tb-female"
                value={ToiletType.FEMALE}
                onClickCapture={captureOnClick}
                variant="outline-primary"
              >
                <BiFemale size={32} />
              </ToggleButton>

              <ToggleButton
                id="tb-handicap"
                value={ToiletType.HANDICAP}
                onClickCapture={captureOnClick}
                variant="outline-primary"
              >
                <BiHandicap size={32} />
              </ToggleButton>
            </ToggleButtonGroup>
          </Row>

          <Row className="mb-2">
            <h6>Utilities</h6>
          </Row>

          <Form defaultValue={state.utilities} onClick={onUtilitiesChange}>
            <Row>
              <Col>
                <Form.Check
                  className="checkbox"
                  inline
                  label="Fragrance"
                  value={Utilities.FRAGRANCE}
                ></Form.Check>
              </Col>
              <Col>
                <Form.Check
                  className="checkbox"
                  inline
                  label="Watercooler"
                  value={Utilities.WATERCOOLER}
                ></Form.Check>
              </Col>
            </Row>
          </Form>

          <Form defaultValue={state.utilities} onClick={onUtilitiesChange}>
            <Row>
              <Col>
                <Form.Check
                  className="checkbox"
                  inline
                  label="Bidets"
                  value={Utilities.BIDETS}
                ></Form.Check>
              </Col>
              <Col>
                <Form.Check
                  className="checkbox"
                  inline
                  label="Showers"
                  value={Utilities.SHOWERS}
                ></Form.Check>
              </Col>
            </Row>
          </Form>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default FilterOptions;
