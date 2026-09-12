import React from 'react';
import './SkillRoadmap.css';

const SkillRoadmap = () => {
  return (
    <div className="roadmap-wrapper">
      
      {/* Page Title */}
      <div className="roadmap-header">
        <h1>Network Engineer</h1>
      </div>

      <div className="roadmap-container">
        {/* Center Vertical Line */}
        <div className="center-line"></div>

       
        <div className="roadmap-row">
          {/* Left Side Box */}
          <div className="side-content left-side">

             {/* --- SECTION 1 --- */}
            <div className="section-box">
              <h3 className="box-title">Basic Terminology</h3>
              <div className="grid-2">
                <div className="roadmap-item">Client</div>
                <div className="roadmap-item">Server</div>
                <div className="roadmap-item">Host</div>
                <div className="roadmap-item">Package</div>
                <div className="roadmap-item">Frame</div>
                <div className="roadmap-item">Bandwidth</div>
                <div className="roadmap-item">Latency</div>
                <div className="roadmap-item">Throughput</div>
                <div className="roadmap-item">Protocol</div>
                <div className="roadmap-item">Port</div>
                <div className="roadmap-item">Socket</div>
                <div className="roadmap-item">IP Address</div>
                <div className="roadmap-item">Mac Address</div>
                <div className="roadmap-item">ARP</div>
              </div>
              <div className="roadmap-item full-width">Transmission Media Types</div>

              <h3 className="box-title" style={{marginTop: '15px'}}>Core Protocols</h3>
              <div className="grid-3">
                <div className="roadmap-item">TCP</div>
                <div className="roadmap-item">UDP</div>
                <div className="roadmap-item">ICMP</div>
              </div>

              <h3 className="box-title" style={{marginTop: '15px'}}>Application Protocols</h3>
              <div className="roadmap-item full-width">HTTP / HTTPS</div>
              <div className="roadmap-item full-width">WebSocket</div>
              <div className="grid-2">
                <div className="roadmap-item">SSL / TLS</div>
                <div className="roadmap-item">SSH</div>
                <div className="roadmap-item">FTP / SFTP</div>
                <div className="roadmap-item">NTP</div>
                <div className="roadmap-item">SMTP / IMAP</div>
                <div className="roadmap-item">SNTP</div>
                <div className="roadmap-item">DNS</div>
                <div className="roadmap-item">DHCP</div>
              </div>

              <h3 className="box-title" style={{marginTop: '15px'}}>DNS Servers</h3>
              <div className="grid-2">
                <div className="roadmap-item">Cloudflare</div>
                <div className="roadmap-item">Google</div>
                <div className="roadmap-item">OpenDNS</div>
                <div className="roadmap-item">Quad9</div>
              </div>
            </div>

             {/* --- SECTION 2--- */}



          </div>

          {/* Center Main Node */}
          <div className="center-node-wrapper">
             {/* --- SECTION 1 --- */}
            <div className="main-node Introduction">Introduction</div>
             {/* --- SECTION 2 --- */}
             <div className="main-node What-are-Networks">What are Networks?</div>
             {/* --- SECTION 3 --- */}
             <div className="main-node Network-Devices">Network Devices
                <div className="devider"></div>
             </div>
          </div>

          {/* Right Side Box */}
          <div className="side-content right-side">
             {/* --- SECTION 1 --- */}
            <div className="section-box" style={{border: 'none', background: 'transparent', padding: 0}}>
              <h3 className="box-title">Certifications</h3>
              <div className="grid-2">
                <div className="roadmap-item">CCNA</div>
                <div className="roadmap-item">CCNP</div>
              </div>
              <div className="roadmap-item full-width">CompTIA Network+</div>
              <div className="roadmap-item full-width">CompTIA Security+</div>
              <div className="roadmap-item full-width">Cloud Certifications</div>
            </div>

            <div className="roadmap-item full-width" style={{marginTop: '20px'}}>How does the Internet Work?</div>

         {/* --- SECTION 2 --- */}
             <div className="section-box">
              <h3 className="box-title Network-Types">Network Types</h3>
              <div className="grid-2">
                <div className="roadmap-item">LAN</div>
                <div className="roadmap-item">WAN</div>
                <div className="roadmap-item">MAN</div>
                <div className="roadmap-item">WLAN</div>
                <div className="roadmap-item">PAN</div>
                <div className="roadmap-item">SAN</div>
                <div className="roadmap-item">VPN</div>
                <div className="roadmap-item">Cloud</div>
              </div>
              <div className="roadmap-item full-width">Client-Server Network</div>
              <div className="roadmap-item full-width">Peer-to-Peer Network</div>
            </div>
         {/* --- SECTION 3 --- */}
             <div className="section-box">
              <h3 className="box-title Network-Devices<">Network Devices</h3>
              <div className="grid-2">
                <div className="roadmap-item">Router</div>
                <div className="roadmap-item">Switch</div>
                <div className="roadmap-item">OLT</div>
                <div className="roadmap-item">HUB</div>
                <div className="roadmap-item">PAN</div>
                <div className="roadmap-item">Modem</div>
                
        
              </div>
              <div className="roadmap-item full-width">Access Point</div>
                <div className="roadmap-item full-width">Firewall</div>
            </div>
            
          </div>
          
          
        </div>


     

      </div>
    </div>
  );
};

export default SkillRoadmap;