
import React, { useState } from "react";
import "./CactiInstallation.css";

const steps = [
  {
    number: "01",
    title: "Check Server Environment",
    description:
      "প্রথমে Ubuntu, PHP এবং MariaDB version check করুন।",
    commands: [
      "cat /etc/os-release",
      "php -v",
      "mariadb --version",
    ],
  },
  {
    number: "02",
    title: "Update Ubuntu Server",
    description: "Ubuntu package list update এবং upgrade করুন।",
    commands: [
      "sudo apt update",
      "sudo apt upgrade -y",
      "sudo apt install -y wget curl unzip git vim nano software-properties-common ca-certificates apt-transport-https",
      "sudo reboot",
    ],
  },
  {
    number: "03",
    title: "Install Apache Web Server",
    description: "Cacti web interface চালানোর জন্য Apache install করুন।",
    commands: [
      "sudo apt install -y apache2",
      "sudo systemctl enable --now apache2",
      "sudo systemctl status apache2",
    ],
  },
  {
    number: "04",
    title: "Install MariaDB",
    description: "Cacti-এর database হিসেবে MariaDB ব্যবহার করা হবে।",
    commands: [
      "sudo apt install -y mariadb-server mariadb-client",
      "sudo systemctl enable --now mariadb",
      "sudo mariadb-secure-installation",
    ],
  },
  {
    number: "05",
    title: "Create Cacti Database",
    description:
      "Cacti-এর জন্য database, user এবং required privileges তৈরি করুন।",
    commands: [
      "sudo mariadb",
      "CREATE DATABASE `cacti-db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;",
      "CREATE USER 'cacti'@'localhost' IDENTIFIED BY 'CactiDB@2026';",
      "GRANT ALL PRIVILEGES ON `cacti-db`.* TO 'cacti'@'localhost';",
      "GRANT SELECT ON mysql.time_zone_name TO 'cacti'@'localhost';",
      "FLUSH PRIVILEGES;",
      "EXIT;",
    ],
  },
  {
    number: "06",
    title: "Install PHP",
    description: "Cacti 1.2.x চালানোর জন্য required PHP extensions install করুন।",
    commands: [
      "sudo apt install -y php php-cli php-common php-mysql php-gd php-curl php-xml php-mbstring php-zip php-bcmath php-gmp php-ldap php-snmp php-intl",
      "sudo apt install -y libapache2-mod-php",
      "sudo systemctl restart apache2",
      "php -v",
    ],
  },
  {
    number: "07",
    title: "Install RRDtool",
    description: "Cacti graph এবং performance data store করার জন্য RRDtool প্রয়োজন।",
    commands: [
      "sudo apt install -y rrdtool",
      "rrdtool --version",
    ],
  },
  {
    number: "08",
    title: "Install SNMP",
    description: "Network devices monitor করার জন্য SNMP এবং SNMP daemon install করুন।",
    commands: [
      "sudo apt install -y snmp snmpd",
      "sudo systemctl enable --now snmpd",
      "sudo systemctl status snmpd",
    ],
  },
  {
    number: "09",
    title: "Download Cacti",
    description: "Official Cacti GitHub repository থেকে 1.2.x stable branch clone করুন।",
    commands: [
      "cd /var/www/html",
      "sudo git clone -b 1.2.x https://github.com/Cacti/cacti.git cacti",
      "cd /var/www/html/cacti",
      "cat include/cacti_version",
    ],
  },
  {
    number: "10",
    title: "Install Composer Dependencies",
    description: "Cacti-এর required PHP dependencies Composer দিয়ে install করুন।",
    commands: [
      "sudo apt install -y composer git",
      "cd /var/www/html/cacti",
      "composer install --no-dev",
    ],
  },
  {
    number: "11",
    title: "Import Cacti Database Schema",
    description: "Cacti-এর official SQL schema database-এ import করুন।",
    commands: [
      "sudo mariadb -u root cacti-db < /var/www/html/cacti/cacti.sql",
      "sudo mariadb -e \"SELECT COUNT(*) AS total_tables FROM information_schema.tables WHERE table_schema='cacti-db';\"",
    ],
  },
  {
    number: "12",
    title: "Configure MariaDB Timezone",
    description: "Cacti-এর timezone support enable করুন।",
    commands: [
      "sudo mariadb-tzinfo-to-sql /usr/share/zoneinfo | sudo mariadb mysql",
      "sudo mariadb -e \"GRANT SELECT ON mysql.time_zone_name TO 'cacti'@'localhost'; FLUSH PRIVILEGES;\"",
      "sudo mariadb -u cacti -p -e \"SELECT COUNT(*) AS timezone_count FROM mysql.time_zone_name;\"",
    ],
  },
  {
    number: "13",
    title: "Configure Cacti Database",
    description: "Cacti configuration file তৈরি করে database credentials সেট করুন।",
    commands: [
      "cd /var/www/html/cacti/include",
      "sudo cp -f config.php.dist config.php",
      "sudo nano /var/www/html/cacti/include/config.php",
    ],
    config: `$database_type     = 'mysql';
$database_default  = 'cacti-db';
$database_hostname = 'localhost';
$database_username = 'cacti';
$database_password = 'CactiDB@2026';
$database_port     = '3306';
$database_retries  = 5;
$database_ssl      = false;
$database_ssl_key  = '';`,
  },
  {
    number: "14",
    title: "Configure Apache",
    description: "Cacti-কে /cacti URL-এর মাধ্যমে access করার জন্য Apache Alias configure করুন।",
    commands: [
      "sudo nano /etc/apache2/conf-available/cacti.conf",
    ],
    config: `Alias /cacti /var/www/html/cacti

<Directory /var/www/html/cacti>
    Options FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>

DirectoryIndex index.php`,
  },
  {
    number: "15",
    title: "Enable Apache Configuration",
    description: "Apache configuration এবং rewrite module enable করুন।",
    commands: [
      "sudo a2enconf cacti",
      "sudo a2enmod rewrite",
      "sudo apache2ctl configtest",
      "sudo systemctl reload apache2",
    ],
  },
  {
    number: "16",
    title: "Configure SNMP",
    description: "Local SNMP monitoring-এর জন্য snmpd configuration করুন।",
    commands: [
      "sudo cp /etc/snmp/snmpd.conf /etc/snmp/snmpd.conf.backup",
      "sudo nano /etc/snmp/snmpd.conf",
    ],
    config: `agentAddress udp:161

rocommunity public 127.0.0.1

sysLocation "Ubuntu Cacti Server"
sysContact "admin"`,
  },
  {
    number: "17",
    title: "Restart SNMP Service",
    description: "SNMP service restart এবং enable করুন।",
    commands: [
      "sudo systemctl enable snmpd",
      "sudo systemctl restart snmpd",
      "sudo systemctl status snmpd --no-pager",
    ],
  },
  {
    number: "18",
    title: "Test SNMP",
    description: "Local SNMP response ঠিকমতো আসছে কিনা check করুন।",
    commands: [
      "snmpwalk -v2c -c public 127.0.0.1 1.3.6.1.2.1.1",
    ],
  },
  {
    number: "19",
    title: "Configure Cacti Cron",
    description: "প্রতি 5 মিনিটে Cacti poller run করার জন্য cron configure করুন।",
    commands: [
      "sudo nano /etc/cron.d/cacti",
    ],
    config: `*/5 * * * * www-data php /var/www/html/cacti/poller.php >/dev/null 2>&1`,
  },
  {
    number: "20",
    title: "Set Permissions",
    description: "Cacti runtime directory-গুলোর proper permission সেট করুন।",
    commands: [
      "sudo mkdir -p /var/www/html/cacti/rra",
      "sudo mkdir -p /var/www/html/cacti/log",
      "sudo chown -R www-data:www-data /var/www/html/cacti",
      "sudo chmod -R 775 /var/www/html/cacti/rra",
      "sudo chmod -R 775 /var/www/html/cacti/log",
    ],
  },
  {
    number: "21",
    title: "Restart Services",
    description: "সব প্রয়োজনীয় service restart করুন।",
    commands: [
      "sudo systemctl restart apache2",
      "sudo systemctl restart mariadb",
      "sudo systemctl restart snmpd",
      "sudo systemctl restart cron",
    ],
  },
  {
    number: "22",
    title: "Open Cacti Web Installer",
    description:
      "Browser থেকে Cacti installation wizard open করুন।",
    commands: [],
    url: "http://SERVER-IP/cacti",
  },
  {
    number: "23",
    title: "Cacti Database Information",
    description: "Web installer-এ নিচের database information ব্যবহার করুন।",
    commands: [],
    config: `Database Type     : MySQL
Database Hostname : localhost
Database Port     : 3306
Database Name     : cacti-db
Database Username : cacti
Database Password : CactiDB@2026`,
  },
  {
    number: "24",
    title: "Final Verification",
    description: "Installation-এর গুরুত্বপূর্ণ অংশগুলো verify করুন।",
    commands: [
      "cat /var/www/html/cacti/include/cacti_version",
      "sudo mariadb -e \"SELECT COUNT(*) AS total_tables FROM information_schema.tables WHERE table_schema='cacti-db';\"",
      "sudo apache2ctl configtest",
      "sudo systemctl is-active apache2",
      "sudo systemctl is-active mariadb",
      "sudo systemctl is-active snmpd",
      "sudo systemctl is-active cron",
    ],
  },
];

function CactiInstallation() {
  const [copied, setCopied] = useState("");

  const copyCode = async (code, id) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(id);

      setTimeout(() => {
        setCopied("");
      }, 1800);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div className="cacti-page">
      {/* Hero */}
      <section className="cacti-hero">
        <div className="cacti-container">
          <div className="cacti-badge">NETWORK MONITORING</div>

          <h1>Cacti Installation Guide</h1>

          <p>
            Complete A-Z guide for installing Cacti 1.2.x on Ubuntu Server
            with Apache, MariaDB, PHP, RRDtool and SNMP.
          </p>

          <div className="cacti-info-grid">
            <div className="info-card">
              <span>OS</span>
              <strong>Ubuntu 26.04 LTS</strong>
            </div>

            <div className="info-card">
              <span>PHP</span>
              <strong>PHP 8.5</strong>
            </div>

            <div className="info-card">
              <span>Database</span>
              <strong>MariaDB 11.8</strong>
            </div>

            <div className="info-card">
              <span>URL</span>
              <strong>/cacti</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="credentials-section">
        <div className="cacti-container">
          <div className="section-title">
            <span>01</span>
            <h2>Installation Information</h2>
          </div>

          <div className="credential-grid">
            <div>
              <label>Cacti Directory</label>
              <code>/var/www/html/cacti</code>
            </div>

            <div>
              <label>Database Name</label>
              <code>cacti-db</code>
            </div>

            <div>
              <label>Database User</label>
              <code>cacti</code>
            </div>

            <div>
              <label>Database Password</label>
              <code>CactiDB@2026</code>
            </div>

            <div>
              <label>Web URL</label>
              <code>http://SERVER-IP/cacti</code>
            </div>

            <div>
              <label>SNMP Community</label>
              <code>public</code>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <main className="steps-section">
        <div className="cacti-container">
          <div className="section-heading">
            <span>02</span>
            <h2>Installation Steps</h2>
            <p>
              Follow the steps sequentially. প্রতিটি command terminal-এ
              copy-paste করে execute করতে পারবেন।
            </p>
          </div>

          <div className="steps-list">
            {steps.map((step) => {
              const commandText = step.commands.join("\n");

              return (
                <article className="step-card" key={step.number}>
                  <div className="step-number">{step.number}</div>

                  <div className="step-content">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>

                    {step.commands.length > 0 && (
                      <div className="code-wrapper">
                        <div className="code-header">
                          <span>
                            <i></i>
                            Terminal
                          </span>

                          <button
                            onClick={() =>
                              copyCode(commandText, step.number)
                            }
                          >
                            {copied === step.number
                              ? "✓ Copied"
                              : "Copy"}
                          </button>
                        </div>

                        <pre>
                          <code>{commandText}</code>
                        </pre>
                      </div>
                    )}

                    {step.config && (
                      <div className="code-wrapper config-block">
                        <div className="code-header">
                          <span>Configuration</span>

                          <button
                            onClick={() =>
                              copyCode(
                                step.config,
                                `${step.number}-config`
                              )
                            }
                          >
                            {copied === `${step.number}-config`
                              ? "✓ Copied"
                              : "Copy"}
                          </button>
                        </div>

                        <pre>
                          <code>{step.config}</code>
                        </pre>
                      </div>
                    )}

                    {step.url && (
                      <div className="url-box">
                        <span>🌐 Cacti URL</span>
                        <code>{step.url}</code>

                        <button
                          onClick={() =>
                            copyCode(step.url, `${step.number}-url`)
                          }
                        >
                          {copied === `${step.number}-url`
                            ? "✓ Copied"
                            : "Copy URL"}
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </main>

      {/* Success */}
      <section className="success-section">
        <div className="cacti-container">
          <div className="success-box">
            <div className="success-icon">✓</div>

            <div>
              <h2>Cacti Installation Complete</h2>
              <p>
                সব configuration সফল হলে browser থেকে
                <strong> http://SERVER-IP/cacti </strong>
                open করে Cacti web installer complete করুন।
              </p>
              <p>
               Official Documentation: 
                <strong>https://docs.cacti.net/ </strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CactiInstallation;

