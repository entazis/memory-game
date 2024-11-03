import BootstrapCard from "react-bootstrap/Card";
import fox from "../../assets/fox.png";
import dog from "../../assets/dog.png";
import "./Card.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { flipCard, selectCardById } from "../gameSlice";
import { useCallback } from "react";

interface CardProps {
  id: string;
  index: number;
}

function Card({ id, index }: CardProps) {
  const card = useAppSelector((state) => selectCardById(state, id));
  const dispatch = useAppDispatch();

  //FIXME both cards are flipped
  const handleFlip = useCallback(() => {
    dispatch(flipCard(index));
  }, [dispatch, index]);

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
            <BootstrapCard.Img
              variant="top"
              src={fox}
              className="bootstrap-card"
            />
          </div>
        </div>
        <div className="flip-card-back">
          <div className="card-content">
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
