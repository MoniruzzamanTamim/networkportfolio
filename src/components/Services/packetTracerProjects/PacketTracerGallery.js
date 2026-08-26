import React, { useState } from 'react';
import './packetTracerProjects.css';
import phasedIspMigrationImage from './lab-image/PhasedISPMigration.png';
import routerOnAStickImage from './lab-image/Router on a stick.png';
import stpImage from './lab-image/STP.png';
import stpLoadBalancingImage from './lab-image/STP-loadBlancing.png';
import ccnaTroubleshootingImage from './lab-image/ccna_troubleshooting1.png';
import eigrpTroubleshootingImage from './lab-image/EIGRP Troubleshooting Complete.png';
import icnd2OspfImage from './lab-image/ICND2 OSPF.png';
import multiAreaOspfImage from './lab-image/Multi-area OSPF Complete.png';
import phasedIspMigrationPkt from './lab-file/PhasedISPMigration.pkt';
import routerOnAStickPkt from './lab-file/Router on a stick.pkt';
import stpPkt from './lab-file/STP.pkt';
import stpLoadBalancingPkt from './lab-file/TASK05.pkt';
import ccnaTroubleshootingPkt from './lab-file/ccna_troubleshooting1.pkt';
import eigrpTroubleshootingPkt from './lab-file/EIGRP Troubleshooting Complete.pkt';
import icnd2OspfPkt from './lab-file/ICND2 OSPF.pkt';
import multiAreaOspfPkt from './lab-file/Multi-area-OSPF-Complete.pkt.pkt';

// ১. প্রজেক্ট ডাটা অ্যারে
const packetTracerProjects = [
  {
    id: 1,
    title: 'Phased ISP Migration Topology Architecture',
    category: 'Network',
    description: 'Designed a dual-homed ISP network migration model featuring multi-upstream connectivity (TWC & WindStream), dot1Q sub-interface routing, loopback-simulated internet environments, and VLAN 300/400 trunking across L3 switches.',
    image: phasedIspMigrationImage,
    pktUrl: phasedIspMigrationPkt,
    highlights: [
      {
        label: 'Dual Upstream Migration',
        text: 'Integrated TWC and WindStream routers with dedicated loopback interfaces to simulate internet gateways.'
      },
      {
        label: 'Inter-VLAN Routing',
        text: 'Configured 802.1Q sub-interfaces on 2620XM routers for VLAN 300 and VLAN 400 default gateway termination.'
      },
      {
        label: 'Trunk Infrastructure',
        text: 'Enforced 802.1Q trunking across 3560 Multilayer Switch connections allowing secure VLAN transport.'
      }
    ]
  },
  {
    id: 2,
    title: 'Router-on-a-Stick Inter-VLAN Routing',
    category: 'Network',
    description: 'Implemented standard Router-on-a-Stick architecture utilizing Cisco 2811 router sub-interfaces (Fa0/1.100 and Fa0/1.200) paired with 802.1Q trunking on L3 switches for segmented subnet communication.',
    image: routerOnAStickImage,
    pktUrl: routerOnAStickPkt,
    highlights: [
      {
        label: 'Sub-Interface Design',
        text: 'Configured sub-interfaces for VLAN 100 (192.168.100.254/24) and VLAN 200 (192.168.200.254/24).'
      },
      {
        label: 'Switch Trunk Link',
        text: 'Established 802.1Q encapsulation trunk port on 3560 switch connecting directly to Cisco Firewall/Router.'
      }
    ]
  },
  {
    id: 3,
    title: 'Spanning Tree Protocol (STP) Mesh Topology',
    category: 'Network',
    description: 'Engineered a highly redundant L2 switch mesh using Cisco 2960 switches to test Spanning Tree Protocol convergence, Root Bridge elections, and automatic blocking of redundant loops.',
    image: stpImage,
    pktUrl: stpPkt,
    highlights: [
      {
        label: 'Loop Prevention',
        text: 'Eliminated L2 broadcast storms through dynamic STP port status monitoring (Forwarding vs Blocking).'
      },
      {
        label: 'Redundant Links',
        text: 'Multi-cable switch interconnectivity to ensure uninterrupted LAN access during primary link failure.'
      }
    ]
  },
  {
    id: 4,
    title: 'PVST+ STP Load Balancing Topology',
    category: 'Network',
    description: 'Configured Per-VLAN Spanning Tree Plus (PVST+) across a multi-switch diamond topology, enabling dynamic per-VLAN root bridge assignments and dual-router default gateway redundancy.',
    image: stpLoadBalancingImage,
    pktUrl: stpLoadBalancingPkt,
    highlights: [
      {
        label: 'VLAN Load Distribution',
        text: 'Balanced traffic flow by splitting VLAN 3 and VLAN 4 active paths across SW2 and SW3.'
      },
      {
        label: 'Subnet Segmentation',
        text: 'Classless /26 and /28 VLSM IP addressing scheme deployed across endpoint client groups and switches.'
      }
    ]
  },
  {
    id: 5,
    title: 'Enterprise CCNA Multi-Tier Network Infrastructure',
    category: 'Network',
    description: 'Complex multi-layered enterprise network featuring dual ISP uplinks, Frame Relay WAN cloud, Core/Distribution switch stacks, EtherChannel bundling, and SVI/802.1Q trunking.',
    image: ccnaTroubleshootingImage,
    pktUrl: ccnaTroubleshootingPkt,
    highlights: [
      {
        label: 'WAN & Core Layer',
        text: 'Multi-point Frame Relay WAN connection linking Edge routers to dual Core switch backbones.'
      },
      {
        label: 'Link Aggregation',
        text: 'Configured L2 Port-Channels (Po1) between Distribution switches for high-bandwidth trunk aggregation.'
      }
    ]
  },
  {
    id: 6,
    title: 'EIGRP Routing Protocol & Troubleshooting Topology',
    category: 'Network',
    description: 'Designed a 4-router mesh topology running Enhanced Interior Gateway Routing Protocol (EIGRP) with autonomous system convergence, metric tuning, and neighbor adjacency diagnostics.',
    image: eigrpTroubleshootingImage,
    pktUrl: eigrpTroubleshootingPkt,
    highlights: [
      {
        label: 'Dynamic Convergence',
        text: 'Configured EIGRP across 10.1.0.0/24 subnets for fast route recalculation and Feasible Successor selection.'
      },
      {
        label: 'Point-to-Point Links',
        text: 'Interconnected Cisco 1841 routers through central switch S0 to analyze EIGRP neighbor discovery.'
      }
    ]
  },
  {
    id: 7,
    title: 'Multi-Router ICND2 OSPF Single-Area Topology',
    category: 'Network',
    description: 'Full-mesh OSPF Area 0 routing environment with central distribution router R1 connecting branch routers (R2, R3, R4, R5) via point-to-point serial and Ethernet networks.',
    image: icnd2OspfImage,
    pktUrl: icnd2OspfPkt,
    highlights: [
      {
        label: 'Star-Mesh OSPF Design',
        text: 'Centralized OSPF backbone setup ensuring equal-cost multi-path (ECMP) routing across branch sites.'
      },
      {
        label: 'Subnet Addressing',
        text: 'Structured point-to-point /30 subnets (172.22.200.0/30, 172.22.201.0/30) for bandwidth optimization.'
      }
    ]
  },
  {
    id: 8,
    title: 'Multi-Area OSPF Architecture (Area 0 & Area 1)',
    category: 'Network',
    description: 'Configured Multi-Area OSPF routing using Area Border Router (ABR1) to interconnect Area 1 mesh topology with Area 0 backbone, reducing LSA flooding and routing table overhead.',
    image: multiAreaOspfImage,
    pktUrl: multiAreaOspfPkt,
    highlights: [
      {
        label: 'ABR Interconnection',
        text: 'Configured Cisco 2811 as Area Border Router (ABR1) to translate Type 3 Summary LSAs between Area 0 and Area 1.'
      },
      {
        label: 'Hierarchical Routing',
        text: 'Segmented local router traffic within Area 1 while retaining full redundancy to Backbone Area 0.'
      }
    ]
  }
];

// ২. মূল React কম্পোনেন্ট
const PacketTracerGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageZoom, setImageZoom] = useState(1);

  const openImage = (project) => {
    setSelectedImage(project);
    setImageZoom(1);
  };

  const closeImage = () => {
    setSelectedImage(null);
    setImageZoom(1);
  };

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h1>Cisco Packet Tracer Lab Projects</h1>
        <p>Explore network topologies, routing configurations, and downloadable .pkt lab files.</p>
      </div>

      <div className="projects-grid">
        {packetTracerProjects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="card-top">
              <div
                className="card-image-wrapper"
                onClick={() => openImage(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    openImage(project);
                  }
                }}
              >
                <img src={project.image} alt={project.title} className="card-image" />
                <span className="category-badge">{project.category}</span>
              </div>

              <div className="card-body">
                <h2 className="card-title">{project.title}</h2>
                <p className="card-description">{project.description}</p>

                {project.highlights && (
                  <div className="highlights-container">
                    {project.highlights.map((highlight, index) => (
                      <div key={index} className="highlight-item">
                        <span className="highlight-label">• {highlight.label}</span>
                        <span className="highlight-text">{highlight.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="card-footer">
              <a href={project.pktUrl} download className="download-btn">
                <svg className="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PKT File
              </a>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="pt-image-modal" onClick={closeImage}>
          <div className="pt-image-modal-content" onClick={(event) => event.stopPropagation()}>
            <button
              className="pt-image-modal-close"
              onClick={closeImage}
              aria-label="Close image preview"
            >
              &times;
            </button>
            <div className="pt-image-toolbar" aria-label="Image zoom controls">
              <button onClick={() => setImageZoom((zoom) => Math.max(1, zoom - 0.25))} aria-label="Zoom out">−</button>
              <span>{Math.round(imageZoom * 100)}%</span>
              <button onClick={() => setImageZoom((zoom) => Math.min(2.5, zoom + 0.25))} aria-label="Zoom in">+</button>
            </div>
            <div className="pt-image-modal-frame">
              <img src={selectedImage.image} alt={selectedImage.title} style={{ transform: `scale(${imageZoom})` }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PacketTracerGallery;
