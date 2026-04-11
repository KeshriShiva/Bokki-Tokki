require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

// Set up Nodemailer email transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,    // Your Gmail address
    pass: process.env.EMAIL_PASS     // Your App Password
  }
});

const Order = require('./models/Order');
const Query = require('./models/Query');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection (You can use a local DB or Atlas URI in .env)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bokki-tokki';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.error('MongoDB connection error: ', err));

// Middleware for API key check
const apiKeyCheck = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== (process.env.API_KEY || 'bokki-tokki-super-secret-key')) {
    return res.status(401).json({ success: false, message: 'Invalid API Key' });
  }
  next();
};

// --- API ROUTES ---

// 1. Submit an Order
app.post('/api/orders', apiKeyCheck, async (req, res) => {
  try {
    const { customerName, customerPhone, deliveryLocation, items, totalAmount } = req.body;
    
    const newOrder = new Order({
      customerName,
      customerPhone,
      deliveryLocation,
      items,
      totalAmount
    });
    
    // Check if Mongo is actually connected before saving
    if (mongoose.connection.readyState === 1) {
      await newOrder.save();
    } else {
      console.warn('MongoDB not connected! Order logged to console only for demonstration.');
    }
    
    // Send Email to the owner
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const itemDetails = items.map(i => `${i.name} (Qty: ${i.quantity})`).join(', ');
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: 'vanshkhanduja.official@gmail.com',
          subject: 'New Food Order Received!',
          text: `Awesome! You have a new order from ${customerName}.\n\nPhone: ${customerPhone}\nDelivery Location: ${deliveryLocation}\nTotal Amount: RS ${totalAmount}\n\nItems Ordered:\n${itemDetails}`
        });
        console.log('Email sent for new order');
      } else {
        console.log('EMAIL credentials not configured in .env, skipping email send.');
      }
    } catch(err) {
      console.log('Error sending order email:', err);
    }

    res.status(201).json({ success: true, message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ success: false, message: 'Failed to place order' });
  }
});

// 2. Submit a Contact Query
app.post('/api/queries', apiKeyCheck, async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    const newQuery = new Query({
      name,
      email,
      message
    });
    
    if (mongoose.connection.readyState === 1) {
      await newQuery.save();
    } else {
      console.warn('MongoDB not connected! Query logged to console only.');
    }

    // Notify owner via email
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: 'vanshkhanduja.official@gmail.com',
          subject: 'New Contact Query from Bokki Tokki',
          text: `You have received a new message from ${name} (${email}):\n\n${message}`
        });
        console.log('Email sent for new query');
      } else {
        console.log('EMAIL credentials not configured in .env, skipping email send.');
      }
    } catch(err) {
      console.error('Error sending query email:', err);
    }
    
    console.log('New Contact Query Received:', newQuery);
    
    res.status(201).json({ success: true, message: 'Query sent successfully' });
  } catch (error) {
    console.error('Error sending query:', error);
    res.status(500).json({ success: false, message: 'Failed to send query' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
