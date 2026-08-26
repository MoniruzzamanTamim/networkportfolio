const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
app.use(cors());

// 1. Traceroute API Route
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

// 2. Real-Time Continuous Ping Stream API (SSE)
app.get('/api/ping-stream', (req, res) => {
  const target = req.query.target || '192.168.0.1';

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Windows-এ -t দিয়ে কন্টিনিউয়াস পিং চালানো হচ্ছে
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

app.listen(5000, () => {
  console.log('Backend server running on http://localhost:5000');
});