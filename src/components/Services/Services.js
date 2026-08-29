import React, { useState } from 'react';
import Project from './Project/Project';
import SubnetCalculator from './NetworkTools/SubnetCalculator/SubnetCalculator';
import SpeedTest from './SpeedTest/SpeedTest';
import './NetworkTools/NetworkTools.css';
import ISPINFORMATION from './NetworkTools/ISPINFORMATION/ISPINFORMATION';

const Services = () => {
  // Active tab state: 'services' | 'subnet' | 'bdix'
  const [activeTab, setActiveTab] = useState('services');

  return (
    <div className="network-tools-wrapper">
      {/* Navigation Tabs */}
      <div className="tools-tabs-container">
        <button
          className={`tool-tab-btn ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          Services Offered
        </button>
        <button
          className={`tool-tab-btn ${activeTab === 'subnet' ? 'active' : ''}`}
          onClick={() => setActiveTab('subnet')}
        >
          Subnet Calculator
        </button>
        <button
          className={`tool-tab-btn ${activeTab === 'bdix' ? 'active' : ''}`}
          onClick={() => setActiveTab('bdix')}
        >
          ISP INFO
        </button>
        <button
          className={`tool-tab-btn ${activeTab === 'speedtest' ? 'active' : ''}`}
          onClick={() => setActiveTab('speedtest')}
        >
          Speed Test
        </button>
      </div>

      {/* Tab Content Display */}
      <div className="tab-content-area">
        {activeTab === 'services' && <Project />}
        {activeTab === 'subnet' && <SubnetCalculator />}
        {activeTab === 'bdix' && <ISPINFORMATION />}
        {activeTab === 'speedtest' && <SpeedTest/>}
      </div>
    </div>
  );
};

export default Services;