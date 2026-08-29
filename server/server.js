// server/server.js
const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const axios = require('axios'); // npm install axios chaliye nin

const app = express();
app.use(cors());
app.use(express.json());

// ==========================================
// 1. ISP INFORMATION API ROUTE
// ==========================================
// server/server.js
app.get('/api/ip-info', async (req, res) => {
  try {
    // 1. Client-er IP read kora
    let clientIp = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

    // 2. Localhost-e thakle API straight user-er real public IP auto-detect korbe
    let apiUrl = 'http://ip-api.com/json/';
    if (clientIp && clientIp !== '::1' && clientIp !== '127.0.0.1' && !clientIp.includes('127.0.0.1')) {
      apiUrl = `http://ip-api.com/json/${clientIp}`;
    }

    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error("Backend Error:", error.message);
    res.status(500).json({ status: 'fail', error: 'IP Information fetch korte somoshya hochhe' });
  }
});
// ==========================================
// 2. TRACEROUTE API ROUTE
// ==========================================
app.get('/api/traceroute', (req, res) => {
  const target = req.query.target || 'bdix.net';

  exec(`tracert -d ${target}`, (error, stdout) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    const lines = stdout.split('\n');
    const hops = [];

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (/^\d+/.test(trimmed)) {
        const parts = trimmed.split(/\s+/);
        const hopNumber = parts[0];
        const lastPart = parts[parts.length - 1];

        hops.push({
          hop: parseInt(hopNumber),
          ip: lastPart.includes('*') ? 'Request timed out' : lastPart,
          name: lastPart.includes('*') ? 'Timeout Node' : 'Network Hop',
          time: parts[1] !== '*' ? `${parts[1]}` : '*'
        });
      }
    });

    res.json({ hops });
  });
});

// ==========================================
// 3. REAL-TIME CONTINUOUS PING STREAM API (SSE)
// ==========================================
app.get('/api/ping-stream', (req, res) => {
  const target = req.query.target || '192.168.0.1';

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const pingProcess = exec(`ping -t ${target}`);

  pingProcess.stdout.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach((line) => {
      if (line.trim()) {
        res.write(`data: ${JSON.stringify({ line: line.trim() })}\n\n`);
      }
    });
  });

  req.on('close', () => {
    pingProcess.kill();
  });
});

// ==========================================
// SERVER LISTEN
// ==========================================
app.listen(5000, () => {
  console.log('Backend server running on http://localhost:5000');
});