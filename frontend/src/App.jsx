import { useState, Component, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';

ReactGA.initialize("G-TWECMHWJ5W");

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);

  return null;
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '50px', background: '#222', color: '#fff', minHeight: '100vh' }}>
          <h1 style={{ color: '#ff5252' }}>Something went wrong.</h1>
          <p style={{ fontSize: '1.2rem', marginTop: '20px' }}>{this.state.error && this.state.error.toString()}</p>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '20px', color: '#aaa' }}>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          <button style={{ marginTop: '30px', padding: '10px 20px', background: '#FF2E00', color: 'white', border: 'none', cursor: 'pointer' }} onClick={() => window.location.href='/'}>Refresh App</button>
        </div>
      );
    }
    return this.props.children;
  }
}


function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <Router>
      <AnalyticsTracker />
      <ErrorBoundary>
        <Navbar cartCount={cartCount} />
        <div className="page-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu addToCart={addToCart} />} />
            <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} cartTotal={cartTotal} />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
