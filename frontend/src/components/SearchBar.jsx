import React, { useState } from "react";
import FilterModal from "./FilterModal";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import { BsFilter, BsSearch } from "react-icons/bs";

import { TOILET_TYPE, VENUES_MOCK } from "./constants";

const INITIAL_FORM_STATE = {
  search: "",
  modal: {
    gender: TOILET_TYPE.MALE,
    haveShowers: false,
  },
};

const SearchBar = () => {
  let searchTimeoutId = 0;
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [isShowList, setIsShowList] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

  const handleModalClose = () => {
    setIsShowModal(false);
  };

  const handleModalOnSubmit = (modalState) => {
    setForm({
      ...form,
      modal: modalState,
    });
  };

  const onSearchChange = ({ target: { value } }) => {
    setForm({
      ...form,
      search: value,
    });
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
    setForm({
      ...form,
      search: value,
    });
    setIsShowList(false);
  };

  const filterVenues = (venues) =>
    venues.filter((venue) =>
      venue.toLowerCase().includes(form.search.toLowerCase())
    );

  return (
    <>
      <Container className="py-2">
        <Row>
          <Col xs={10}>
            <InputGroup className="mb-1 search-row">
              <InputGroup.Text>
                <BsSearch height={24} />
              </InputGroup.Text>
              <Form.Control
                placeholder="Where are you? Eg: UTown"
                onChange={onSearchChange}
                onFocus={() => setIsShowList(true)}
                onBlur={onFormBlur}
                value={form.search}
              />
            </InputGroup>
          </Col>
          <Col className="px-2">
            <Button onClick={() => setIsShowModal(true)}>
              <BsFilter height={24} />
            </Button>
          </Col>
        </Row>
        {isShowList && (
          <Row>
            <Col>
              <ListGroup
                onFocus={onListFocus}
                onBlur={() => setIsShowList(false)}
              >
                {filterVenues(VENUES_MOCK).map((venue) => (
                  <ListGroup.Item
                    key={venue}
                    action
                    onClick={onListItemClick}
                    value={venue}
                  >
                    {venue}
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
        handleModalSubmit={handleModalOnSubmit}
        state={form.modal}
      />
    </>
  );
};

export default SearchBar;
