import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ToiletRatingButtons = ({ rateCleanToilet, rateDirtyToilet }) => {
  return (
    <Row>
      <Col className="text-center">
        <Button variant="danger" onClick={rateDirtyToilet}>
          {'Dirty! >:('}
        </Button>
      </Col>

      <Col className="text-center">
        <Button variant="success" onClick={rateCleanToilet}>
          {'Clean! :D'}
        </Button>
      </Col>
    </Row>
  );
};

export default ToiletRatingButtons;
