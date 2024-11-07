import { Col, Container, Row } from "react-bootstrap";
import Card from "./card/Card";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  flipBackUnmatched,
  matchCards,
  selectProgress,
  selectSettings,
  tick,
} from "./game.slice";
import { useEffect } from "react";

function Cards() {
  const { startedAt, endedAt, cards, cardsFlipped } =
    useAppSelector(selectProgress);
  const { flipBackTimeout } = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();

  //TODO refactor
  useEffect(() => {
    if (cardsFlipped.length >= 2) {
      dispatch(matchCards());

      const timer = setTimeout(() => {
        dispatch(flipBackUnmatched());
      }, flipBackTimeout);

      return () => clearTimeout(timer);
    }
  }, [cardsFlipped, flipBackTimeout, dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (startedAt && endedAt) {
        clearInterval(timer);
        return;
      } else if (startedAt) {
        dispatch(tick());
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [startedAt, endedAt, dispatch]);

  //TODO render 8 cards on large screen
  return (
    <Container>
      <Row>
        {cards.map((_, index) => (
          <Col xs={4} sm={3} md={2} key={index}>
            <Card index={index} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Cards;
