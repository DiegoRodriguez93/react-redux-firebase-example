import { Navbar as BootstrapNavBar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const isActiveStyle = ({ isActive }: { isActive: boolean }) => (isActive ? 'text-primary nav-link' : 'nav-link');

  return (
    <Container fluid>
      <BootstrapNavBar bg="light" expand="lg">
        <Container>
          <Nav className="me-auto d-flex justify-content-center w-100">
            <NavLink className={isActiveStyle} to="/">
              Home
            </NavLink>
            <NavLink className={isActiveStyle} to="/favorites">
              Favorites
            </NavLink>
            <NavLink className={isActiveStyle} to="/admin-dashboard">
              Admin Dashboard
            </NavLink>
          </Nav>
        </Container>
      </BootstrapNavBar>
    </Container>
  );
};
