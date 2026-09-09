const express = require('express');
const cors = require('cors');
const axios = require('axios');
const macLookup = require('mac-lookup');
require('dotenv').config();

const app = express();

// ==========================================
// 1. DYNAMIC CORS CONFIGURATION
// ==========================================
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://tamimnetwork.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    const clientUrl = process.env.CLIENT_URL;

    if (allowedOrigins.includes(origin) || origin === clientUrl) {
      return callback(null, true);
    } else {
      return callback(null, true);
    }
  },
  credentials: true
}));

app.use(express.json());

// ==========================================
// 2. ISP & IP INFORMATION ROUTE
// ==========================================
app.get('/api/ip-info', async (req, res) => {
  try {
    let clientIp = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

    let apiUrl = 'http://ip-api.com/json/';
    if (clientIp && clientIp !== '::1' && clientIp !== '127.0.0.1' && !clientIp.includes('127.0.0.1')) {
      apiUrl = `http://ip-api.com/json/${clientIp}`;
    }

    const response = await axios.get(apiUrl);
    
    res.json({
      status: response.data.status,
      query: response.data.query,
      ipv6: "Not detected",           
      isp: response.data.isp,
      city: response.data.city,
      regionName: response.data.regionName,
      country: response.data.country,
      lat: response.data.lat,
      lon: response.data.lon
    });
  } catch (error) {
    console.error("Backend IP Fetch Error:", error.message);
    res.status(500).json({ status: 'fail', error: 'IP fetch error' });
  }
});

// ==========================================
// 3. MAC ADDRESS VENDOR LOOKUP ROUTE (Using macvendorlookup.com API)
// ==========================================
app.get('/api/lookup/:mac', async (req, res) => {
  const macAddress = req.params.mac;

  try {
    const response = await axios.get(`https://www.macvendorlookup.com/api/v2/${macAddress}`);
    
    // API-ti jodi valid vendor pae tahole array ba object akare data dey
    if (response.data && response.data.length > 0) {
      res.json({ 
        success: true, 
        vendor: response.data[0].company // Company ba Vendor name
      });
    } else {
      res.status(404).json({ 
        success: false, 
        message: 'Vendor not found for this MAC address' 
      });
    }
  } catch (error) {
    console.error("MAC Lookup Error:", error.message);
    res.status(404).json({ 
      success: false, 
      message: 'Vendor not found or invalid MAC address' 
    });
  }
});
// ==========================================
// SERVER LISTEN
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

module.exports = app;