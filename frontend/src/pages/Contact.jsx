import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/queries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'bokki-tokki-super-secret-key'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Error connecting to Server.');
    }
  };

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '80px' }}>
      <h1 className="page-title text-center" style={{ marginTop: '40px', marginBottom: '10px' }}>Get in <span className="highlight">Touch</span></h1>
      <p className="text-center text-muted" style={{ marginBottom: '50px' }}>Have a question or a feedback? Drop us a message!</p>

      <div className="grid grid-2">
        <div className="contact-info" style={{ background: 'var(--bg-darker)', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
          <h2 style={{ color: 'var(--primary)', marginBottom: '30px' }}>Contact Information</h2>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '25px', alignItems: 'center' }}>
            <div style={{ background: 'var(--primary)', padding: '15px', borderRadius: '50%', display: 'flex' }}><MapPin color="white" /></div>
            <div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Location</h4>
              <p style={{ color: 'var(--text-muted)' }}>LIT Market, Lovely Professional University, Punjab</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '25px', alignItems: 'center' }}>
            <div style={{ background: 'var(--primary)', padding: '15px', borderRadius: '50%', display: 'flex' }}><Phone color="white" /></div>
            <div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Phone</h4>
              <p style={{ color: 'var(--text-muted)' }}>8445622801</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ background: 'var(--primary)', padding: '15px', borderRadius: '50%', display: 'flex' }}><Mail color="white" /></div>
            <div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Email</h4>
              <p style={{ color: 'var(--text-muted)' }}>vanshkhanduja.official@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="contact-form-container" style={{ background: 'var(--bg-darker)', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
          <h2 style={{ color: 'var(--primary)', marginBottom: '30px' }}>Send a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input type="text" name="name" className="form-input" required value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" name="email" className="form-input" required value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea name="message" className="form-textarea" required value={formData.message} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="btn" style={{ width: '100%', marginTop: '10px' }}>{status === 'Sending...' ? 'Sending...' : 'Send Message'}</button>
            {status && <p style={{ marginTop: '15px', textAlign: 'center', color: status.includes('successfully') ? '#4caf50' : '#ff5252' }}>{status}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
