import React, { useState } from 'react';
import FilterOptions from './FilterOptions';
import { useMap } from 'react-leaflet';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import { BsSearch } from 'react-icons/bs';
import throttle from 'lodash/throttle';

import styles from './SearchBar.module.scss';

const SearchBar = ({ state, dispatch, venues }) => {
  let searchTimeoutId = 0;
  const map = useMap();
  const [tempSearch, setTempSearch] = useState('');
  const [isShowList, setIsShowList] = useState(false);

  const setListShown = (value) => {
    setIsShowList(value);
    dispatch({ type: 'expandTopItems', payload: value });
  };

  const onSearchChange = ({ target: { value } }) => {
    if (value === '') {
      setTempSearch(value);
      dispatch({ type: 'updateSearch', payload: value });
    } else {
      setTempSearch(value);
    }
  };

  // form event handlers
  const onFormFocus = () => {
    if (searchTimeoutId > 0) {
      clearTimeout(searchTimeoutId);
    }
    setListShown(true);
  };

  const onFormBlur = () => {
    searchTimeoutId = setTimeout(() => setListShown(false), 300);
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
    dispatch({ type: 'updateSearch', payload: value });
    setTempSearch(value);
    setListShown(false);

    window.gtag('event', 'search', {
      search_term: value,
    });
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
    <Container className={styles['filter-row']}>
      <Row>
        <Col>
          <InputGroup>
            <InputGroup.Text>
              <BsSearch />
            </InputGroup.Text>
            <Form.Control
              type="search"
              className={styles['search-bar']}
              placeholder="Where are you? Eg: UTown"
              onBlur={onFormBlur}
              onChange={onSearchChange}
              onFocus={onFormFocus}
              onKeyDown={onFormKeyDown}
              value={tempSearch}
            />
            <FilterOptions state={state} dispatch={dispatch} />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col className="mt-1">
          <Collapse in={isShowList}>
            <ListGroup
              className={styles['list-group']}
              onFocus={onListFocus}
              onWheelCapture={onCapture}
            >
              {thrFilterVenues(venues).map((id) => (
                <ListGroup.Item
                  key={id}
                  action
                  onBlur={() => setListShown(false)}
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
        </Col>
      </Row>
    </Container>
  );
};

export default SearchBar;
