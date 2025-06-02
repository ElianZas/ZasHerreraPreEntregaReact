import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, createContext, useContext } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Productos from './pages/Productos';
import DetalleProducto from './pages/DetalleProducto';
import Carrito from './pages/Carrito';
import Administracion from './pages/Administracion';
import RutaProtegida from './components/RutaProtegida';

export const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de CarritoProvider');
  }
  return context;
};

function App() {
  const [carrito, setCarrito] = useState([]);
  const [notificacionCarrito, setNotificacionCarrito] = useState(null);

  const agregarAlCarrito = (producto) => {
    setCarrito(prevCarrito => {
      const productoExistente = prevCarrito.find(item => item.id === producto.id);
      
      if (productoExistente) {
        return prevCarrito.map(item =>
          item.id === producto.id 
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });

    setNotificacionCarrito({
      nombre: producto.title,
      timestamp: Date.now()
    });

    setTimeout(() => {
      setNotificacionCarrito(null);
    }, 3000);
  };

  const removerDelCarrito = (productoId) => {
    setCarrito(prevCarrito => 
      prevCarrito.filter(item => item.id !== productoId)
    );
  };

  const actualizarCantidad = (productoId, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      removerDelCarrito(productoId);
      return;
    }
    
    setCarrito(prevCarrito =>
      prevCarrito.map(item =>
        item.id === productoId 
          ? { ...item, cantidad: nuevaCantidad }
          : item
      )
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };
  const totalProductos = carrito.reduce((total, item) => total + item.cantidad, 0);
  const precioTotal = carrito.reduce((total, item) => total + (item.price * item.cantidad), 0);

  const carritoContextValue = {
    carrito,
    agregarAlCarrito,
    removerDelCarrito,
    actualizarCantidad,
    vaciarCarrito,
    totalProductos,
    precioTotal,
    notificacionCarrito
  };

  return (
    <CarritoContext.Provider value={carritoContextValue}>
      <BrowserRouter>
   <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh' 
      }}>
        <Header />
        {/* Main content que ocupa todo el espacio disponible */}
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/producto/:id" element={<DetalleProducto />} />
            <Route path="/carrito" element={
              <RutaProtegida><Carrito /></RutaProtegida>
            } />
            <Route path="/perfil/:id" element={
              <RutaProtegida><Perfil /></RutaProtegida>
            } />
            <Route path="/admin" element={
              <RutaProtegida><Administracion /></RutaProtegida>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
      </BrowserRouter>
    </CarritoContext.Provider>
  );
}

export default App;