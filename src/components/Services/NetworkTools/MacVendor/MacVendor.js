import React, { useState } from 'react';
import axios from 'axios';
import './MacVendor.css'; // Optional: For custom styling

export default function MacLookup() {
    const [mac, setMac] = useState('');
    const [vendor, setVendor] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLookup = async (e) => {
        e.preventDefault();
        if (!mac.trim()) return;

        setLoading(true);
        setError('');
        setVendor(null);

        try {
            const response = await axios.get(`http://localhost:5000/api/lookup/${mac}`);
            if (response.data.success) {
                setVendor(response.data.vendor);
            }
        } catch (err) {
            setError('Could not find a registered vendor for this MAC address.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '50px auto', textAlign: 'center', fontFamily: 'sans-serif' }}>
            <h2>Local MAC Address Vendor Lookup</h2>
            <form onSubmit={handleLookup} style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
                <input
                    type="text"
                    placeholder="00:00:00:00:00:00"
                    value={mac}
                    onChange={(e) => setMac(e.target.value)}
                    style={{ padding: '10px', fontSize: '16px', width: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button type="submit" className="mac-button">
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>

            {vendor && (
                <div style={{ marginTop: '20px', padding: '15px', background: '#e2f0d9', borderRadius: '4px', color: '#385723' }}>
                    <strong>Vendor:</strong> {vendor}
                </div>
            )}

            {error && (
                <div style={{ marginTop: '20px', padding: '15px', background: '#fce4d6', borderRadius: '4px', color: '#c65911' }}>
                    {error}
                </div>
            )}
        </div>
    );
}