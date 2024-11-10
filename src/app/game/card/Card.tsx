import BootstrapCard from "react-bootstrap/Card";
import styles from "./Card.module.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { flipCard, selectCardByIndex } from "../game.slice";
import { useCallback } from "react";

//TODO use alias for long include paths (store)

interface CardProps {
  index: number;
}

function Card({ index }: CardProps) {
  const card = useAppSelector((state) => selectCardByIndex(state, index));
  const dispatch = useAppDispatch();

  const handleFlip = useCallback(() => {
    if (!card.isFlipped) {
      dispatch(flipCard(index));
    }
  }, [card, dispatch, index]);

  return card ? (
    <div
      className={`${styles.flipCard} ${card.isFlipped ? styles.flipped : ""} ${styles.bootstrapCardStyle} `}
      onClick={handleFlip}
      data-testid="card-testid"
    >
      <div className={styles.flipCardInner}>
        <div className={styles.flipCardFront}>
          <div className={styles.cardContent}>
            <BootstrapCard.Img
              src={card.imageRef}
              className={styles.cardImage}
            />
          </div>
        </div>
        <div className={styles.flipCardBack}>
          <div className={styles.cardContent}></div>
        </div>
      </div>
    </div>
  ) : null;
}

export default Card;
