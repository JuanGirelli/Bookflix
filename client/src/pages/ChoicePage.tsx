import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
const ChoicePage = () => {
  const navigate = useNavigate();

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    alert('Logout successful');
    navigate('/login');  // Redirect to login page after logout
  };

  return (
    <Container>
      {/* Page Content */}
      <h2>What would you like to explore?</h2>
      <Row className="justify-content-center mt-4">
        <Col md={3}>
          <Button
            variant="primary"
            className="w-100 mb-3"
            onClick={() => navigate('/books')}
          >
            Books
          </Button>
        </Col>
        <Col md={3}>
          <Button
            variant="success"
            className="w-100"
            onClick={() => navigate('/movies')}
          >
            Movies
          </Button>
        </Col>
      </Row>
      <Col md={3}>
        <Button
          variant="danger"
          className="w-100 mt-3"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Col>
    </Container>
  );
};

export default ChoicePage;
