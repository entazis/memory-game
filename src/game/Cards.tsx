import { Col, Row } from "react-bootstrap";
import Card from "./card/Card";

//TODO render 8 cards on large screen
function Cards() {
  return (
    <Row>
      {Array.from({ length: 3 }).map((_, idx) => (
        <Col xs={4} sm={3} md={2} key={idx}>
          <Card />
        </Col>
      ))}
    </Row>
  );
}

export default Cards;
