import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className='mb-4'>
      <Container>
        <Navbar.Brand >Test</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavBar;