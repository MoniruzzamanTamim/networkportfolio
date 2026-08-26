import React, { useState } from 'react';
import './SubnetCalculator.css';  

const SubnetCalculator = () => {
  const [ip, setIp] = useState('43.224.108.175');
  const [cidr, setCidr] = useState('22');
  const [calcResult, setCalcResult] = useState(null);
  const [error, setError] = useState('');

  // ==========================================
  // IPv4 -> Integer
  // ==========================================
  const ipToInt = (ipStr) => {
    const parts = ipStr.trim().split('.');

    if (parts.length !== 4) {
      throw new Error('Invalid IPv4 address');
    }

    const octets = parts.map((part) => {
      if (part === '' || !/^\d+$/.test(part)) {
        throw new Error('Invalid IPv4 address');
      }

      const value = Number(part);

      if (value < 0 || value > 255) {
        throw new Error('Each IPv4 octet must be between 0 and 255');
      }

      return value;
    });

    return (
      (
        (octets[0] << 24) |
        (octets[1] << 16) |
        (octets[2] << 8) |
        octets[3]
      ) >>> 0
    );
  };

  // ==========================================
  // Integer -> IPv4
  // ==========================================
  const intToIp = (int) => {
    return [
      (int >>> 24) & 255,
      (int >>> 16) & 255,
      (int >>> 8) & 255,
      int & 255,
    ].join('.');
  };

  // ==========================================
  // Integer -> Binary IPv4
  // ==========================================
  const intToBinary = (int) => {
    return [
      (int >>> 24) & 255,
      (int >>> 16) & 255,
      (int >>> 8) & 255,
      int & 255,
    ]
      .map((octet) =>
        octet.toString(2).padStart(8, '0')
      )
      .join('.');
  };

  // ==========================================
  // IP Class
  // ==========================================
  const getIpClass = (firstOctet) => {
    if (firstOctet >= 1 && firstOctet <= 126) {
      return 'A';
    }

    if (firstOctet >= 128 && firstOctet <= 191) {
      return 'B';
    }

    if (firstOctet >= 192 && firstOctet <= 223) {
      return 'C';
    }

    if (firstOctet >= 224 && firstOctet <= 239) {
      return 'D (Multicast)';
    }

    if (firstOctet >= 240 && firstOctet <= 255) {
      return 'E';
    }

    return 'Unknown';
  };

  // ==========================================
  // IP Type
  // ==========================================
  const getIpType = (ipInt) => {
    const first = (ipInt >>> 24) & 255;
    const second = (ipInt >>> 16) & 255;

    // Private
    if (first === 10) {
      return 'Private';
    }

    if (
      first === 172 &&
      second >= 16 &&
      second <= 31
    ) {
      return 'Private';
    }

    if (first === 192 && second === 168) {
      return 'Private';
    }

    // Loopback
    if (first === 127) {
      return 'Loopback';
    }

    // Link Local
    if (first === 169 && second === 254) {
      return 'Link-Local';
    }

    // Multicast
    if (first >= 224 && first <= 239) {
      return 'Multicast';
    }

    // Reserved
    if (first >= 240) {
      return 'Reserved';
    }

    return 'Public';
  };

  // ==========================================
  // Generate All /CIDR Networks
  // ==========================================
  const generateSubnetList = (
    ipInt,
    cidrNum,
    currentNetwork
  ) => {
    const subnetList = [];

    /*
      For example:

      43.224.108.175/22

      Parent /16:
      43.224.0.0 - 43.224.255.255

      /22 block size:
      4

      Result:
      43.224.0.0
      43.224.4.0
      43.224.8.0
      ...
      43.224.252.0

      Total = 64 networks
    */

    const firstOctet =
      (ipInt >>> 24) & 255;

    const secondOctet =
      (ipInt >>> 16) & 255;

    const blockSize =
      Math.pow(2, 32 - cidrNum);

    const parentStart =
      firstOctet * Math.pow(256, 3) +
      secondOctet * Math.pow(256, 2);

    const parentEnd =
      parentStart + Math.pow(256, 2) - 1;

    let current = parentStart;

    while (current <= parentEnd) {
      const network =
        Math.floor(current / blockSize) *
        blockSize;

      const broadcast =
        network + blockSize - 1;

      if (
        network >= parentStart &&
        network <= parentEnd &&
        !subnetList.some(
          (item) => item.networkInt === network
        )
      ) {
        let firstHost;
        let lastHost;

        if (cidrNum === 32) {
          firstHost = network;
          lastHost = network;
        } else if (cidrNum === 31) {
          firstHost = network;
          lastHost = broadcast;
        } else {
          firstHost = network + 1;
          lastHost = broadcast - 1;
        }

        subnetList.push({
          networkInt: network,
          network: intToIp(network),
          firstHost: intToIp(firstHost),
          lastHost: intToIp(lastHost),
          broadcast: intToIp(broadcast),
          isCurrent:
            network === currentNetwork,
        });
      }

      current = broadcast + 1;

      // Safety
      if (subnetList.length > 10000) {
        break;
      }
    }

    return subnetList;
  };

  // ==========================================
  // Calculate
  // ==========================================
  const handleCalculateSubnet = (e) => {
    e.preventDefault();

    setError('');
    setCalcResult(null);

    try {
      const cidrNum = Number(cidr);

      if (
        !Number.isInteger(cidrNum) ||
        cidrNum < 0 ||
        cidrNum > 32
      ) {
        throw new Error(
          'CIDR must be between /0 and /32'
        );
      }

      const ipInt = ipToInt(ip);

      // Subnet Mask
      const maskInt =
        cidrNum === 0
          ? 0
          : (0xffffffff << (32 - cidrNum)) >>> 0;

      // Wildcard Mask
      const wildcardInt =
        (~maskInt) >>> 0;

      // Network
      const networkInt =
        (ipInt & maskInt) >>> 0;

      // Broadcast
      const broadcastInt =
        (networkInt | wildcardInt) >>> 0;

      // Total Addresses
      const totalHosts =
        Math.pow(2, 32 - cidrNum);

      // Usable Hosts
      let usableHosts;

      if (cidrNum === 32) {
        usableHosts = 1;
      } else if (cidrNum === 31) {
        usableHosts = 2;
      } else {
        usableHosts = totalHosts - 2;
      }

      // First / Last Host
      let firstHost;
      let lastHost;

      if (cidrNum === 32) {
        firstHost = intToIp(networkInt);
        lastHost = intToIp(networkInt);
      } else if (cidrNum === 31) {
        firstHost = intToIp(networkInt);
        lastHost = intToIp(broadcastInt);
      } else {
        firstHost = intToIp(networkInt + 1);
        lastHost = intToIp(broadcastInt - 1);
      }

      // ======================================
      // IP Information
      // ======================================

      const firstOctet =
        (ipInt >>> 24) & 255;

      const ipType = getIpType(ipInt);

      const ipClass =
        getIpClass(firstOctet);

      // ======================================
      // Integer / Hex
      // ======================================

      const integerId = ipInt;

      const hexId =
        `0x${ipInt
          .toString(16)
          .padStart(8, '0')}`;

      // ======================================
      // Reverse DNS
      // ======================================

      const inAddrArpa =
        `${ip.trim()
          .split('.')
          .reverse()
          .join('.')}.in-addr.arpa`;

      // ======================================
      // IPv4 Mapped IPv6
      // ======================================

      const hexFull =
        ipInt
          .toString(16)
          .padStart(8, '0');

      const ipv4MappedAddress =
        `::ffff:${hexFull.slice(
          0,
          4
        )}:${hexFull.slice(4)}`;

      // ======================================
      // 6to4
      // ======================================

      const sixToFour =
        `2002:${hexFull.slice(
          0,
          4
        )}:${hexFull.slice(4)}::/48`;

      // ======================================
      // All Networks
      // ======================================

      const subnetList =
        generateSubnetList(
          ipInt,
          cidrNum,
          networkInt
        );

      // ======================================
      // Final Result
      // ======================================

      setCalcResult({
        ip: ip.trim(),

        networkAddress:
          intToIp(networkInt),

        usableRange:
          `${firstHost} - ${lastHost}`,

        broadcastAddress:
          intToIp(broadcastInt),

        totalHosts:
          totalHosts.toLocaleString(),

        usableHosts:
          usableHosts.toLocaleString(),

        subnetMask:
          intToIp(maskInt),

        wildcardMask:
          intToIp(wildcardInt),

        binaryMask:
          intToBinary(maskInt),

        binaryId:
          intToBinary(ipInt)
            .replace(/\./g, ''),

        ipClass,

        cidrPrefix:
          `/${cidrNum}`,

        ipType,

        shortNotation:
          `${ip.trim()} /${cidrNum}`,

        integerId,

        hexId,

        inAddrArpa,

        ipv4MappedAddress,

        sixToFour,

        subnetList,
      });

    } catch (err) {
      setError(err.message);
    }
  };

  // ==========================================
  // JSX
  // ==========================================

  return (
    <section className="tools-section">

      <div className="tools-container">

        {/* Header */}
        <div className="tools-header">

          <span className="tools-label">
            UTILITIES
          </span>

          <h2 className="tools-title">
            IPv4 Subnet Calculator
          </h2>

          <p className="tools-subtitle">
            Calculate complete IPv4 network,
            subnet, host range, binary and
            addressing information.
          </p>

        </div>


        {/* Calculator Box */}
        <div className="utility-box">

          {/* Form */}
          <form
            onSubmit={handleCalculateSubnet}
            className="subnet-form"
          >

            {/* IP */}
            <div className="input-group">

              <label>
                IP Address:
              </label>

              <input
                type="text"
                value={ip}
                onChange={(e) =>
                  setIp(e.target.value)
                }
                placeholder="43.224.108.175"
                autoComplete="off"
                spellCheck="false"
                required
              />

            </div>


            {/* CIDR */}
            <div className="input-group">

              <label>
                Subnet Mask / CIDR:
              </label>

              <select
                value={cidr}
                onChange={(e) =>
                  setCidr(e.target.value)
                }
              >

                {Array.from(
                  { length: 33 },
                  (_, i) => (
                    <option
                      key={i}
                      value={i}
                    >
                      /{i}
                    </option>
                  )
                )}

              </select>

            </div>


            {/* Button */}
            <button
              type="submit"
              className="calc-btn"
            >
              Calculate Subnet
            </button>

          </form>


          {/* Error */}
          {error && (
            <div className="subnet-error">
              ❌ {error}
            </div>
          )}


          {/* Results */}
          {calcResult && (
            <>

              {/* Main Result */}
              <div className="subnet-details-grid">

                <div className="result-row">
                  <span>
                    IP Address:
                  </span>

                  <strong>
                    {calcResult.ip}
                  </strong>
                </div>


                <div className="result-row">
                  <span>
                    Network Address:
                  </span>

                  <strong>
                    {calcResult.networkAddress}
                  </strong>
                </div>


                <div className="result-row">
                  <span>
                    Usable Host IP Range:
                  </span>

                  <strong>
                    {calcResult.usableRange}
                  </strong>
                </div>


                <div className="result-row">
                  <span>
                    Broadcast Address:
                  </span>

                  <strong>
                    {calcResult.broadcastAddress}
                  </strong>
                </div>


                <div className="result-row">
                  <span>
                    Total Number of Hosts:
                  </span>

                  <strong>
                    {calcResult.totalHosts}
                  </strong>
                </div>


                <div className="result-row">
                  <span>
                    Number of Usable Hosts:
                  </span>

                  <strong>
                    {calcResult.usableHosts}
                  </strong>
                </div>


                <div className="result-row">
                  <span>
                    Subnet Mask:
                  </span>

                  <strong>
                    {calcResult.subnetMask}
                  </strong>
                </div>


                <div className="result-row">
                  <span>
                    Wildcard Mask:
                  </span>

                  <strong>
                    {calcResult.wildcardMask}
                  </strong>
                </div>


                <div className="result-row">
                  <span>
                    Binary Subnet Mask:
                  </span>

                  <code>
                    {calcResult.binaryMask}
                  </code>
                </div>


                <div className="result-row">
                  <span>
                    IP Class:
                  </span>

                  <strong>
                    {calcResult.ipClass}
                  </strong>
                </div>


                <div className="result-row">
                  <span>
                    CIDR Notation:
                  </span>

                  <strong>
                    {calcResult.cidrPrefix}
                  </strong>
                </div>


                <div className="result-row">
                  <span>
                    IP Type:
                  </span>

                  <strong>
                    {calcResult.ipType}
                  </strong>
                </div>


                <div className="result-row">
                  <span>
                    Short:
                  </span>

                  <strong>
                    {calcResult.shortNotation}
                  </strong>
                </div>


                <div className="result-row">
                  <span>
                    Binary ID:
                  </span>

                  <code>
                    {calcResult.binaryId}
                  </code>
                </div>


                <div className="result-row">
                  <span>
                    Integer ID:
                  </span>

                  <strong>
                    {calcResult.integerId}
                  </strong>
                </div>


                <div className="result-row">
                  <span>
                    Hex ID:
                  </span>

                  <strong>
                    {calcResult.hexId}
                  </strong>
                </div>


                <div className="result-row">
                  <span>
                    in-addr.arpa:
                  </span>

                  <strong>
                    {calcResult.inAddrArpa}
                  </strong>
                </div>


                <div className="result-row">
                  <span>
                    IPv4 Mapped Address:
                  </span>

                  <strong>
                    {calcResult.ipv4MappedAddress}
                  </strong>
                </div>


                <div className="result-row">
                  <span>
                    6to4 Prefix:
                  </span>

                  <strong>
                    {calcResult.sixToFour}
                  </strong>
                </div>

              </div>


              {/* All Networks */}
              <div className="all-networks">

                <div className="all-networks-header">

                  <h3>
                    All Possible /{cidr} Networks
                  </h3>

                  <span>
                    {calcResult.subnetList.length}
                    {' '}
                    Networks
                  </span>

                </div>


                <div className="network-table-wrapper">

                  <table className="network-table">

                    <thead>

                      <tr>

                        <th>
                          Network Address
                        </th>

                        <th>
                          Usable Host Range
                        </th>

                        <th>
                          Broadcast Address
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      {calcResult.subnetList.map(
                        (network, index) => (

                          <tr
                            key={index}
                            className={
                              network.isCurrent
                                ? 'current-network'
                                : ''
                            }
                          >

                            <td>

                              {network.network}

                              {network.isCurrent && (
                                <span className="current-badge">
                                  CURRENT
                                </span>
                              )}

                            </td>


                            <td>
                              {network.firstHost}
                              {' - '}
                              {network.lastHost}
                            </td>


                            <td>
                              {network.broadcast}
                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>

              </div>

            </>

          )}

        </div>

      </div>

    </section>
  );
};

export default SubnetCalculator;