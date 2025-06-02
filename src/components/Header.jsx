import { Navbar, Container, Nav, Button, Badge, Toast, ToastContainer } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../App';
import { useState, useEffect } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const { totalProductos, notificacionCarrito } = useCarrito();
  const [mostrarToast, setMostrarToast] = useState(false);

  const isAuth = localStorage.getItem('auth') === 'true';

  useEffect(() => {
    if (notificacionCarrito) {
      setMostrarToast(true);
    }
  }, [notificacionCarrito]);

  const cerrarSesion = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Tech New</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Inicio</Nav.Link>
              <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
              
              {isAuth && (
                <>
                  <Nav.Link as={Link} to="/perfil/usuario123">Perfil</Nav.Link>
                  <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
                </>
              )}
            </Nav>
            
            <Nav className="align-items-center">
              {isAuth && (
                <Nav.Link as={Link} to="/carrito" className="me-3 position-relative">
                  <div className="text-white d-flex align-items-center cart-hover">
                    🛒 
                    <Badge bg="danger" className="ms-1">
                      {totalProductos}
                    </Badge>
                  </div>
                </Nav.Link>
              )}
              
              {!isAuth ? (
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              ) : (
                <Button variant="outline-light" onClick={cerrarSesion}>Cerrar sesión</Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <ToastContainer position="top-center" className="p-3" style={{ zIndex: 1055, position: 'fixed', top: '70px' }}>
        <Toast 
          show={mostrarToast} 
          onClose={() => setMostrarToast(false)}
          delay={3000}
          autohide
          style={{ minWidth: '280px' }}
        >
          <Toast.Header className="bg-success text-white">
            <strong className="me-auto">Agregado al carrito!</strong>
          </Toast.Header>
          <Toast.Body className="bg-success text-white">
            {notificacionCarrito?.nombre}
            <div className="mt-2">
              <Button as={Link} to="/carrito" variant="light" size="sm">
                Ver carrito ({totalProductos})
              </Button>
            </div>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}