import { Modal, Button, ListGroup, Row, Col, Badge } from 'react-bootstrap';
import { useCart } from '../App';

export default function CartModal({ show, onHide }) {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Carrito de Compras</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center text-muted">Tu carrito está vacío</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          Carrito de Compras 
          <Badge bg="primary" className="ms-2">
            {cart.reduce((total, item) => total + item.quantity, 0)} items
          </Badge>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup variant="flush">
          {cart.map(item => (
            <ListGroup.Item key={item.id}>
              <Row className="align-items-center">
                <Col xs={8}>
                  <h6 className="mb-1">{item.name}</h6>
                  <small className="text-muted">${item.price} c/u</small>
                </Col>
                <Col xs={4} className="text-end">
                  <div className="d-flex align-items-center justify-content-end">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span className="mx-2 fw-bold">{item.quantity}</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="ms-2"
                      onClick={() => removeFromCart(item.id)}
                    >
                      ×
                    </Button>
                  </div>
                  <div className="text-success fw-bold mt-1">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
        
        <div className="mt-3 p-3 bg-light rounded">
          <Row>
            <Col>
              <h5>Total: <span className="text-success">${getCartTotal().toFixed(2)}</span></h5>
            </Col>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Seguir comprando
        </Button>
        <Button variant="success">
          Proceder al pago
        </Button>
      </Modal.Footer>
    </Modal>
  );
}