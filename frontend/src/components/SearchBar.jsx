import React, { useState } from 'react';
import FilterOptions from './FilterOptions';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import { BsFilter, BsSearch } from 'react-icons/bs';
import throttle from 'lodash/throttle';

import './SearchBar.scss';

const SearchBar = ({ filters, setFilters, venues }) => {
  let searchTimeoutId = 0;
  const [tempSearch, setTempSearch] = useState('');
  const [isShowList, setIsShowList] = useState(false);
  const [isShowFilters, setIsShowFilters] = useState(false);

  const handleModalChange = ({ gender, haveShowers }) => {
    setFilters((filters) => ({
      ...filters,
      gender,
      haveShowers,
    }));
  };

  const onSearchChange = ({ target: { value } }) => {
    setTempSearch(value);
  };

  const onFormFocus = () => {
    if (searchTimeoutId > 0) {
      clearTimeout(searchTimeoutId);
    }
    setIsShowFilters(false);
    setIsShowList(true);
  };

  const onFormBlur = () => {
    searchTimeoutId = setTimeout(() => setIsShowList(false), 300);
  };

  const onListFocus = () => {
    if (searchTimeoutId > 0) {
      clearTimeout(searchTimeoutId);
    }
  };

  const onListItemClick = ({ target: { value } }) => {
    setFilters((filters) => ({
      ...filters,
      search: value,
    }));
    setTempSearch(value);
    setIsShowList(false);
  };

  const filterVenues = (venues) =>
    Object.keys(venues).filter(
      (id) =>
        id.toLowerCase().includes(tempSearch.toLowerCase()) ||
        venues[id].roomName.toLowerCase().includes(tempSearch.toLowerCase())
    );

  const thrFilterVenues = throttle(filterVenues, 1000);

  return (
    <Container className="filter-row">
      <Row>
        <Col>
          <InputGroup>
            <InputGroup.Text>
              <BsSearch />
            </InputGroup.Text>
            <Form.Control
              className="search-bar"
              placeholder="Where are you? Eg: UTown"
              onChange={onSearchChange}
              onFocus={onFormFocus}
              onBlur={onFormBlur}
              value={tempSearch}
            />
            <Collapse in={!isShowList} dimension="width">
              <div>
                <Button
                  className="filter-options-button"
                  onClick={() => setIsShowFilters(!isShowFilters)}
                >
                  <BsFilter height={22} />
                </Button>
              </div>
            </Collapse>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col className="mt-1">
          <Collapse in={isShowList}>
            <ListGroup className="list-group" onFocus={onListFocus}>
              {thrFilterVenues(venues).map((id) => (
                <ListGroup.Item
                  key={id}
                  action
                  onClick={onListItemClick}
                  value={id}
                >
                  {`${id} (${venues[id].roomName})`}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Collapse>
          <Collapse in={isShowFilters}>
            <div>
              <FilterOptions
                handleModalChange={handleModalChange}
                state={filters}
              />
            </div>
          </Collapse>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchBar;
