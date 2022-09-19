import React, { useState } from 'react';
import FilterOptions from './FilterOptions';
import { useMap } from 'react-leaflet';
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
  let filterTimeoutId = 0;
  const map = useMap();
  const [tempSearch, setTempSearch] = useState('');
  const [isShowList, setIsShowList] = useState(false);
  const [isShowFilters, setIsShowFilters] = useState(false);

  // filter options event handlers
  const handleOptionsFocus = () => {
    if (filterTimeoutId > 0) {
      clearTimeout(filterTimeoutId);
    }
  };

  const onSearchChange = ({ target: { value } }) => {
    setTempSearch(value);
  };

  // form event handlers
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

  const onFormKeyDown = ({ key }) => {
    if (key === 'Escape') {
      onFormBlur();
    }
  };

  // dropdown venues list event handlers
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

  // filter button event handlers
  const onFilterFocus = () => {
    if (filterTimeoutId > 0) {
      clearTimeout(filterTimeoutId);
    }
  };

  const onFilterBlur = () => {
    filterTimeoutId = setTimeout(() => setIsShowFilters(false), 300);
  };

  const handleFilterChange = ({ types, haveShowers }) => {
    setFilters((filters) => ({
      ...filters,
      types,
      haveShowers,
    }));
  };

  const filterVenues = (venues) =>
    Object.keys(venues).filter(
      (id) =>
        id.toLowerCase().includes(tempSearch.toLowerCase()) ||
        venues[id].roomName.toLowerCase().includes(tempSearch.toLowerCase())
    );

  const thrFilterVenues = throttle(filterVenues, 1000);

  // stops the map from being dragged underneath when drag and scroll
  // venues list on mobile
  const onCapture = (event) => {
    event.stopPropagation();
  };

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
              onKeyDown={onFormKeyDown}
              value={tempSearch}
            />
            <Collapse in={!isShowList} dimension="width">
              <div>
                <Button
                  className="filter-options-button"
                  onClick={() => setIsShowFilters(!isShowFilters)}
                  onFocus={onFilterFocus}
                  onBlur={onFilterBlur}
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
                  onBlur={() => setIsShowList(false)}
                  onClick={onListItemClick}
                  onTouchMoveCapture={onCapture}
                  onMouseDownCapture={() => map.dragging.disable()}
                  onMouseUpCapture={() => map.dragging.enable()}
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
                handleFilterChange={handleFilterChange}
                handleOptionsFocus={handleOptionsFocus}
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
