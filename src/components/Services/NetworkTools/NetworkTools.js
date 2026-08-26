import React, { useState } from 'react';
import SubnetCalculator from './SubnetCalculator/SubnetCalculator';
import BdixSpeedTest from './BDIX & Speed Test/BdixSpeedTest';
import './NetworkTools.css';

const NetworkTools = () => {
  // Active tab state: 'subnet' | 'bdix'
  const [activeTab, setActiveTab] = useState('subnet');

  return (
    <div className="network-tools-wrapper">
      {/* Navigation Tabs */}
      <div className="tools-tabs-container">
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
          BDIX & Speed Test
        </button>
      </div>

      {/* Tab Content Display */}
      <div className="tab-content-area">
        {activeTab === 'subnet' && <SubnetCalculator />}
        {activeTab === 'bdix' && <BdixSpeedTest />}
      </div>
    </div>
  );
};

export default NetworkTools;