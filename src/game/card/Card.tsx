import BootstrapCard from "react-bootstrap/Card";
import fox from "../../assets/fox.png";

function Card() {
  return (
    <BootstrapCard
      style={{
        width: "100px",
        height: "150px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <BootstrapCard.Img
        variant="top"
        src={fox}
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    </BootstrapCard>
  );
}

export default Card;
