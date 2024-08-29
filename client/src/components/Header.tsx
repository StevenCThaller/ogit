import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
function Header() {
  const {
    auth: { isAuthenticated, user },
    signOut,
  } = useAuth();

  const homeUrl: string = isAuthenticated ? `/${user._id}/dashboard` : "/auth";

  return (
    <Navbar expand="md" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to={homeUrl}>
          OGIT
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="top-nav" />
        <Navbar.Collapse id="top-nav">
          {isAuthenticated && (
            <Nav className="me-auto">
              <Nav.Link as={Link} to={`/${user._id}/create`}>
                Pin
              </Nav.Link>
              <Nav.Link as={Link} to={`/${user._id}/explore`}>
                Explore
              </Nav.Link>
            </Nav>
          )}
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <Nav.Link onClick={signOut}>Log Out</Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/auth">
                Sign In
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
