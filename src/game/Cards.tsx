import { Col, Container, Row } from "react-bootstrap";
import Card from "./card/Card";
import { useAppSelector } from "../store/hooks";
import { selectDeck } from "./game.slice";

function Cards() {
  const deck = useAppSelector(selectDeck);

  //TODO render 8 cards on large screen
  return (
    <Container>
      <Row>
        {deck.cards.map((card, index) => (
          <Col xs={4} sm={3} md={2} key={index}>
            <Card id={card.id} index={index} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Cards;
