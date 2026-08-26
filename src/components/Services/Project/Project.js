import React, { useState } from 'react';
import './Projects.css';
import coloDataCenterImage from '../../../Image/colo-data.jpg';
import Hardware from '../../../Image/Hardware.png';
import ISP from '../../../Image/ISP.png';
import ISP2 from '../../../Image/ISP-2.png';
import Dude from '../../../Image/Dude.jpg';
import PacketTracerGallery from '../packetTracerProjects/PacketTracerGallery';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null); // Modal State
  const [imageZoom, setImageZoom] = useState(1);

  const openImage = (project) => {
    setSelectedImage(project);
    setImageZoom(1);
  };

  const closeImage = () => {
    setSelectedImage(null);
    setImageZoom(1);
  };

  const projectsData = [
    { 
      id: 1, 
      title: 'Network Infrastructure Design', 
      category: 'Network',
      description: 'Enterprise level core network topology design, VLAN routing, and high-availability configuration for core data centers.',
      image: ISP2,
      details: [
        {
          title: 'Key Technical Stack & Technologies',
          items: [
            'Routing & Switching: Cisco Core/Distribution Switches, Enterprise Routers, VLANs, Inter-VLAN Routing, Subnetting.',
            'Protocols: OSPF (Internal Routing), BGP (Edge Peering), STP/PVSTP (Loop Prevention), EtherChannel (LACP).',
            'Security & VPN: Firewall Rules, Access Control Lists (ACLs), IPsec Tunneling, SELinux policies.',
            'High Availability: Redundant Gateways (VRRP/HSRP), Dynamic Path Selection, Zero-Downtime Failover.'
          ]
        },
        {
          title: 'Topology & Network Architecture Highlights',
          items: [
            'Core & Distribution Layer: High-speed backbone configuration connecting Core Switches via LACP EtherChannel for aggregated bandwidth and port redundancy.',
            'VLAN Segmentation: Multi-VLAN architecture separating Management, Operations, Server Farm, Voice, and Guest networks to reduce broadcast domains and optimize security.',
            'Routing Strategy: OSPF implemented across core-distribution links for fast dynamic route convergence; BGP handles redundant Upstream ISP paths.',
            'Security Rules: Layer 3/4 ACLs filtering traffic between inter-VLAN communications, restricting unauthorized access to server segments.'
          ]
        },
        {
          title: 'Results & Performance Impact',
          items: [
            'Redundancy: Achieved 99.9% network uptime with automated failover mechanisms across link and switch failures.',
            'Scalability: Modular design ready to integrate additional switches/access points without altering core routing logic.',
            'Security: Reduced attack surface by enforcing strict firewall policies and isolated broadcast domains.'
          ]
        }
      ]
    },
    { 
      id: 2, 
      title: 'NOC Setup', 
      category: 'Workstation',
      description: '24/7 Network Operations Center (NOC) setup featuring real-time monitoring tools, patch management, and rack management.',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop',
      details: [
        {
          title: 'Executive Summary & Objective',
          items: [
            'Project Name: Enterprise 24/7 Network Operations Center (NOC) Architecture & Monitoring Infrastructure.',
            'Role: NOC Executive / Infrastructure Engineer.',
            'Objective: Designed, structured, and implemented a high-availability NOC setup to provide proactive 24/7 telemetry monitoring, automated alert triggers, patch management, and streamlined incident resolution for core network devices.'
          ]
        },
        {
          title: 'Key Technical Stack & Monitoring Tools',
          items: [
            'Network Telemetry & NMS: MikroTik The Dude, Zabbix / Nagios, PRTG Network Monitor.',
            'Protocols & SNMP: SNMP v2c/v3, ICMP Echo, Syslog Parsing, NetFlow/SFlow for traffic bandwidth analysis.',
            'Patch & Rack Management: Structured Cabling (Cat6a/Fiber), Cable Organization, PDU Management, Patch Panel Tagging.',
            'Alerting & Ticketing Systems: Telegram Bot / Email alerts, Jira Service Desk, and escalation-matrix logic.'
          ]
        },
        {
          title: 'NOC Infrastructure Architecture & Workflow Highlights',
          items: [
            'Multi-Screen Monitoring Wall: Screen 1 displays a real-time The Dude topology map (green = operational, yellow = high latency, red = down); Screen 2 shows live MRTG bandwidth charts for Upstream BGP links and Core interfaces; Screen 3 shows incident logs, trap monitoring, and the ticketing queue.',
            'Incident Management & Escalation: Level 1 automatically detects and triages alerts, with Ping/Traceroute diagnostics and link verification within 3 minutes. Level 2 isolates routing, packet-loss, or hardware faults and executes failover or remote CLI intervention. Level 3 dispatches field teams or escalates fiber/upstream incidents to the ISP NOC with SLA tracking.',
            'Rack & Physical Infrastructure: Standardized patch-panel layout with color-coded Cat6a patching for Core, Server, DMZ, and Management networks; dual-redundant UPS (A+B Feed) powers monitoring servers and display units during power loss.'
          ]
        },
        {
          title: 'Performance Impact & Operational Outcomes',
          items: [
            'MTTD (Mean Time to Detect): Reduced from 15 minutes to under 60 seconds via automated SNMP trap alerts.',
            'MTTR (Mean Time to Resolve): Achieved an average 40% reduction through structured escalation workflows.',
            'Uptime Assurance: Maintained 99.9% uptime across all monitored node segments.'
          ]
        }
      ]
    },
    { 
      id: 3, 
      title: 'Server Automation Lab', 
      category: 'Gallery',
      description: 'RHEL and AlmaLinux enterprise lab testing automated deployments, DNS/Mail servers, and security rule hardening.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
      details: [
        {
          title: 'Executive Summary & Objective',
          items: [
            'Project Name: Enterprise Red Hat Enterprise Linux (RHEL) & AlmaLinux Server Automation Lab.',
            'Role: Systems Administrator / Infrastructure Engineer.',
            'Objective: Designed and deployed an automated enterprise Linux server infrastructure showcasing identity management, central service configuration (DNS, Mail, Web), and OS-level security rule hardening.'
          ]
        },
        {
          title: 'Key Technical Stack & Technologies',
          items: [
            'Operating Systems: Red Hat Enterprise Linux (RHEL 8/9), AlmaLinux OS.',
            'Core Services: BIND9 (DNS), Postfix & Dovecot (Mail Server), Nginx/Apache (Web Server).',
            'Security & Compliance: SELinux (Enforcing Mode), Firewalld (Zone Rules), SSH Hardening, Fail2ban.',
            'Automation & Scripting: Bash Shell Scripting, Ansible Playbooks, Systemd Service Management.'
          ]
        },
        {
          title: 'Infrastructure Architecture & Implementation Details',
          items: [
            'Core Identity & Domain Infrastructure: Configured Primary & Secondary BIND9 DNS servers with forward/reverse lookup zones for internal service discovery; deployed Postfix (SMTP) and Dovecot (IMAP/POP3) with TLS encryption and SASL authentication for secure enterprise messaging.',
            'Automation & Deployment Workflow: Created Bash scripts and Ansible playbooks for zero-touch OS bootstrap, repository updates, LAMP/LEMP deployment, and user-access management; standardized logs through rsyslog and automated log rotation policies.',
            'Security Rule Hardening: Kept SELinux in Enforcing mode with precise security contexts and custom port bindings; configured firewalld zone-based access for only ports 22, 80, 443, 53, 25, and 993; disabled root SSH login, changed the default SSH port, and enforced RSA SSH key authentication.'
          ]
        },
        {
          title: 'Performance & Security Impact',
          items: [
            'Deployment Efficiency: Reduced server setup time by 70% through automated scripting and configuration management.',
            'Security Posture: Achieved zero unauthorized access attempts by enforcing mandatory access control (SELinux) and key-based SSH authentication.',
            'Reliability: Maintained service health using automated systemd recovery rules and monitoring scripts.'
          ]
        }
      ]
    },
    { 
      id: 4, 
      title: 'Enterprise MikroTik VPN & Multi-WAN Load Balancing', 
      category: 'Network',
      description: 'Secure site-to-site IPsec & PPTP VPN configuration with multi-WAN load balancing and automated failover rules.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
      details: [
        {
          title: 'Executive Summary & Objective',
          items: [
            'Project Name: MikroTik Multi-WAN Load Balancing, Dynamic Failover & Secure IPsec/PPTP Site-to-Site VPN.',
            'Role: Network Specialist / Infrastructure Engineer.',
            'Objective: Designed and configured an enterprise-grade MikroTik RouterOS setup to achieve redundant internet connectivity, automated failover, bandwidth optimization, and secure encrypted site-to-site communication across remote branches.'
          ]
        },
        {
          title: 'Key Technical Stack & RouterOS Configurations',
          items: [
            'Routing & Load Balancing: RouterOS v7, PCC (Per Connection Classifier), ECMP, Recursive Route Tracking (Netwatch / Scope-based failover).',
            'Security & VPN Protocols: IPsec (IKEv2 / AES-256), PPTP/L2TP with IPsec, GRE Tunnels, WireGuard.',
            'Firewall & Traffic Shaping: RouterOS Connection Tracking, Mangle Rules, Layer 7 Filtering, NAT/PAT, Simple Queues / Queue Trees (PCQ).'
          ]
        },
        {
          title: 'Network Architecture & Implementation Details',
          items: [
            'Multi-WAN Load Balancing & Automated Failover: Implemented PCC mangle rules to evenly distribute user traffic across dual Upstream ISPs by source and destination IP pairs; configured recursive gateway checks via 8.8.8.8 and 1.1.1.1 to detect upstream drops and switch paths in under 2 seconds.',
            'Site-to-Site IPsec & PPTP VPN Integration: Established AES-256/SHA-256 encrypted IPsec tunnels between headquarters and remote branches; configured OSPF over GRE/IPsec tunnels for dynamic route propagation across office sites.',
            'Firewall Security & Bandwidth Management: Deployed strict Input/Forward firewall filters to block brute-force attacks, drop invalid connections, and limit Winbox/SSH access to management IPs; configured PCQ to distribute bandwidth fairly and prevent single-user congestion.'
          ]
        },
        {
          title: 'Performance Impact & Network Reliability',
          items: [
            'Uptime Performance: Guaranteed zero-downtime internet continuity during a single ISP link failure through automated recursive routing.',
            'Security & Compliance: Fully encrypted site-to-site communication protects internal server traffic across untrusted public networks.',
            'Bandwidth Efficiency: Improved total throughput utilization by 45% across dual ISP WAN links.'
          ]
        }
      ]
    },
    { 
      id: 5, 
      title: 'Colo City Data Center', 
      category: 'Network',
      description: 'Configured and maintained a high-availability data center with seamless upstream network connectivity.',
      image: coloDataCenterImage
    },
    {
      id: 6,
      title: 'BGP Multihoming & Multi-WAN Failover',
      category: 'Network',
      description: 'Implemented BGP dual-homed architecture with multiple Upstream ISPs, establishing IP route redundancy, dynamic path selection, and zero-downtime failover.',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 7,
      title: 'Hardware & Peripheral Maintenance Lab',
      category: 'Workstation',
      description: 'Managed core workstation hardware configurations—including motherboard, CPU, and System BIOS/UEFI setup—alongside troubleshooting Windows Control Panel utilities and installing peripheral devices.',
      image: Hardware,
      details: [
        {
          title: 'Executive Summary',
          items: [
            'Project Name: Hardware & Peripheral Maintenance Lab.',
            'Domain: System Administration, Hardware Optimization & Enterprise Workstation Support.',
            'Engineer: MD. Moniruzzaman Tamim.',
            'Focus: Built a standardized, reliable, and secure workstation infrastructure for enterprise environments, covering component setup, BIOS/UEFI hardening, peripheral deployment, and OS-level system maintenance.'
          ]
        },
        {
          title: 'Technical Architecture & Component Structure',
          items: [
            'Core Hardware: Multi-socket enterprise/workstation motherboards supporting Intel/AMD chipsets, VT-x/AMD-V virtualization, and TPM 2.0 modules.',
            'Memory & Storage: DDR4/DDR5 RAM with ECC support; dual-storage design using NVMe SSD boot drives and RAID-configured SATA SSD/HDD persistent storage.',
            'Firmware Baseline: Custom UEFI/BIOS configurations, Secure Boot enforcement, and hardware-level virtualization enablement.',
            'Peripheral Infrastructure: Network-attached MFP printers and high-speed document scanners via IP/LPR protocols; DVR/NVR monitoring endpoints integrated with IP-based access-control systems.',
            'OS & Maintenance Utilities: Windows Enterprise / RHEL Desktop environments with Windows Control Panel, Device Manager, Computer Management, Disk Management, Services, Event Viewer, and MMC snap-ins.'
          ]
        },
        {
          title: 'Implementation & Operational Workflow',
          items: [
            'Phase 1 — Hardware & UEFI: Component assembly, motherboard setup, and BIOS/UEFI hardening.',
            'Phase 2 — OS Deployment: Storage partitioning, driver installation, and power/security configuration.',
            'Phase 3 — Peripherals & Optimization: Print/scan setup, CCTV/NVR interfacing, and system maintenance.',
            'Firmware & BIOS Configuration: Applied BIOS updates for ACPI compatibility and CPU microcode fixes; customized boot order, disabled unused legacy ports, and enforced supervisor passwords.',
            'Peripheral & Driver Management: Deployed signed WHQL drivers to eliminate IRQ/DMA conflicts; configured shared print queues and network scanner folders via SMB/FTP with permission groups.',
            'Troubleshooting & Maintenance: Implemented cleanup scripts, temp-file deletion, HDD defragmentation, SSD TRIM, and monitoring for thermal profiles, S.M.A.R.T. disk status, and power-supply voltages.'
          ]
        },
        {
          title: 'Key Metrics & Deliverables',
          items: [
            'Hardware Reliability: S.M.A.R.T. monitoring and scheduled maintenance reduced workstation hardware failure rates by 35%.',
            'System Security: Secure Boot and TPM 2.0 improved protection against rootkits and unauthorized boot media.',
            'Peripheral Uptime: Dedicated network print/scan server rules reduced peripheral access downtime and driver-error tickets.',
            'Troubleshooting Speed: Standardized maintenance SOPs accelerated resolution of local hardware issues.'
          ]
        },
        {
          title: 'Technical Highlights & Best Practices',
          items: [
            'Hardware Standardization: Enforced standardized component profiles across lab machines to simplify replacement-part inventory.',
            'Security Compliance: Restricted access to Windows Control Panel and Administrative Tools through Group Policy Objects (GPO).',
            'Thermal Management: Optimized chassis airflow to maintain safe operating temperatures during heavy diagnostic workloads.'
          ]
        }
      ]
    },
    {
      id: 8,
      title: 'Layer 2 & Layer 3 Enterprise Switching Infrastructure',
      category: 'Network',
      description: 'Engineered enterprise switching infrastructure implementing multi-VLAN segmentation, Inter-VLAN routing, loop prevention via STP/PVSTP, and link aggregation through EtherChannel (LACP) to ensure optimal bandwidth utilization and Layer 2 stability.',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop',
      diagramUrl: 'https://viewer.diagrams.net/', // আপনার Draw.io বা ডায়াগ্রামের লিংক বসান
      highlights: [
        {
          label: 'VLAN & Trunking',
          text: 'Configured 802.1Q Trunking, VTP domains, and isolated network traffic across multiple operational departments.'
        },
        {
          label: 'Inter-VLAN Routing',
          text: 'Enabled Layer 3 Switch routing (SVI & Routed Ports) and Router-on-a-Stick setup for secure cross-subnet communication.'
        },
        {
          label: 'Loop Prevention & Redundancy',
          text: 'Implemented Spanning Tree Protocol (STP) and PVSTP+ for loop-free switching topologies and automated failover paths.'
        },
        {
          label: 'Link Aggregation',
          text: 'Bundled physical interfaces using EtherChannel (LACP) to double backbone bandwidth and maintain interface-level redundancy.'
        }
      ]
    },
    {
      id: 9,
      title: 'End-to-End ISP Network Infrastructure Architecture (A-Z)',
      category: 'Network',
      description: 'Designed and deployed a full-scale ISP network topology incorporating Upstream BGP Peering, Core/Distribution routing, MikroTik PPPoE Bras, OSPF dynamic routing, and FTTx/PON Access Networks.',
      image: ISP,
      diagramUrl: 'https://viewer.diagrams.net/', // আপনার Draw.io বা ডায়াগ্রামের লিংক বসান
      highlights: [
        {
          label: 'Edge Layer (Upstream & Gateway)',
          text: 'Dual Upstream ISP peering via eBGP with AS-Path Prepending and Local Preference, alongside IXP (BDIX) peering setup for low-latency local traffic routing.'
        },
        {
          label: 'Core Layer (Core Switch & Router)',
          text: 'Core routing using OSPF for internal dynamic convergence and MPLS/VLAN segmentation across core backbones for traffic isolation.'
        },
        {
          label: 'Aggregation & Subscriber Control (BRAS/NAS)',
          text: 'MikroTik PPPoE/Static IP server setup with RADIUS integration, Simple Queue/PCQ bandwidth management, Multi-WAN load balancing, and dynamic failover NAT.'
        },
        {
          label: 'Access Layer (FTTx / PON Network)',
          text: 'EPON/GPON OLT and ONU network design with optical splitters, plus Layer 2 switch deployment featuring Port Security, VLAN per PON port, and DHCP Snooping.'
        },
        {
          label: 'Operations & Monitoring (NOC)',
          text: 'Real-time network health monitoring via PRTG/Zabbix, ICMP Ping/Traceroute diagnostics, Syslog logging, User Activity Tracking, and Firewall DoS Protection.'
        }
      ]
    },
    {
      id: 10,
      title: 'Comprehensive ISP Network Topology Map (The Dude Monitoring)',
      category: 'Network',
      description: 'Designed and mapped an end-to-end ISP network architecture using MikroTik The Dude network monitoring tool. The map visually structures five primary infrastructure layers—Edge (eBGP & BDIX peering), Core (OSPF dynamic routing & high-speed backbones), Aggregation (MikroTik BRAS/PPPoE & RADIUS integration), Access (FTTx/PON OLTs and ONUs), and NOC Operations (real-time ping/latency, link capacity monitoring, and traffic telemetry).',
      image: Dude,
      diagramUrl: 'https://viewer.diagrams.net/', // আপনার Draw.io বা ডায়াগ্রামের লিংক বসান
      highlights: [
        {
          label: 'Edge Layer:',
          text: 'Multi-homed eBGP Upstream ISP connections and low-latency BDIX/IXP peering links.'
        },
        {
          label: 'Core Backbone:',
          text: 'High-speed OSPF core routing, fiber redundancy, and VLAN segmentation.'
        },
        {
          label: 'Subscriber Management',
          text: 'MikroTik PPPoE/Static IP server integration with RADIUS authentication and PCQ bandwidth control.'
        },
        {
          label: 'FTTx Access Network',
          text: 'GPON/EPON OLT deployment, optical splitting, and ONU endpoint mapping.'
        },
        {
          label: 'Live Telemetry:',
          text: 'Real-time visual status tracking for link latency, bandwidth utilization, and device health using The Dude.'
        }
      ]
    },
  ];

  const categories = ['All', 'Network', 'Workstation', 'Packet Tracer'];

  const filteredProjects = activeTab === 'All' 
    ? projectsData 
    : projectsData.filter(item => item.category === activeTab);

  return (
    <section className="projects-section" id="projects-section">
      <h2 className="projects-title">Projects</h2>
      
      {/* Tabs */}
      <div className="tabs-container">
        {categories.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      {activeTab === 'Packet Tracer' ? (
        <PacketTracerGallery />
      ) : (
      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div key={project.id} className="project-card">
            <div 
              className="card-image-wrapper"
              onClick={() => openImage(project)}
            >
              <img src={project.image} alt={project.title} className="card-image" />
              <span className="category-badge">{project.category}</span>
              <div className="image-overlay">
                <span>Click to View</span>
              </div>
            </div>
            <div className="card-content">
              <h3>{project.title}</h3>
              <p className="card-description">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Lightbox / Image Modal Pop-up */}
      {selectedImage && (
        <div className="modal-overlay" onClick={closeImage}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeImage}>&times;</button>
            <div className="image-lightbox-toolbar" aria-label="Image zoom controls">
              <button onClick={() => setImageZoom((zoom) => Math.max(1, zoom - 0.25))} aria-label="Zoom out">−</button>
              <span>{Math.round(imageZoom * 100)}%</span>
              <button onClick={() => setImageZoom((zoom) => Math.min(2.5, zoom + 0.25))} aria-label="Zoom in">+</button>
            </div>
            <div className="modal-image-frame">
              <img src={selectedImage.image} alt={selectedImage.title} className="modal-image" style={{ transform: `scale(${imageZoom})` }} />
            </div>
            
            <div className="modal-details">
              <h3>{selectedImage.title}</h3>
              <p className="modal-description">{selectedImage.description}</p>

              {/* Topology Diagram Link Button */}
              {selectedImage.diagramUrl && (
                <div className="diagram-btn-wrapper">
                  <a 
                    href={selectedImage.diagramUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="view-diagram-btn"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                    View Full Topology Diagram (Draw.io)
                  </a>
                </div>
              )}

              {/* Dynamic Highlights */}
              {selectedImage.highlights && selectedImage.highlights.length > 0 && (
                <div className="modal-highlights">
                  <h4>Key Technical Highlights:</h4>
                  <ul>
                    {selectedImage.highlights.map((item, index) => (
                      <li key={index}>
                        <strong>{item.label}:</strong> {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedImage.details && (
                <div className="project-detail-sections">
                  {selectedImage.details.map((section) => (
                    <section key={section.title} className="project-detail-section">
                      <h4>{section.title}</h4>
                      <ul>
                        {section.items.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </section>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
