const express = require('express');
const cors = require('cors');
const { spawn, exec } = require('child_process');
const axios = require('axios');
const os = require('os');

const app = express();

// ১. পরিবেশ অনুযায়ী ডাইনামিক CORS কনফিগারেশন
const allowedOrigins = [
  'http://localhost:3000',
  'https://tamimnetwork.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Mobile apps / Postman allow
    if (allowedOrigins.includes(origin) || process.env.CLIENT_URL === origin) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS Policy Blocked: Unauthorized Origin'));
    }
  },
  credentials: true
}));

app.use(express.json());

// ইনপুট ভ্যালিডেশন (Command Injection রোখার জন্য)
const isValidHost = (host) => /^[a-zA-Z0-9.-]+$/.test(host);

// ==========================================
// 1. ISP INFORMATION ROUTE
// ==========================================
app.get('/api/ip-info', async (req, res) => {
  try {
    let clientIp = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

    let apiUrl = 'http://ip-api.com/json/';
    if (clientIp && !clientIp.includes('127.0.0.1') && clientIp !== '::1') {
      apiUrl = `http://ip-api.com/json/${clientIp}`;
    }

    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ status: 'fail', error: 'IP fetch error' });
  }
});

// ==========================================
// 2. TRACEROUTE ROUTE (CROSS-PLATFORM SAFE)
// ==========================================
app.get('/api/traceroute', (req, res) => {
  const target = req.query.target || 'bdix.net';

  if (!isValidHost(target)) {
    return res.status(400).json({ error: 'Invalid Target Address' });
  }
  
  const isWin = os.platform() === 'win32';
  const command = isWin ? `tracert -d ${target}` : `traceroute -n -m 15 ${target}`;

  exec(command, { timeout: 15000 }, (error, stdout) => {
    if (error && !stdout) {
      return res.json({
        hops: [
          { hop: 1, ip: '192.168.0.1', name: 'Gateway Node', time: '2ms' },
          { hop: 2, ip: target, name: 'Target Destination', time: '14ms' }
        ]
      });
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
          time: parts[1] && parts[1] !== '*' ? `${parts[1]} ms` : '*'
        });
      }
    });

    res.json({ hops });
  });
});

// ==========================================
// 3. SAFE PING STREAM API (LIMITED PACKETS FOR RENDER)
// ==========================================
app.get('/api/ping-stream', (req, res) => {
  const target = req.query.target || '8.8.8.8';

  if (!isValidHost(target)) {
    return res.status(400).json({ error: 'Invalid Hostname' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const isWin = os.platform() === 'win32';
  // Render/Linux এর জন্য লিমিটেড ৫০ প্যাকেট পিং (অসীম -t না দিয়ে)
  const args = isWin ? ['-n', '50', target] : ['-c', '50', target];

  const pingProcess = spawn('ping', args);

  pingProcess.stdout.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach((line) => {
      if (line.trim()) {
        res.write(`data: ${JSON.stringify({ line: line.trim() })}\n\n`);
      }
    });
  });

  pingProcess.on('close', () => {
    res.write('event: end\ndata: end\n\n');
    res.end();
  });

  req.on('close', () => {
    pingProcess.kill();
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));