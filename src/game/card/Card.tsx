import { useCallback, useState } from "react";
import BootstrapCard from "react-bootstrap/Card";
import fox from "../../assets/fox.png";
import dog from "../../assets/dog.png";
import "./Card.css";

function Card() {
  const [isFlipped, setFlipped] = useState(false);

  const flipCard = useCallback(() => {
    setFlipped((prev) => !prev);
  }, []);

  return (
    <BootstrapCard
      className={`flip-card ${isFlipped ? "flipped" : ""}`}
      style={{
        //TODO move styles to a CSS module file, use className
        width: "100px",
        height: "150px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={flipCard}
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
  );
}

export default Card;
