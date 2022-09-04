import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import {Search} from 'react-bootstrap-icons';

const VENUES_MOCK = [
  "UTown",
  "COM1",
  "ERC",
];

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const [isShowList, setIsShowList] = useState(false);
  const handleOnChange = ({ target: { value } }) => {
    setKeyword(value);
  };
  const filterVenues =
    venues => venues.filter(venue => venue.toLowerCase().includes(keyword.toLowerCase()));


  return (
    <Container>
      <Row>
        <Form onChange={handleOnChange} onFocus={() => setIsShowList(true)}
          onBlur={() => setIsShowList(false)}>
          <InputGroup className="mb-1 search-row">
            <InputGroup.Text><Search height={24}/></InputGroup.Text>            
            <Form.Control
              placeholder="Where are you? Eg: UTown, COM1"
              
            />
          </InputGroup>
        </Form>
    </Row>
    {isShowList &&
      <Row>
        <Col>
          <ListGroup>{filterVenues(VENUES_MOCK).map(venue => <ListGroup.Item key={venue} action>{venue}</ListGroup.Item>)}</ListGroup>
        </Col>
      </Row>
    }
    </Container>
  );
};

export default SearchBar;