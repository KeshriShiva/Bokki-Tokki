import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container animate-fade-in">
      <header className="hero-section">
        <div className="container hero-content">
          <h1 className="hero-title">Experience <span className="highlight">Authentic</span> Korean Street Food at LPU</h1>
          <p className="hero-subtitle">Bokki Tokki - The campus's first student-run Korean food kiosk at LIT Market. Taste the spice, feel the vibe!</p>
          <div className="hero-actions">
            <Link to="/menu" className="btn hero-btn">Explore Menu <ChevronRight size={20} style={{verticalAlign: 'bottom'}} /></Link>
          </div>
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-image-slider">
           {/* We will rely on CSS backgrounds for slider effect */}
           <div className="slide slide-1"></div>
        </div>
      </header>

      <section className="about-section container">
        <div className="grid grid-2" style={{alignItems: 'center'}}>
          <div className="about-image-wrapper">
             <div className="about-img placeholder-img">
               <p>Spicy Tteokbokki</p>
             </div>
          </div>
          <div className="about-text">
            <h2 className="section-title">About Us</h2>
            <p className="section-desc">Born out of LPU's student startup and entrepreneurship initiatives, Bokki Tokki is more than just a food outlet</p>
            <p className="section-desc">We bring authentic Korean flavors straight from Seoul to the LIT Market. Whether you're craving some spicy Tteokbokki, crunchy Corndogs, or soothing Ramyeon, we've got you covered.</p>
            <Link to="/contact" className="btn btn-outline" style={{marginTop: '20px'}}>Get in Touch</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
