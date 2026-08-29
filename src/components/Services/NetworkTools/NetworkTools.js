import React, { useState } from 'react';
import SubnetCalculator from './SubnetCalculator/SubnetCalculator';
import './NetworkTools.css';
import ISPINFORMATION from './ISPINFORMATION/ISPINFORMATION';

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
          ISP INFO
        </button>
      </div>

      {/* Tab Content Display */}
      <div className="tab-content-area">
        {activeTab === 'subnet' && <SubnetCalculator />}
        {activeTab === 'subnet' && <ISPINFORMATION />}
       
      </div>
    </div>
  );
};

export default NetworkTools;