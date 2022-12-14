import React from 'react';

import { BsFilter } from 'react-icons/bs';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { BiMale, BiFemale, BiHandicap } from 'react-icons/bi';

import { ToiletType, Utilities } from '../enums/ToiletEnums';
import styles from './FilterOptions.module.scss';

const FilterOptions = ({ state, dispatch }) => {
  const onUtilitiesChange = ({ target }) => {
    const { value } = target;
    const updatedUtilities = filters.utilities.includes(value)
      ? filters.utilities.filter((utility) => utility !== value)
      : [...filters.utilities, value];
    dispatch({
      type: 'updateFilters',
      payload: { utilities: updatedUtilities },
    });
  };

  const onTypesChange = ({ target }) => {
    const { value } = target;
    const updatedTypes = filters.types.includes(value)
      ? filters.types.filter((type) => type !== value)
      : [...filters.types, value];
    dispatch({ type: 'updateFilters', payload: { types: updatedTypes } });
  };

  const onShow = (value) => {
    dispatch({ type: 'expandTopItems', payload: value });
  };

  const { filters } = state;

  return (
    <Dropdown autoClose="outside" onToggle={onShow}>
      <Dropdown.Toggle className={styles['filter-options-button']}>
        <BsFilter height={22} />
      </Dropdown.Toggle>
      <Dropdown.Menu className="p-0 container">
        <Card>
          <Card.Body>
            <Card.Title>Filters</Card.Title>

            <Row className="mb-2">
              <h6>I am looking for:</h6>
            </Row>

            <Row className="mb-3">
              <ToggleButtonGroup
                type="checkbox"
                defaultValue={filters.types}
                onClick={onTypesChange}
              >
                <ToggleButton
                  id="tb-male"
                  value={ToiletType.MALE}
                  variant="outline-primary"
                >
                  <BiMale size={32} />
                </ToggleButton>

                <ToggleButton
                  id="tb-female"
                  value={ToiletType.FEMALE}
                  variant="outline-primary"
                >
                  <BiFemale size={32} />
                </ToggleButton>

                <ToggleButton
                  id="tb-handicap"
                  value={ToiletType.HANDICAP}
                  variant="outline-primary"
                >
                  <BiHandicap size={32} />
                </ToggleButton>
              </ToggleButtonGroup>
            </Row>

            <Row className="mb-2">
              <h6>Utilities</h6>
            </Row>

            <Form defaultValue={filters.utilities} onClick={onUtilitiesChange}>
              <Row>
                <Col xs={6}>
                  <Form.Check
                    className={styles['checkbox']}
                    inline
                    label="Fragrance"
                    checked={filters.utilities.includes(Utilities.FRAGRANCE)}
                    onChange={() => {}}
                    value={Utilities.FRAGRANCE}
                  ></Form.Check>
                </Col>
                <Col xs={6}>
                  <Form.Check
                    className={styles['checkbox']}
                    inline
                    label="Watercooler"
                    checked={filters.utilities.includes(Utilities.WATERCOOLER)}
                    onChange={() => {}}
                    value={Utilities.WATERCOOLER}
                  ></Form.Check>
                </Col>
              </Row>
            </Form>

            <Form defaultValue={filters.utilities} onClick={onUtilitiesChange}>
              <Row>
                <Col xs={6}>
                  <Form.Check
                    className={styles['checkbox']}
                    inline
                    label="Bidets"
                    checked={filters.utilities.includes(Utilities.BIDETS)}
                    onChange={() => {}}
                    value={Utilities.BIDETS}
                  ></Form.Check>
                </Col>
                <Col xs={6}>
                  <Form.Check
                    className={styles['checkbox']}
                    inline
                    label="Showers"
                    checked={filters.utilities.includes(Utilities.SHOWERS)}
                    onChange={() => {}}
                    value={Utilities.SHOWERS}
                  ></Form.Check>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default FilterOptions;
