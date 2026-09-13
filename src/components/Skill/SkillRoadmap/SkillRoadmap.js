import React, { useLayoutEffect, useRef } from 'react';
import './SkillRoadmap.css';

const SkillRoadmap = ({ onClose }) => {
  const roadmapRef = useRef(null);

  useLayoutEffect(() => {
    const roadmap = roadmapRef.current;
    if (!roadmap) return undefined;

    const alignNodes = () => {
      const wrapper = roadmap.querySelector('.center-node-wrapper');
      if (!wrapper) return;

      const wrapperRect = wrapper.getBoundingClientRect();

      roadmap.querySelectorAll('.main-node[data-align]').forEach((node) => {
        const targets = roadmap.querySelectorAll(
          `[data-align="${node.dataset.align}"]:not(.main-node)`
        );
        if (!targets.length) return;

        const targetCenter = Array.from(targets).reduce(
          (total, target) => total + target.getBoundingClientRect().top + target.getBoundingClientRect().height / 2,
          0
        ) / targets.length;

        node.style.top = `${targetCenter - wrapperRect.top}px`;
      });
    };

    alignNodes();
    const observer = new ResizeObserver(alignNodes);
    observer.observe(roadmap);
    window.addEventListener('resize', alignNodes);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', alignNodes);
    };
  }, []);

  return (
    <div className="roadmap-wrapper" ref={roadmapRef}>
      
      {/* Page Title */}
      <div className="roadmap-header">
        <h1>Network Engineer</h1>
        {onClose && (
          <button type="button" className="roadmap-close" onClick={onClose}>
            Close roadmap
          </button>
        )}
      </div>

      <div className="roadmap-container">
  
        <div className="roadmap-row">
          
          {/* Left Side Box */}
          <div className="side-content left-side">

             {/* --- SECTION 1 --- */}
            <div className="section-box introduction-left introduction-group" data-align="introduction">
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

            {/* --- SECTION 2: TCP/IP MODEL --- */}
            <div className="section-box roadmap-section tcp-ip-box TCP-IP-group TCP-IP-left" data-align="tcp-ip" aria-label="TCP/IP Model layers">
              <div className="grid-2">
                <div className="roadmap-item full-width">Network Access</div>
                <div className="roadmap-item full-width">Internet</div>
                <div className="roadmap-item full-width">Transport</div>
                <div className="roadmap-item full-width">Application</div>
              </div>
            </div>

            <div className="section-box roadmap-section network-design-principles network-design-principles-left" data-align="network-design">
              <h3 className="box-title">Architectures</h3>
              <div className="grid-2">
                <div className="roadmap-item">Two-Tier</div>
                <div className="roadmap-item">Three-Tier</div>
                <div className="roadmap-item full-width">Spine-Leaf</div>
              </div>
            </div>

            {/* --- IP ADDRESSING: LAST LEFT SECTION --- */}
            <div className="section-box roadmap-section ip-addressing-group ip-addressing-left" data-align="ip-addressing">
              <h3 className="box-title">IP Addressing</h3>
              <div className="grid-2">
                <div className="roadmap-item full-width">IPv4 vs IPv6</div>
                <div className="roadmap-item full-width">Public vs Private Addresses</div>
                <div className="roadmap-item full-width">IP vs MAC vs ARP</div>
              </div>
            </div>

             {/* --- SWITCHING: --- */}
            <div className="section-box roadmap-section switching-group switching-left" data-align="switching">
              <h3 className="box-title">Switching</h3>
              <div className="grid-2">
                <div className="roadmap-item full-width">MAC Address Table &amp; Forwarding</div>
                <div className="roadmap-item">VLANs</div>
                <div className="roadmap-item">VXLAN</div>
                <div className="roadmap-item">Trunking (802.1Q)</div>
                <div className="roadmap-item">STP &amp; RSTP</div>
                <div className="roadmap-item">Port Security</div>
                <div className="roadmap-item">Inter-VLAN Routing</div>
                <div className="roadmap-item full-width">EtherChannel / Link Aggregation</div>
              </div>
            </div>

            {/* --- ROUTING: LEFT SIDE --- */}
            <div className="section-box roadmap-section routing-group routing-left" data-align="routing">
              <h3 className="box-title">Routing Protocols</h3>
              <div className="grid-2">
                <div className="roadmap-item">BGP</div>
                <div className="roadmap-item">OSPF</div>
                <div className="roadmap-item">RIP</div>
                <div className="roadmap-item">EIGRP</div>
                <div className="roadmap-item full-width">MPLS</div>
              </div>
            </div>

            {/* --- TUNNELING & VPNS: LEFT SIDE --- */}
            <div className="section-box roadmap-section tunneling-vpns-group tunneling-vpns-left" data-align="tunneling-vpns">
              <h3 className="box-title">Secure Communication &amp; Tunnels</h3>
              <div className="grid-2">
                <div className="roadmap-item full-width">IPSec vs SSL VPN</div>
                <div className="roadmap-item full-width">Site-to-Site vs Remote Access VPN</div>
                <div className="roadmap-item full-width">GRE (Generic Routing Encapsulation) Tunnels</div>
                <div className="roadmap-item">IPsec Tunnels</div>
                <div className="roadmap-item">WireGuard VPN</div>
                <div className="roadmap-item full-width">OpenVPN</div>
              </div>
            </div>

            {/* --- TRAFFIC MANAGEMENT: LEFT SIDE --- */}
            <div className="section-box roadmap-section traffic-management-group traffic-management-left" data-align="traffic-management">
              <h3 className="box-title">Bandwidth &amp; Quality Control</h3>
              <div className="grid-2">
                <div className="roadmap-item">Traffic Shaping</div>
                <div className="roadmap-item">Traffic Policing</div>
                <div className="roadmap-item">Packet Prioritization</div>
                <div className="roadmap-item">QoS (Quality of Service)</div>
                <div className="roadmap-item full-width">Congestion Avoidance and Management</div>
                <div className="roadmap-item full-width">Bandwidth Allocation</div>
              </div>
            </div>

          </div>

          {/* Center Main Node */}
          <div className="center-line" aria-hidden="true" /> 
          <div className="center-node-wrapper">
            {/* --- SECTION 1 --- */}
            <div className="main-node Introduction introduction-group" data-align="introduction">Introduction</div>
            
            {/* --- SECTION 2 --- */}
            <div className="main-node What-are-Networks What-are-networks-group" data-align="network-types">What are Networks?</div>
            
            {/* --- SECTION 3 --- */}
            <div className="main-node Network-Devices Network-device-group Network-device-middle" data-align="network-devices">
              Network Devices
              <div className="devider"></div>
            </div>
            
            {/* --- SECTION 4 --- */}
            <div className="main-node Network-Design-Principles network-design-principles-group network-design-principles-middle" data-align="network-design">Network Design Principles</div>
            
            {/* --- SECTION 5 --- */}
            <div className="main-node OSI-MODEL OSI-MODEL-group OSI-MODEL-middle" data-align="osi">OSI MODEL</div>
            
            {/* --- SECTION 6 --- */}
            <div className="main-node TCP-IP-MODEL TCP-IP-group TCP-IP-middle" data-align="tcp-ip">TCP/IP Model</div>
            
            {/* --- SECTION 7 --- */}
            <div className="main-node Simulators-Tools Simulators-Tools-group Simulators-Tools-middle" data-align="simulators">Simulators &amp; Tools</div>

            {/* --- IP ADDRESSING --- */}
            <div className="main-node IP-Addressing ip-addressing-group IP-Addressing-middle" data-align="ip-addressing">IP Addressing</div>
            
            {/* --- SUBNETTING --- */}
            <div className="main-node Subnetting subnetting-group" data-align="subnetting">Subnetting</div>
            
            {/* --- SWITCHING --- */}
            <div className="main-node Switching switching-group Switching-middle" data-align="switching">Switching</div>
            
            {/* --- ROUTING --- */}
            <div className="main-node Routing routing-group Routing-middle" data-align="routing">Routing</div>
            
            {/* --- TUNNELING & VPNS --- */}
            <div className="main-node Tunneling-VPNs tunneling-vpns-group Tunneling-VPNs-middle" data-align="tunneling-vpns">Tunneling &amp; VPNs</div>
            
            {/* --- HIGH AVAILABILITY --- */}
            <div className="main-node High-Availability high-availability-group High-Availability-middle" data-align="high-availability">High Availability</div>
            
            {/* --- TRAFFIC MANAGEMENT --- */}
            <div className="main-node Traffic-Management traffic-management-group Traffic-Management-middle" data-align="traffic-management">Traffic Management</div>
          </div>

          {/* Right Side Box */}
          <div className="side-content right-side">
            
            {/* --- CERTIFICATIONS SECTION --- */}
            <div className="section-box roadmap-section certifications-section" style={{border: 'none', background: 'transparent', padding: 0}}>
              <h3 className="box-title">Certifications</h3>
              <div className="grid-2">
                <div className="roadmap-item">CCNA</div>
                <div className="roadmap-item">CCNP</div>
              </div>
              <div className="roadmap-item full-width">CompTIA Network+</div>
              <div className="roadmap-item full-width">CompTIA Security+</div>
              <div className="roadmap-item full-width">Cloud Certifications</div>
            </div>

            {/* --- SECTION 2: NETWORK TYPES --- */}
            <div className="section-box roadmap-section What-are-networks-group What-are-networks-right" data-align="network-types">
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

            {/* --- SECTION 3: NETWORK DEVICES --- */}
            <div className="section-box roadmap-section Network-device-group Network-device-right" data-align="network-devices">
              <h3 className="box-title Network-Devices">Network Devices</h3>
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

            {/* --- SECTION 4: OSI MODEL --- */}
            <div className="section-box roadmap-section osi-layer-box OSI-MODEL-group OSI-MODEL-right" data-align="osi">
              <h3 className="box-title">7 Layers</h3>
              <div className="grid-2">
                <div className="roadmap-item full-width">Physical</div>
                <div className="roadmap-item full-width">Data Link</div>
                <div className="roadmap-item full-width">Network</div>
                <div className="roadmap-item full-width">Transport</div>
                <div className="roadmap-item full-width">Session</div>
                <div className="roadmap-item full-width">Presentation</div>
                <div className="roadmap-item full-width">Application</div>
              </div>
            </div>

            <div className="section-box roadmap-section network-design-principles network-design-principles-right" data-align="network-design">
              <div className="grid-2">
                <div className="roadmap-item full-width">Design Best Practices</div>
              </div>
            </div>

            {/* --- SECTION 5: SIMULATORS & TOOLS --- */}
            <div className="section-box roadmap-section simulators-tools-box Simulators-Tools-group Simulators-Tools-right" data-align="simulators">
              <h3 className="box-title">Simulators &amp; Tools</h3>
              <div className="grid-2">
                <div className="roadmap-item full-width">Cisco Packet Tracer</div>
                <div className="roadmap-item full-width">VMWARE</div>
                <div className="roadmap-item">EVE-NG</div>
                <div className="roadmap-item">GNS3</div>
              </div>
            </div>

            {/* --- IP ADDRESSING --- */}
            <div className="section-box roadmap-section ip-addressing-group ip-addressing-right" data-align="ip-addressing">
              <h3 className="box-title nat-pat-title">NAT vs PAT</h3>
              <div className="nat-pat-separator" aria-hidden="true" />
              <div className="grid-2">
                <div className="roadmap-item full-width">Static vs Dynamic NAT</div>
                <div className="roadmap-item full-width">PAT/NAT Overload</div>
                <div className="roadmap-item full-width">NAT64</div>
              </div>
            </div>

            {/* --- SUBNETTING --- */}
            <div className="section-box roadmap-section subnetting-group subnetting-right" data-align="subnetting">
              <h3 className="box-title">Subnetting</h3>
              <div className="grid-2">
                <div className="roadmap-item full-width">Subnet Mask</div>
                <div className="roadmap-item">CIDR</div>
                <div className="roadmap-item">VLSM</div>
                <div className="roadmap-item">FLSM</div>
                <div className="roadmap-item">Wildcard Mask</div>
                <div className="roadmap-item full-width">Supernetting</div>
              </div>
            </div>

            {/* --- ROUTING --- */}
            <div className="section-box roadmap-section routing-group routing-right" data-align="routing">
              <h3 className="box-title">Routing Concepts</h3>
              <div className="grid-2">
                <div className="roadmap-item full-width">Static vs Dynamic Routing</div>
                <div className="roadmap-item full-width">Default Gateway</div>
                <div className="roadmap-item">SD-WAN</div>
                <div className="roadmap-item">VRFs</div>
              </div>
            </div>

            {/* --- HIGH AVAILABILITY --- */}
            <div className="section-box roadmap-section high-availability-group high-availability-right" data-align="high-availability">
              <h3 className="box-title">Redundancy &amp; Load Balancing</h3>
              <div className="grid-2">
                <div className="roadmap-item full-width">Load Balancer (Round Robin, Least Connections)</div>
                <div className="roadmap-item full-width">Failover &amp; Redundancy</div>
                <div className="roadmap-item">HSRP</div>
                <div className="roadmap-item">VRRP</div>
                <div className="roadmap-item">GLBP</div>
                <div className="roadmap-item">Traffic Management &amp; QoS</div>
              </div>
            </div>
            
          </div>
          
        </div>

      </div>
    </div>
  );
};

export default SkillRoadmap;