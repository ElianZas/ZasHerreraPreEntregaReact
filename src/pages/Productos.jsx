import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../App';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/category/electronics')
      .then(response => response.json())
      .then(data => {
        setProductos(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar productos');
        setLoading(false);
      });
  }, []);

  const handleAgregarCarrito = (producto) => {
    const isAuth = localStorage.getItem('auth') === 'true';
    
    if (!isAuth) {
      navigate('/');
    } else {
      agregarAlCarrito(producto);
    }
  };

  const handleVerMas = (productoId) => {
    navigate(`/producto/${productoId}`);
  };

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" />
        <p>Cargando productos...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          <h4>Error</h4>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>Productos de Tecnología</h2>
      <p>Descubre nuestra selección de productos</p>

      <Row>
        {productos.map((producto, index) => (
          <Col key={producto.id} xs={12} sm={6} lg={4} xl={3} className="mb-4">
            <Card className="h-100">
              <div className="text-center p-3" style={{ height: '200px' }}>
                <Card.Img
                  src={producto.image}
                  alt={producto.title}
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                />
              </div>
              
              <Card.Body className="d-flex flex-column">
                <Card.Title className="h6">
                  {producto.title.length > 60 ? 
                    producto.title.substring(0, 60) + '...' : 
                    producto.title
                  }
                </Card.Title>
                
                <Card.Text className="text-muted small flex-grow-1">
                  {producto.description.length > 100 ? 
                    producto.description.substring(0, 100) + '...' : 
                    producto.description
                  }
                </Card.Text>
                
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="text-primary mb-0">${producto.price}</h5>
                    <Badge bg="primary">⭐ {producto.rating.rate}</Badge>
                  </div>
                  
                  <small className="text-muted d-block mb-2">
                    {producto.rating.count} valoraciones
                  </small>
                  
                  <div className="d-grid gap-2">
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => handleAgregarCarrito(producto)}
                    >
                      Agregar al carrito
                    </Button>
                    
                    {index < 3 && (
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => handleVerMas(producto.id)}
                      >
                        Ver más
                      </Button>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}