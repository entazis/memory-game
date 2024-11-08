import BootstrapCard from "react-bootstrap/Card";
import dog from "../../assets/dog.png";
import styles from "./Card.module.css";
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
      className={`${styles.flipCard} ${card.isFlipped ? styles.flipped : ""} ${styles.bootstrapCardStyle}`}
      onClick={handleFlip}
    >
      <div className={styles.flipCardInner}>
        <div className={styles.flipCardFront}>
          <div className={styles.cardContent}>
            <BootstrapCard.Title>{card.id}</BootstrapCard.Title>
            <BootstrapCard.Img
              variant="top"
              // src={fox}
              className={styles.bootstrapCard}
            />
          </div>
        </div>
        <div className={styles.flipCardBack}>
          <div className={styles.cardContent}>
            <BootstrapCard.Title>{card.id}</BootstrapCard.Title>
            <BootstrapCard.Img
              variant="top"
              src={dog}
              className={styles.bootstrapCard}
            />
          </div>
        </div>
      </div>
    </BootstrapCard>
  ) : null;
}

export default Card;
