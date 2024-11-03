import { Col, Container, Row } from "react-bootstrap";
import Card from "./card/Card";
import { useAppSelector } from "../store/hooks";
import { selectDeck } from "./gameSlice";

function Cards() {
  const deck = useAppSelector(selectDeck);

  //TODO render 8 cards on large screen
  return (
    <Container>
      <Row>
        {deck.cards.map((card) => (
          <Col xs={4} sm={3} md={2} key={card.id}>
            <Card id={card.id} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Cards;
