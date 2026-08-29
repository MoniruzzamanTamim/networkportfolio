// src/components/ISPINFORMATION/ISPINFORMATION.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ISPINFORMATION.css'; // CSS File Import

const ISPINFORMATION = () => {
    const [ipData, setIpData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIpInfo = async () => {
            try {
                const response = await axios.get(' https://networkportfolio-backend.onrender.com/api/ip-info');
                if (response.data && response.data.status !== 'fail') {
                    setIpData(response.data);
                } else {
                    setError("IP details paoya jayni.");
                }
            } catch (err) {
                console.error("Frontend Fetch Error:", err);
                setError("Backend server-er shathe connect kora jachhe na!");
            } finally {
                setLoading(false);
            }
        };

        fetchIpInfo();
    }, []);

    if (loading) return <div style={{ padding: '30px', color: '#fff', textAlign: 'center' }}>Loading IP Details...</div>;
    if (error) return <div style={{ padding: '30px', color: '#ff6b6b', textAlign: 'center' }}>{error}</div>;

    const lat = ipData.lat || 23.8103;
    const lon = ipData.lon || 90.4125;
    const mapUrl = `https://maps.google.com/maps?q=${lat},${lon}&z=10&output=embed`;

    return (
        <div className="isp-container">
            {/* Left Column: IP & Details */}
            <div className="isp-left-column">
                
                {/* IPv4 / IPv6 Section */}
                <div>
                    <p className="isp-section-title">My IP Address is:</p>
                    <div className="isp-card">
                        <div className="isp-row">
                            <span>IPv4: <span className="isp-help-icon">?</span></span>
                            <span className="isp-address">{ipData.query}</span>
                        </div>
                        <div className="isp-row isp-border-top">
                            <span>IPv6: <span className="isp-help-icon">?</span></span>
                            <span style={{ fontWeight: 'bold' }}>Not detected</span>
                        </div>
                    </div>
                </div>

                {/* ISP Information & Action Button */}
                <div className="isp-bottom-row">
                    <div className="isp-info-box">
                        <p className="isp-section-title">My IP Information:</p>
                        <div className="isp-card">
                            <p style={{ margin: '4px 0' }}><strong>ISP:</strong> {ipData.isp}</p>
                            <p style={{ margin: '4px 0' }}><strong>City:</strong> {ipData.city}</p>
                            <p style={{ margin: '4px 0' }}><strong>Region:</strong> {ipData.regionName}</p>
                            <p style={{ margin: '4px 0' }}><strong>Country:</strong> {ipData.country}</p>
                        </div>
                    </div>

                    <div className="isp-cta-box">
                        <p style={{ margin: '0 0 10px 0', fontSize: '15px' }}>Your location may be exposed!</p>
                        <button className="isp-hide-btn">
                            🛡️ HIDE MY IP ADDRESS NOW
                        </button>
                        <a href="#details" className="isp-link">Show Complete IP Details</a>
                    </div>
                </div>

            </div>

            {/* Right Column: Live Google Map */}
            <div className="isp-right-column">
                <div className="isp-map-container">
                    <iframe 
                        title="IP Location Map"
                        src={mapUrl}
                        width="100%" 
                        height="220" 
                        style={{ border: 0, borderRadius: '4px' }} 
                        loading="lazy"
                    />
                </div>
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <p style={{ margin: 0, fontSize: '13px' }}>Location not accurate?</p>
                    <a href="#update" className="isp-link">Update My IP Location</a>
                </div>
            </div>
        </div>
    );
};

export default ISPINFORMATION;