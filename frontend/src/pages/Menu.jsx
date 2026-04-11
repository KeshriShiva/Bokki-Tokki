import { useState } from 'react';
import './Menu.css';

const menuCategories = [
  {
    category: "Steam Momos (8pcs)",
    description: "Soft and perfectly steamed delicacies served with fiery dip.",
    items: [
      { id: '1', name: 'Nutri Momos', price: 70, description: 'Steamed momos filled with rich and healthy nutritious soya crumbles.', image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
      { id: '2', name: 'Mix Veg Momos', price: 70, description: 'Classic momos loaded with finely chopped fresh seasonal vegetables.', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
      { id: '3', name: 'Paneer Momos', price: 90, description: 'Stuffed with fresh minced cottage cheese herbs and spices.', image: 'https://images.unsplash.com/photo-1626200419188-f1a16ba840fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
      { id: '4', name: 'Cheese Corn Momos', price: 100, description: 'A sweet and savory blend of juicy sweet corn and gooey melted cheese.', image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' }
    ]
  },
  {
    category: "Gravy Momos",
    description: "Our signature momos tossed in rich, flavorful and creamy gravies.",
    items: [
      { id: '5', name: 'Spicy Chilly Momos', price: 90, description: 'Pan-fried momos tossed in a hot and spicy soy-chilli gravy.', image: 'https://images.unsplash.com/photo-1626084661747-d1a89cfa2bc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
      { id: '6', name: 'Tandoori Gravy Momos', price: 90, description: 'Smoky tandoori-marinated momos served in a tangy gravy.', image: 'https://images.unsplash.com/photo-1625937286074-9ca519d5d9df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
      { id: '7', name: 'Peanut Jhol Momos', price: 90, description: 'Authentic Nepali style momos immersed in a savory sesame-peanut soup.', image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
      { id: '8', name: 'Malai Creamy Momos', price: 90, description: 'Dipped in a thick, rich malai cream sauce for a milder taste.', image: 'https://images.unsplash.com/photo-1601264267866-26792338f2cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
      { id: '9', name: 'Special Makhni Momos', price: 90, description: 'Momos swimming in an exotic buttery tomato makhni gravy.', image: 'https://images.unsplash.com/photo-1580651315530-69c8e0026377?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' }
    ]
  },
  {
    category: "Spring Rolls",
    description: "Crispy fried golden rolls perfect for snacking.",
    items: [
      { id: '10', name: 'Veg Spring Rolls', price: 70, description: 'Crunchy exterior filled with spiced mixed vegetables.', image: 'https://images.unsplash.com/photo-1544025162-811114216965?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
      { id: '11', name: 'Noodle Spring Rolls', price: 70, description: 'Hakka noodles enveloped in an extra crispy golden wrapper.', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' },
      { id: '12', name: 'Cheese & Corn Spring Roll', price: 90, description: 'A delightful fusion roll loaded with sweet corn and melting cheese.', image: 'https://images.unsplash.com/photo-1627308595180-87ea312b9a73?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60' }
    ]
  }
];

const Menu = ({ addToCart }) => {
  return (
    <div className="menu-page container animate-fade-in">
      <h1 className="page-title text-center" style={{marginTop: '40px', marginBottom: '10px'}}>Our <span className="highlight">Menu</span></h1>
      <p className="text-center text-muted" style={{marginBottom: '50px'}}>Handcrafted bites made with love. Select your favorites below!</p>
      
      {menuCategories.map((section, index) => (
        <div key={index} style={{ marginBottom: '60px' }}>
          <h2 style={{ color: 'var(--primary)', fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '5px' }}>{section.category}</h2>
          <p className="text-muted" style={{ marginBottom: '30px', fontSize: '1.05rem' }}>{section.description}</p>
          
          <div className="grid grid-3 menu-grid">
            {section.items.map(item => (
              <div key={item.id} className="menu-card">
                <div className="menu-card-img" style={{ backgroundImage: `url(${item.image})` }}></div>
                <div className="menu-card-content">
                  <h3>{item.name}</h3>
                  <p className="menu-desc">{item.description}</p>
                  <div className="menu-card-footer">
                    <span className="price">₹{item.price}</span>
                    <button className="btn btn-small" onClick={() => addToCart(item)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
