import { useState, useRef } from "react";
import "./SpeedTest.css";

const initialData = {
  ping: "--",
  jitter: "--",
  download: "--",
  upload: "--",
  ip: "--",
  provider: "--",
  downloadProgress: 0,
  uploadProgress: 0,
  pingProgress: 0,
  state: -1, // -1: Ready, 1: Download, 2: Ping, 3: Upload, 4: Complete
};

function SpeedTest() {
  const [data, setData] = useState(initialData);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");
  const abortControllerRef = useRef(null);

  const [server] = useState("Cloudflare High-Speed Node");
  const [serverLocation] = useState("Global Edge CDN");

  // Ping Measurement
  const measurePing = async (signal) => {
    const pings = [];
    for (let i = 0; i < 5; i++) {
      if (signal.aborted) break;
      const start = performance.now();
      try {
        await fetch(`https://speed.cloudflare.com/__down?bytes=0&r=${Math.random()}`, { signal });
        const end = performance.now();
        pings.push(end - start);
      } catch (err) {
        if (err.name === 'AbortError') return null;
      }
    }
    if (pings.length === 0) return { avgPing: 0, jitter: 0 };
    
    const avgPing = pings.reduce((a, b) => a + b, 0) / pings.length;
    let totalJitter = 0;
    for (let i = 0; i < pings.length - 1; i++) {
      totalJitter += Math.abs(pings[i] - pings[i + 1]);
    }
    const jitter = pings.length > 1 ? totalJitter / (pings.length - 1) : 0;
    
    return { avgPing: avgPing.toFixed(1), jitter: jitter.toFixed(1) };
  };

  // Download Test
  const measureDownload = async (signal) => {
    const testUrl = "https://speed.cloudflare.com/__down?bytes=25000000";
    const startTime = performance.now();
    let loadedBytes = 0;
    const totalBytes = 25000000;

    const response = await fetch(`${testUrl}&r=${Math.random()}`, { signal });
    const reader = response.body.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done || signal.aborted) break;

      loadedBytes += value.length;
      const durationSeconds = (performance.now() - startTime) / 1000;
      const speedMbps = ((loadedBytes * 8) / durationSeconds / (1024 * 1024)).toFixed(1);

      setData((prev) => ({
        ...prev,
        download: speedMbps,
        downloadProgress: Math.min(loadedBytes / totalBytes, 1),
      }));
    }
  };

  // Upload Test
  const measureUpload = async (signal) => {
    const payloadSize = 5 * 1024 * 1024;
    const dummyData = new Uint8Array(payloadSize);
    const startTime = performance.now();

    setData((prev) => ({ ...prev, uploadProgress: 0.5 }));

    try {
      await fetch(`https://httpbin.org/post?r=${Math.random()}`, {
        method: "POST",
        body: dummyData,
        signal,
      });
      const durationSeconds = (performance.now() - startTime) / 1000;
      const speedMbps = ((payloadSize * 8) / durationSeconds / (1024 * 1024)).toFixed(1);

      setData((prev) => ({
        ...prev,
        upload: speedMbps,
        uploadProgress: 1,
      }));
    } catch (err) {
      setData((prev) => ({ ...prev, uploadProgress: 1 }));
    }
  };

  // Fetch Public IP & Dynamic Provider (ISP Name)
 // Fetch Public IP & Dynamic Real Provider (ISP Name)
  const fetchIP = async () => {
    try {
      // Primary API: ipapi.co
      const res = await fetch("https://ipapi.co/json/");
      if (!res.ok) throw new Error("Primary API failed");
      const resData = await res.json();
      
      setData((prev) => ({
        ...prev,
        ip: resData.ip || "Dynamic IP",
        provider: resData.org || resData.isp || "Unknown Provider",
      }));
    } catch (err) {
      // Backup API 1: ip-api.com
      try {
        const backupRes = await fetch("http://ip-api.com/json/?fields=status,query,isp,org");
        const backupData = await backupRes.json();
        if (backupData.status === "success") {
          setData((prev) => ({
            ...prev,
            ip: backupData.query,
            provider: backupData.isp || backupData.org || "Dynamic Provider",
          }));
          return;
        }
      } catch (bErr) {
        // Backup API 2: ipify (only IP)
        try {
          const ipifyRes = await fetch("https://api.ipify.org?format=json");
          const ipifyData = await ipifyRes.json();
          setData((prev) => ({
            ...prev,
            ip: ipifyData.ip,
            provider: "Internet Service Provider",
          }));
        } catch (finalErr) {
          setData((prev) => ({
            ...prev,
            ip: "Dynamic IP",
            provider: "Dynamic Network",
          }));
        }
      }
    }
  };

  // START TEST PROCESS
  const startTest = async () => {
    setRunning(true);
    setError("");
    setData(initialData);

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      // 1. Fetch IP/ISP & Ping
      setData((prev) => ({ ...prev, state: 2 }));
      fetchIP();
      const pingRes = await measurePing(signal);
      if (signal.aborted) return;
      if (pingRes) {
        setData((prev) => ({ ...prev, ping: pingRes.avgPing, jitter: pingRes.jitter, pingProgress: 1 }));
      }

      // 2. Download Test
      setData((prev) => ({ ...prev, state: 1 }));
      await measureDownload(signal);
      if (signal.aborted) return;

      // 3. Upload Test
      setData((prev) => ({ ...prev, state: 3 }));
      await measureUpload(signal);
      if (signal.aborted) return;

      // Complete
      setData((prev) => ({ ...prev, state: 4 }));
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Test Error:", err);
        setError("Speed test failed to run. Check connection.");
      }
    } finally {
      setRunning(false);
    }
  };

  // STOP TEST
  const stopTest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setRunning(false);
    setData((prev) => ({ ...prev, state: 5 }));
  };

  const getStatusText = () => {
    switch (data.state) {
      case 2:
        return "Testing Ping & Jitter...";
      case 1:
        return "Testing Download Speed...";
      case 3:
        return "Testing Upload Speed...";
      case 4:
        return "Test Complete";
      case 5:
        return "Test Stopped";
      default:
        return "Ready";
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    } catch (err) {
      setError("Unable to copy link.");
    }
  };

  return (
    <main className="speedtest-page">
      <div className="speedtest-container">
        {/* HEADER */}
        <header className="speedtest-header">
          <div className="brand">
            <div className="brand-icon">◔</div>
            <div className="brand-text">
              TAMIM NETWORK PORTFOLIO
              <small>SPEEDTEST</small>
            </div>
          </div>
        </header>

        {/* SPEEDTEST CARD */}
        <section className="speedtest-card">
          <div className="card-top-body">
            {/* STATS GRID */}
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-title"><span>ϟ</span> PING</div>
                <div className="stat-value">{data.ping}</div>
                <div className="stat-unit">ms</div>
              </div>

              <div className="stat-box">
                <div className="stat-title"><span>↓</span> DOWNLOAD</div>
                <div className="stat-value">{data.download}</div>
                <div className="stat-unit">Mbps</div>
                <div className="speed-graph">
                  <div
                    className="graph-fill download-fill"
                    style={{ width: `${data.downloadProgress * 100}%` }}
                  />
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-title"><span>⌁</span> JITTER</div>
                <div className="stat-value">{data.jitter}</div>
                <div className="stat-unit">ms</div>
              </div>

              <div className="stat-box">
                <div className="stat-title"><span>↑</span> UPLOAD</div>
                <div className="stat-value">{data.upload}</div>
                <div className="stat-unit">Mbps</div>
                <div className="speed-graph">
                  <div
                    className="graph-fill upload-fill"
                    style={{ width: `${data.uploadProgress * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* ACTION BUTTON */}
            <div className="test-action-wrapper">
              <div className="test-action">
                <button
                  type="button"
                  className={running ? "test-button running" : "test-button"}
                  onClick={running ? stopTest : startTest}
                >
                  <span>{running ? "STOP" : "START"}</span>
                </button>
                <div className="test-status">{getStatusText()}</div>
              </div>
            </div>
          </div>


          {/* DYNAMIC CONNECTION INFORMATION */}
        <section className="connection-info">
          <div className="connection-card">
            <div className="provider">{data.provider}</div>
            <div className="ip">{data.ip}</div>
          </div>

          <div className="connection-right">
            <div className="provider">{server}</div>
            <div className="ip">{serverLocation}</div>
          </div>
        </section>


          {/* BOTTOM SECTION */}
          <div className="card-bottom-row">
            <div className="bottom-left">
              <div className="server-row">
                <div className="server-info">
                 
                  SPEED TEST 
                </div>
              </div>
              <div className="powered-app">
              powered by  
                <a
                  href="https://www.linkedin.com/in/moniruzzamantamim/"
                  target="_blank"
                  rel="noreferrer"
                >
                   MONIRUZZAMAN TAMIM
                </a>
                .
              </div>
            </div>

            <div className="share-buttons">
              <button type="button" onClick={copyLink}>COPY LINK</button>
              <button
                type="button"
                onClick={() =>
                  window.open(
                    "https://twitter.com/intent/tweet?text=Check%20my%20internet%20speed",
                    "_blank"
                  )
                }
              >
                X
              </button>
              <button
                type="button"
                onClick={() =>
                  window.open(
                    "https://www.facebook.com/sharer/sharer.php?u=" +
                      encodeURIComponent(window.location.href),
                    "_blank"
                  )
                }
              >
                f
              </button>
            </div>
          </div>
        </section>

        
        {error && <div className="error-message">{error}</div>}

    
      </div>
    </main>
  );
}

export default SpeedTest;