import React from "react";
import "./SNMPServer.css";

const SNMPServer = () => {
  return (
    <div className="snmp-page">

      {/* Hero Section */}
      <section className="snmp-hero">
        <div className="snmp-container">
          <span className="snmp-badge">NETWORK MONITORING</span>

          <h1>Ubuntu SNMP Server</h1>

          <p>
            Complete step-by-step documentation for configuring
            SNMP Server on Ubuntu Linux with dual network interfaces.
          </p>

          <div className="snmp-info-grid">
            <div>
              <span>OS</span>
              <strong>Ubuntu Linux</strong>
            </div>

            <div>
              <span>SNMP</span>
              <strong>Version 2c</strong>
            </div>

            <div>
              <span>Port</span>
              <strong>UDP 161</strong>
            </div>

            <div>
              <span>Monitoring</span>
              <strong>Cacti / The Dude</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="snmp-container">

        {/* Environment */}
        <section className="snmp-section">
          <h2>Environment Configuration</h2>

          <div className="snmp-table-wrapper">
            <table className="snmp-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Configuration</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Operating System</td>
                  <td>Ubuntu Linux</td>
                </tr>

                <tr>
                  <td>Interface 1</td>
                  <td>ens37</td>
                </tr>

                <tr>
                  <td>LAN IP</td>
                  <td>10.160.23.82/24</td>
                </tr>

                <tr>
                  <td>Interface 2</td>
                  <td>ens38</td>
                </tr>

                <tr>
                  <td>Public IP</td>
                  <td>27.54.148.82/30</td>
                </tr>

                <tr>
                  <td>SNMP Version</td>
                  <td>SNMP v2c</td>
                </tr>

                <tr>
                  <td>Community</td>
                  <td>tamim.secret</td>
                </tr>

                <tr>
                  <td>SNMP Port</td>
                  <td>UDP 161</td>
                </tr>

                <tr>
                  <td>Monitoring</td>
                  <td>Cacti / The Dude</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Step 1 */}
        <section className="snmp-section">
          <div className="step-number">01</div>

          <h2>Network Interface Configuration</h2>

          <p>
            প্রথমে Ubuntu Server-এর দুটি network interface static IP দিয়ে
            configure করতে হবে।
          </p>

          <h3>Check Network Interfaces</h3>

          <CodeBlock>
            ip -br addr
          </CodeBlock>

          <p>Expected output:</p>

          <CodeBlock>
{`ens37    UP    10.160.23.82/24
ens38    UP    27.54.148.82/30`}
          </CodeBlock>

          <h3>Open Netplan Configuration</h3>

          <CodeBlock>
            sudo nano /etc/netplan/01-netcfg.yaml
          </CodeBlock>

          <h3>Netplan Configuration</h3>

          <CodeBlock>
{`network:
  version: 2
  renderer: networkd

  ethernets:
    ens37:
      dhcp4: no
      addresses:
        - 10.160.23.82/24

    ens38:
      dhcp4: no
      addresses:
        - 27.54.148.82/30`}
          </CodeBlock>

          <h3>Apply Configuration</h3>

          <CodeBlock>
{`sudo chmod 600 /etc/netplan/*.yaml
sudo netplan generate
sudo netplan apply`}
          </CodeBlock>

          <div className="snmp-warning">
            <strong>⚠️ SSH Warning:</strong>
            <p>
              SSH দিয়ে remote server configure করলে আগে
              <code>sudo netplan try</code> ব্যবহার করুন।
              ভুল network configuration করলে SSH connection বিচ্ছিন্ন হতে পারে।
            </p>
          </div>
        </section>

        {/* Step 2 */}
        <section className="snmp-section">
          <div className="step-number">02</div>

          <h2>Install SNMP Server</h2>

          <p>
            Ubuntu Server-এ SNMP daemon এবং SNMP tools install করুন।
          </p>

          <CodeBlock>
{`sudo apt update
sudo apt install snmpd snmp -y`}
          </CodeBlock>

          <h3>Check Installation</h3>

          <CodeBlock>
            snmpd -v
          </CodeBlock>
        </section>

        {/* Step 3 */}
        <section className="snmp-section">
          <div className="step-number">03</div>

          <h2>Backup SNMP Configuration</h2>

          <p>
            Configuration পরিবর্তন করার আগে backup রাখা ভালো।
          </p>

          <CodeBlock>
            sudo cp /etc/snmp/snmpd.conf /etc/snmp/snmpd.conf.backup
          </CodeBlock>

          <h3>Open Configuration File</h3>

          <CodeBlock>
            sudo nano /etc/snmp/snmpd.conf
          </CodeBlock>
        </section>

        {/* Step 4 */}
        <section className="snmp-section">
          <div className="step-number">04</div>

          <h2>Configure SNMP</h2>

          <p>
            Basic SNMP v2c configuration:
          </p>

          <CodeBlock>
{`agentAddress udp:161,udp6:[::]:161

rocommunity tamim.secret default`}
          </CodeBlock>

          <div className="snmp-security">
            <h3>🔐 Recommended Production Configuration</h3>

            <p>
              Public interface থাকলে সব source IP allow না করে
              trusted network allow করা বেশি নিরাপদ।
            </p>

            <CodeBlock>
{`agentAddress udp:161,udp6:[::]:161

rocommunity tamim.secret 127.0.0.1
rocommunity tamim.secret 10.160.23.0 255.255.255.0
rocommunity tamim.secret 27.54.148.80 255.255.255.252`}
            </CodeBlock>
          </div>
        </section>

        {/* Step 5 */}
        <section className="snmp-section">
          <div className="step-number">05</div>

          <h2>Restart SNMP Service</h2>

          <CodeBlock>
{`sudo systemctl restart snmpd
sudo systemctl enable snmpd`}
          </CodeBlock>

          <h3>Check Service Status</h3>

          <CodeBlock>
            sudo systemctl status snmpd
          </CodeBlock>

          <div className="snmp-success">
            <strong>Expected:</strong>
            <p>Active: active (running)</p>
          </div>
        </section>

        {/* Step 6 */}
        <section className="snmp-section">
          <div className="step-number">06</div>

          <h2>Check SNMP Port</h2>

          <p>
            SNMP UDP port 161-এ listen করছে কিনা check করুন।
          </p>

          <CodeBlock>
            sudo ss -lunp | grep 161
          </CodeBlock>

          <p>Expected output:</p>

          <CodeBlock>
{`udp   UNCONN   0   0   0.0.0.0:161
udp6  UNCONN   0   0   [::]:161`}
          </CodeBlock>
        </section>

        {/* Step 7 */}
        <section className="snmp-section">
          <div className="step-number">07</div>

          <h2>SNMP Verification</h2>

          <h3>Localhost Test</h3>

          <CodeBlock>
            snmpwalk -v 2c -c tamim.secret 127.0.0.1
          </CodeBlock>

          <h3>LAN IP Test</h3>

          <CodeBlock>
            snmpwalk -v 2c -c tamim.secret 10.160.23.82
          </CodeBlock>

          <h3>Public IP Test</h3>

          <CodeBlock>
            snmpwalk -v 2c -c tamim.secret 27.54.148.82
          </CodeBlock>

          <div className="snmp-success">
            <strong>✓ Successful Response</strong>

            <p>
              অনেকগুলো OID এবং system information দেখা গেলে
              SNMP successfully কাজ করছে।
            </p>
          </div>
        </section>

        {/* Step 8 */}
        <section className="snmp-section">
          <div className="step-number">08</div>

          <h2>Firewall Check</h2>

          <CodeBlock>
            sudo ufw status
          </CodeBlock>

          <p>
            যদি নিচের output আসে:
          </p>

          <CodeBlock>
            Status: inactive
          </CodeBlock>

          <p>
            তাহলে UFW বর্তমানে traffic block করছে না।
          </p>

          <p>
            Firewall active থাকলে SNMP UDP 161 allow করতে হবে।
          </p>

          <CodeBlock>
            sudo ufw allow 161/udp
          </CodeBlock>
        </section>

        {/* Step 9 */}
        <section className="snmp-section">
          <div className="step-number">09</div>

          <h2>Troubleshooting SNMP Timeout</h2>

          <p>
            যদি নিচের error আসে:
          </p>

          <CodeBlock>
            Timeout: No Response
          </CodeBlock>

          <p>প্রথমে service check করুন:</p>

          <CodeBlock>
            sudo systemctl status snmpd
          </CodeBlock>

          <p>তারপর port check করুন:</p>

          <CodeBlock>
            sudo ss -lunp | grep 161
          </CodeBlock>

          <p>Firewall check:</p>

          <CodeBlock>
            sudo ufw status
          </CodeBlock>

          <h3>Packet Capture</h3>

          <CodeBlock>
            sudo tcpdump -ni any udp port 161
          </CodeBlock>

          <p>
            অন্য terminal থেকে SNMP request পাঠিয়ে দেখুন packet
            server-এ আসছে কিনা।
          </p>

          <CodeBlock>
            snmpwalk -v 2c -c tamim.secret 10.160.23.82
          </CodeBlock>
        </section>

        {/* Cacti */}
        <section className="snmp-section">
          <div className="step-number">10</div>

          <h2>Cacti Configuration</h2>

          <p>
            Cacti একই Ubuntu server-এ থাকলে localhost ব্যবহার করা সবচেয়ে সহজ।
          </p>

          <div className="config-card">
            <div>
              <span>Host</span>
              <strong>127.0.0.1</strong>
            </div>

            <div>
              <span>SNMP Version</span>
              <strong>Version 2</strong>
            </div>

            <div>
              <span>Community</span>
              <strong>tamim.secret</strong>
            </div>

            <div>
              <span>Port</span>
              <strong>161</strong>
            </div>
          </div>
        </section>

        {/* The Dude */}
        <section className="snmp-section">
          <div className="step-number">11</div>

          <h2>The Dude Configuration</h2>

          <div className="config-card">
            <div>
              <span>Address</span>
              <strong>10.160.23.82</strong>
            </div>

            <div>
              <span>SNMP Version</span>
              <strong>v2c</strong>
            </div>

            <div>
              <span>Community</span>
              <strong>tamim.secret</strong>
            </div>

            <div>
              <span>Port</span>
              <strong>161</strong>
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section className="snmp-section">
          <h2>Network Architecture</h2>

          <div className="architecture">

            <div className="arch-server">
              <h3>Ubuntu SNMP Server</h3>
              <p>SNMP Agent</p>
              <strong>UDP / 161</strong>
            </div>

            <div className="arch-line">↓</div>

            <div className="arch-interfaces">

              <div>
                <h4>ens37</h4>
                <p>10.160.23.82/24</p>
                <span>LAN Network</span>
              </div>

              <div>
                <h4>ens38</h4>
                <p>27.54.148.82/30</p>
                <span>Public Network</span>
              </div>

            </div>

            <div className="arch-line">↓</div>

            <div className="monitoring-tools">
              <div>Cacti</div>
              <div>The Dude</div>
              <div>SNMP Manager</div>
            </div>

          </div>
        </section>

        {/* Final Checklist */}
        <section className="snmp-section">
          <h2>Final Verification Checklist</h2>

          <div className="checklist">

            <label>
              <input type="checkbox" />
              Network interfaces configured
            </label>

            <label>
              <input type="checkbox" />
              Netplan applied successfully
            </label>

            <label>
              <input type="checkbox" />
              SNMP package installed
            </label>

            <label>
              <input type="checkbox" />
              SNMP community configured
            </label>

            <label>
              <input type="checkbox" />
              snmpd service active
            </label>

            <label>
              <input type="checkbox" />
              UDP 161 listening
            </label>

            <label>
              <input type="checkbox" />
              Localhost SNMP test successful
            </label>

            <label>
              <input type="checkbox" />
              LAN SNMP test successful
            </label>

            <label>
              <input type="checkbox" />
              Public IP SNMP test successful
            </label>

            <label>
              <input type="checkbox" />
              Cacti/The Dude monitoring successful
            </label>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="snmp-footer">
        <p>
          Ubuntu SNMP Server Documentation
        </p>

        <span>
          SNMP v2c • UDP 161 • Cacti • The Dude
        </span>
      </footer>

    </div>
  );
};


/* Reusable Code Block */
const CodeBlock = ({ children }) => {
  return (
    <div className="code-wrapper">
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
};

export default SNMPServer;