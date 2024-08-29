import { Container } from "react-bootstrap";
import LocalMap from "../LocalMap";

function Feed() {
  return (
    <Container className="feed" as="main">
      <LocalMap />
    </Container>
  );
}

export default Feed;
