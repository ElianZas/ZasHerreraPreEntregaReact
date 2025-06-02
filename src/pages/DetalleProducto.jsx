import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Alert, Badge, Button, Breadcrumb } from 'react-bootstrap';
import { useCarrito } from '../App';

const obtenerColorBadge = (rating) => {
  if (rating >= 4.5) return 'success';
  if (rating >= 4.0) return 'primary';
  if (rating >= 3.5) return 'warning';
  return 'secondary';
};

const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'USD'
  }).format(precio);
};

export default function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCarrito();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        
        if (!response.ok) {
          throw new Error('Producto no encontrado');
        }
        
        const data = await response.json();
        
        // Solo mostrar detalles si es un producto de electrónicos
        if (data.category === 'electronics') {
          setProducto(data);
        } else {
          setError('Este producto no está disponible para ver detalles');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProducto();
    }
  }, [id]);

  const manejarAgregarCarrito = () => {
    const isAuth = localStorage.getItem('auth') === 'true';
    
    if (!isAuth) {
      navigate('/login');
    } else {
      // Agregar la cantidad seleccionada
      for (let i = 0; i < cantidadSeleccionada; i++) {
        agregarAlCarrito(producto);
      }
    }
  };

  const manejarCambioCantidad = (e) => {
    const cantidad = parseInt(e.target.value);
    if (cantidad >= 1 && cantidad <= 10) {
      setCantidadSeleccionada(cantidad);
    }
  };

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Cargando producto...</span>
        </Spinner>
        <p className="mt-3">Cargando detalles del producto...</p>
      </Container>
    );
  }

  if (error || !producto) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error || 'Producto no encontrado'}</p>
          <Button variant="outline-primary" onClick={() => navigate('/productos')}>
            Volver a Productos
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      {/* Breadcrumb de navegación */}
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          Inicio
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => navigate('/productos')} style={{ cursor: 'pointer' }}>
          Productos
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          {producto.title.length > 30 ? `${producto.title.substring(0, 30)}...` : producto.title}
        </Breadcrumb.Item>
      </Breadcrumb>

      <Row>
        {/* Columna de imagen */}
        <Col lg={6} className="mb-4">
          <Card className="border-0 shadow-sm">
            <div className="text-center p-4" style={{ minHeight: '400px' }}>
              <img
                src={producto.image}
                alt={producto.title}
                className="img-fluid"
                style={{
                  maxHeight: '350px',
                  maxWidth: '100%',
                  objectFit: 'contain'
                }}
              />
            </div>
          </Card>
        </Col>

        {/* Columna de información */}
        <Col lg={6}>
          <div className="mb-3">
            <Badge bg="info" className="mb-2">
              {producto.category.toUpperCase()}
            </Badge>
            <h1 className="h3 mb-3">{producto.title}</h1>
            
            {/* Rating */}
            <div className="d-flex align-items-center mb-3">
              <Badge bg={obtenerColorBadge(producto.rating.rate)} className="me-2">
                ⭐ {producto.rating.rate}
              </Badge>
              <span className="text-muted">
                ({producto.rating.count} valoraciones)
              </span>
            </div>

            {/* Precio */}
            <div className="mb-4">
              <h2 className="text-primary mb-0">
                {formatearPrecio(producto.price)}
              </h2>
              <small className="text-success">
                ✅ Envío gratis en compras superiores a $50
              </small>
            </div>
          </div>

          {/* Descripción */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Descripción del Producto</h5>
            </Card.Header>
            <Card.Body>
              <p className="mb-0" style={{ lineHeight: '1.6' }}>
                {producto.description}
              </p>
            </Card.Body>
          </Card>

          {/* Características adicionales */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Características</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col sm={6}>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <strong>Categoría:</strong> {producto.category}
                    </li>
                    <li className="mb-2">
                      <strong>Calificación:</strong> {producto.rating.rate}/5
                    </li>
                  </ul>
                </Col>
                <Col sm={6}>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <strong>Reseñas:</strong> {producto.rating.count}
                    </li>
                    <li className="mb-2">
                      <strong>Disponibilidad:</strong> <span className="text-success">En stock</span>
                    </li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Sección de compra */}
          <Card className="border-primary">
            <Card.Body>
              <Row className="align-items-center">
                <Col sm={4} className="mb-3 mb-sm-0">
                  <label htmlFor="cantidad" className="form-label fw-bold">
                    Cantidad:
                  </label>
                  <select
                    id="cantidad"
                    className="form-select"
                    value={cantidadSeleccionada}
                    onChange={manejarCambioCantidad}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </Col>
                
                <Col sm={8}>
                  <div className="d-grid gap-2">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={manejarAgregarCarrito}
                    >
                      🛒 Agregar al Carrito ({cantidadSeleccionada})
                    </Button>
                    
                    <Button
                      variant="outline-secondary"
                      onClick={() => navigate('/productos')}
                    >
                      ← Volver a Productos
                    </Button>
                  </div>
                </Col>
              </Row>

              {cantidadSeleccionada > 1 && (
                <Alert variant="info" className="mt-3 mb-0">
                  <strong>Total:</strong> {formatearPrecio(producto.price * cantidadSeleccionada)}
                </Alert>
              )}
            </Card.Body>
          </Card>

          {/* Garantías y beneficios */}
          <Row className="mt-4">
            <Col sm={6} className="mb-3">
              <div className="text-center p-3 border rounded">
                <div style={{ fontSize: '2rem' }}>🚚</div>
                <h6 className="mt-2 mb-1">Envío Gratis</h6>
                <small className="text-muted">En compras +$50</small>
              </div>
            </Col>
            <Col sm={6} className="mb-3">
              <div className="text-center p-3 border rounded">
                <div style={{ fontSize: '2rem' }}>🔧</div>
                <h6 className="mt-2 mb-1">Garantía</h6>
                <small className="text-muted">12 meses</small>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}