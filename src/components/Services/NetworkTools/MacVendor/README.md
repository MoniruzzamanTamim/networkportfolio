# Network Portfolio / MAC & IP Lookup Tool

A full-stack web application built with **React** and **Node.js (Express)** to lookup network information, including client IP/ISP details and MAC address vendor identification.

---

## Features
- **IP & ISP Information:** Detects client IP, ISP, country, region, city, and geolocation coordinates.
- **MAC Vendor Lookup:** Identifies the hardware manufacturer/vendor from a given MAC address utilizing the [MACVendors API](https://www.macvendorlookup.com/api/v2/${macAddress}).
- **Dynamic CORS:** Securely handles cross-origin requests for both development and production environments.

---

## Tech Stack
- **Frontend:** React, Axios
- **Backend:** Node.js, Express, Axios, CORS, Dotenv

---

## Backend API Documentation

Base URL: `http://localhost:5000`

### 1. Get IP & ISP Information
- **URL:** `/api/ip-info`
- **Method:** `GET`
- **Description:** Fetches public network and geolocation information based on the client's IP address.

### 2. MAC Address Vendor Lookup
- **URL:** `/api/lookup/:mac`
- **Method:** `GET`
- **URL Parameters:** `mac` (e.g., `B8:AE:ED:EB:D4:43`)
- **Description:** Queries the [MAC Address API](https://www.macvendorlookup.com/mac-address-api) to find the hardware manufacturer.
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "vendor": "Apple, Inc."
  }


USE API: https://www.macvendorlookup.com/mac-address-api

  CODE:

  // ==========================================
// 3. MAC ADDRESS VENDOR LOOKUP ROUTE (Using macvendorlookup.com API)
// ==========================================
app.get('/api/lookup/:mac', async (req, res) => {
  const macAddress = req.params.mac;

  try {
    const response = await axios.get(`https://www.macvendorlookup.com/api/v2/${macAddress}`);
    
    // API-ti jodi valid vendor pae tahole array ba object akare data dey
    if (response.data && response.data.length > 0) {
      res.json({ 
        success: true, 
        vendor: response.data[0].company // Company ba Vendor name
      });
    } else {
      res.status(404).json({ 
        success: false, 
        message: 'Vendor not found for this MAC address' 
      });
    }
  } catch (error) {
    console.error("MAC Lookup Error:", error.message);
    res.status(404).json({ 
      success: false, 
      message: 'Vendor not found or invalid MAC address' 
    });
  }
});