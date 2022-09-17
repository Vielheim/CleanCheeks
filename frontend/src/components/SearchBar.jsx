import React, { useState } from 'react';
import FilterModal from './FilterModal';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import { BsFilter, BsSearch } from 'react-icons/bs';
import { throttle } from 'lodash';
import focused_face from '../assets/focused_face.png';

import './SearchBar.scss';

const SearchBar = ({ filters, setFilters, venues }) => {
  let searchTimeoutId = 0;
  const [tempSearch, setTempSearch] = useState('');
  const [isShowList, setIsShowList] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

  const handleModalClose = () => {
    setIsShowModal(false);
  };

  const handleModalSubmit = ({ gender, haveShowers }) => {
    setFilters({
      ...filters,
      gender,
      haveShowers,
    });
  };

  const onSearchChange = ({ target: { value } }) => {
    setTempSearch(value);
  };

  const onFormBlur = () => {
    searchTimeoutId = setTimeout(() => setIsShowList(false), 500);
  };

  const onListFocus = () => {
    if (searchTimeoutId > 0) {
      clearTimeout(searchTimeoutId);
    }
  };

  const onListItemClick = ({ target: { value } }) => {
    setFilters({
      ...filters,
      search: value,
    });
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
    <>
      <Container className="filter-row">
        <Row>
          <Col xs={10}>
            <InputGroup>
              <InputGroup.Text className="p-0">
                <img src={focused_face} height={30} width={38} />
              </InputGroup.Text>
              <Form.Control
                placeholder="Where are you? Eg: UTown"
                onChange={onSearchChange}
                onFocus={() => setIsShowList(true)}
                onBlur={onFormBlur}
                value={tempSearch}
              />
            </InputGroup>
          </Col>
          <Col
            className="d-flex justify-content-end filter-modal-button"
            xs={2}
          >
            <Button onClick={() => setIsShowModal(true)}>
              <BsFilter height={22} />
            </Button>
          </Col>
        </Row>
        {isShowList && (
          <Row className="mt-1">
            <Col>
              <ListGroup
                className="list-group"
                onFocus={onListFocus}
                onBlur={() => setIsShowList(false)}
              >
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
            </Col>
          </Row>
        )}
      </Container>
      <FilterModal
        show={isShowModal}
        handleModalClose={handleModalClose}
        handleModalSubmit={handleModalSubmit}
        state={filters}
      />
    </>
  );
};

export default SearchBar;
