import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const Navbar = ({ cartCount }) => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Link to="/" className="nav-brand">Bokki Tokki</Link>
        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
          <Link to="/menu" className={`nav-link ${isActive('/menu')}`}>Menu</Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>Contact</Link>
          <Link to="/checkout" className="cart-icon">
            <ShoppingCart size={24} color="#ffffff" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
