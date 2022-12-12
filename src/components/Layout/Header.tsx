import { Container, Row, Col } from 'react-bootstrap';
import { Heart } from 'react-ionicons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { SearchComponent } from '../SearchComponent';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <Container className="bg-dark text-light" fluid>
      <Container>
        <Row className="d-flex flex-row justify-content-center align-items-center text-center" style={{ height: '120px' }}>
          <Col md={4} sm={12}>
            <h4>UnlockCommerce</h4>
          </Col>
          <Col md={4} sm={12}>
            <SearchComponent />
          </Col>
          <Col md={4} sm={12}>
            <Heart
              color="#a83f39"
              onClick={() => navigate('/favorites')}
              title={`Add ${name} to favorites`}
              height="30px"
              width="30px"
              cssClasses="pointer mr-5"
            />
            <Link className="text-light" to="/favorites">
              Favorites List
            </Link>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
