import BootstrapCard from "react-bootstrap/Card";
import dog from "../../assets/dog.png";
import "./Card.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { flipCard, selectCardByIndex } from "../game.slice";
import { useCallback } from "react";

interface CardProps {
  index: number;
}

//TODO use font awesome icons for the cards

function Card({ index }: CardProps) {
  const card = useAppSelector((state) => selectCardByIndex(state, index));
  const dispatch = useAppDispatch();

  const handleFlip = useCallback(() => {
    if (!card.isFlipped) {
      dispatch(flipCard(index));
    }
  }, [card, dispatch, index]);

  return card ? (
    <BootstrapCard
      className={`flip-card ${card.isFlipped ? "flipped" : ""}`}
      style={{
        //TODO move styles to a CSS module file, use className
        width: "100px",
        height: "150px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={handleFlip}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div className="card-content">
            <BootstrapCard.Title>{card.id}</BootstrapCard.Title>
            <BootstrapCard.Img
              variant="top"
              // src={fox}
              className="bootstrap-card"
            />
          </div>
        </div>
        <div className="flip-card-back">
          <div className="card-content">
            <BootstrapCard.Title>{card.id}</BootstrapCard.Title>
            <BootstrapCard.Img
              variant="top"
              src={dog}
              className="bootstrap-card"
            />
          </div>
        </div>
      </div>
    </BootstrapCard>
  ) : null;
}

export default Card;
