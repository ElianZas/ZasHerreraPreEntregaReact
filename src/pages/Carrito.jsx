import { Container, Row, Col, Card, Button, Alert, ListGroup, Badge } from 'react-bootstrap';
import { useCarrito } from '../App';

export default function Carrito() {
  const { carrito, precioTotal } = useCarrito();

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'USD'
    }).format(precio);
  };

  const manejarProcesarCompra = () => {
    alert('¡Compra procesada con éxito!');
  };

  if (carrito.length === 0) {
    return (
      <Container className="mt-4">
        <Alert variant="info" className="text-center">
          <Alert.Heading>Tu carrito está vacío</Alert.Heading>
          <p>¡Explora nuestros productos y añade algunos al carrito!</p>
          <Button variant="primary" href="/productos">
            Ver Productos
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col lg={8}>
          <div className="mb-4">
            <h2>Mi Carrito de Compras</h2>
            <p className="text-muted">Revisa los productos seleccionados</p>
          </div>

          <ListGroup>
            {carrito.map((producto) => (
              <ListGroup.Item key={producto.id} className="p-3">
                <Row className="align-items-center">
                  <Col xs={3} sm={2}>
                    <img
                      src={producto.image}
                      alt={producto.title}
                      className="img-fluid"
                      style={{ maxHeight: '80px', objectFit: 'contain' }}
                    />
                  </Col>
                  
                  <Col xs={9} sm={6}>
                    <h6 className="mb-1">
                      {producto.title.length > 50 
                        ? `${producto.title.substring(0, 50)}...` 
                        : producto.title}
                    </h6>
                    <p className="text-muted small mb-2">
                      Precio unitario: {formatearPrecio(producto.price)}
                    </p>
                    <Badge bg="primary">
                      ⭐ {producto.rating.rate}
                    </Badge>
                  </Col>
                  
                  <Col xs={12} sm={2} className="mt-2 mt-sm-0 text-center">
                    <span className="fw-bold fs-5">Cantidad: {producto.cantidad}</span>
                  </Col>
                  
                  <Col xs={12} sm={2} className="mt-2 mt-sm-0 text-center">
                    <div className="mb-2">
                      <strong className="text-primary fs-5">
                        {formatearPrecio(producto.price * producto.cantidad)}
                      </strong>
                    </div>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col lg={4}>
          <Card className="sticky-top" style={{ top: '20px' }}>
            <Card.Header>
              <h5 className="mb-0">Resumen del Pedido</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Productos ({carrito.reduce((total, item) => total + item.cantidad, 0)}):</span>
                <span>{formatearPrecio(precioTotal)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Envío:</span>
                <span className="text-success">Gratis</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong className="text-primary">{formatearPrecio(precioTotal)}</strong>
              </div>
              
              <Button 
                variant="success" 
                size="lg" 
                className="w-100"
                onClick={manejarProcesarCompra}
              >
                Procesar Compra
              </Button>
              
              <Button 
                variant="outline-primary" 
                className="w-100 mt-2"
                href="/productos"
              >
                Seguir Comprando
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}