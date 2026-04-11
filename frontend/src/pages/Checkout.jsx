import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = ({ cart, setCart, cartTotal }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    deliveryLocation: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }
    setStatus('Submitting...');

    try {
      // Pointing to local backend, in production this should be the deployed API URL
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-api-key': 'bokki-tokki-super-secret-key'
        },
        body: JSON.stringify({
          ...formData,
          items: cart,
          totalAmount: cartTotal
        })
      });

      const data = await response.json();
      if (data.success) {
        setStatus('Order placed successfully!');
        setCart([]); // Clear cart
        setTimeout(() => navigate('/'), 3000);
      } else {
        setStatus('Failed to place order.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Server connection error. Is backend running?');
    }
  };

  if (cart.length === 0 && !status.includes('successfully')) {
    return (
      <div className="container animate-fade-in" style={{ textAlign: 'center', paddingTop: '100px' }}>
        <h2 style={{fontSize: '2rem'}}>Your Cart is Empty</h2>
        <p style={{color: 'var(--text-muted)', marginTop: '20px', marginBottom: '30px'}}>Looks like you haven't added any delicious food yet.</p>
        <button className="btn" onClick={() => navigate('/menu')}>Go to Menu</button>
      </div>
    );
  }

  return (
    <div className="checkout-page container animate-fade-in">
      <h1 className="page-title text-center" style={{marginTop: '40px', marginBottom: '40px'}}>Checkout</h1>
      
      <div className="grid grid-2">
        <div className="order-summary">
          <h2 style={{marginBottom: '20px', color: 'var(--primary)'}}>Order Summary</h2>
          <div className="cart-list">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                   <div className="cart-item-img" style={{ backgroundImage: `url(${item.image})`}}></div>
                   <div>
                     <h4>{item.name}</h4>
                     <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Qty: {item.quantity}</p>
                   </div>
                </div>
                <div className="cart-item-price">₹{item.price * item.quantity}</div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h3>Total Amount</h3>
            <h3 style={{color: 'var(--primary)'}}>₹{cartTotal}</h3>
          </div>
        </div>

        <div className="checkout-form-container">
          <h2 style={{marginBottom: '20px', color: 'var(--primary)'}}>Delivery Details</h2>
          <form onSubmit={handleSubmit} className="checkout-form" autoComplete="off">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" name="customerName" required className="form-input" placeholder="e.g. John Doe" value={formData.customerName} onChange={handleChange} autoComplete="new-password" />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input type="tel" name="customerPhone" required className="form-input" placeholder="e.g. +91 9876543210" value={formData.customerPhone} onChange={handleChange} autoComplete="new-password" />
            </div>
            <div className="form-group">
              <label className="form-label">Delivery Location (in LPU)</label>
              <input type="text" name="deliveryLocation" required className="form-input" placeholder="e.g. BH1, Room 204 or Uni Mall" value={formData.deliveryLocation} onChange={handleChange} autoComplete="new-password" />
            </div>
            
            <button type="submit" className="btn" style={{width: '100%', marginTop: '10px'}} disabled={status === 'Submitting...'}>
              {status === 'Submitting...' ? 'Processing...' : 'Place Order Now'}
            </button>
            {status && <p style={{marginTop: '15px', textAlign: 'center', color: status.includes('successfully') ? '#4caf50' : '#ff5252'}}>{status}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
