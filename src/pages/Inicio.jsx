import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Inicio() {
  const isAuth = localStorage.getItem('auth') === 'true';

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)',
      color: '#ffffff'
    }}>
      <Container className="pt-5 pb-5">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            {/* Header Section */}
            <div className="text-center mb-5">
              <h1 className="display-3 mb-4" style={{ 
                fontWeight: '300', 
                background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Tech New
              </h1>
              <p className="lead" style={{ 
                color: '#b0b0b0', 
                fontSize: '1.1rem',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                Descubre la última tecnología con el mejor rendimiento y diseño del mercado
              </p>
            </div>

            {/* Auth Section */}
            {!isAuth ? (
              <div className="text-center mb-5 p-4" style={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <h4 className="mb-3" style={{ color: '#00d4ff' }}>
                  Accede a nuestro catálogo completo
                </h4>
                <p style={{ color: '#b0b0b0', marginBottom: '2rem' }}>
                  Inicia sesión para explorar todos nuestros productos tecnológicos
                </p>
                <Button 
                  as={Link} 
                  to="/login" 
                  size="lg"
                  style={{
                    background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 32px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(0, 212, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Iniciar Sesión
                </Button>
              </div>
            ) : (
              <div className="text-center mb-5 p-4" style={{ 
                background: 'rgba(0, 255, 136, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                border: '1px solid rgba(0, 255, 136, 0.2)'
              }}>
                <h4 className="mb-3" style={{ color: '#00ff88' }}>
                  ¡Bienvenido de vuelta!
                </h4>
                <p style={{ color: '#b0b0b0', marginBottom: '2rem' }}>
                  Tienes acceso completo a todos nuestros productos
                </p>
                <div className="d-flex gap-3 justify-content-center flex-wrap">
                  <Button 
                    as={Link} 
                    to="/productos" 
                    size="lg"
                    style={{
                      background: 'linear-gradient(45deg, #00ff88, #00cc6a)',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px 24px',
                      fontWeight: '500'
                    }}
                  >
                    Ver Productos
                  </Button>
                  <Button 
                    as={Link} 
                    to="/perfil/usuario123"
                    size="lg"
                    style={{
                      background: 'transparent',
                      border: '2px solid #00ff88',
                      borderRadius: '8px',
                      padding: '10px 24px',
                      color: '#00ff88',
                      fontWeight: '500'
                    }}
                  >
                    Mi Perfil
                  </Button>
                </div>
              </div>
            )}

            {/* Categories Section */}
            <Row className="mb-5">
              {[
                { icon: '💻', title: 'Laptops y PC', desc: 'Equipos de alto rendimiento para trabajo y gaming' },
                { icon: '📱', title: 'Móviles', desc: 'Los smartphones más avanzados del mercado' },
                { icon: '🎧', title: 'Accesorios', desc: 'Complementa tus dispositivos con lo mejor' }
              ].map((item, index) => (
                <Col md={4} className="mb-4" key={index}>
                  <div 
                    className="h-100 text-center p-4"
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    }}
                  >
                    <div className="mb-3" style={{ fontSize: '3rem' }}>{item.icon}</div>
                    <h5 className="mb-3" style={{ color: '#ffffff', fontWeight: '500' }}>
                      {item.title}
                    </h5>
                    <p style={{ color: '#b0b0b0', fontSize: '0.9rem', margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </Col>
              ))}
            </Row>

            {/* Features Section */}
            <div className="text-center">
              <h3 className="mb-4" style={{ color: '#ffffff', fontWeight: '300' }}>
                ¿Por qué Tech New?
              </h3>
              <Row>
                {[
                  { icon: '🚚', title: 'Envío Gratis', desc: 'En compras +$50.000' },
                  { icon: '🔒', title: 'Pago Seguro', desc: 'Transacciones protegidas' },
                  { icon: '⚡', title: 'Entrega Rápida', desc: '24-48 horas' },
                  { icon: '🛠️', title: 'Soporte 24/7', desc: 'Asistencia especializada' }
                ].map((feature, index) => (
                  <Col md={3} sm={6} className="mb-4" key={index}>
                    <div className="p-3">
                      <div style={{ fontSize: '2.5rem' }} className="mb-2">
                        {feature.icon}
                      </div>
                      <h6 style={{ color: '#00d4ff', fontWeight: '500', marginBottom: '8px' }}>
                        {feature.title}
                      </h6>
                      <small style={{ color: '#999999' }}>
                        {feature.desc}
                      </small>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}