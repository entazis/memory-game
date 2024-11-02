import { Col, Row } from "react-bootstrap";
import { Info, Logo, Menu } from "./components";

function Header() {
  return (
    <Row>
      <Col>
        <Logo />
      </Col>
      <Col>
        <Info />
      </Col>
      <Col>
        <Menu />
      </Col>
    </Row>
  );
}

export default Header;
