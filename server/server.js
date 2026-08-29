const express = require('express');
const cors = require('cors');
const axios = require('axios');
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
// 2. ISP & IP INFORMATION ROUTE (Dual-Stack / IPv4 & IPv6 Support)
// ==========================================
app.get('/api/ip-info', async (req, res) => {
  try {
    let clientIp = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

    let apiUrl = 'http://ip-api.com/json/';
    if (clientIp && clientIp !== '::1' && clientIp !== '127.0.0.1' && !clientIp.includes('127.0.0.1')) {
      apiUrl = `http://ip-api.com/json/${clientIp}`;
    }

    const response = await axios.get(apiUrl);
    
    // Response-e IPv4 ebong IPv6-er field clean vabe pathano holo
    res.json({
      status: response.data.status,
      query: response.data.query,       // IPv4 Address
      ipv6: "Not detected",           // Jodi network ba client-e IPv6 support thake, ekhane update kora jabe
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
// SERVER LISTEN
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

module.exports = app;