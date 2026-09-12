import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../Auth/AuthContext";
import "./PremiumDashboard.css";

const tools = [
  {
    number: "01",
    title: "ISP intelligence",
    description: "Inspect your public network identity, provider, and location data.",
    path: "/premium/isp-information",
    action: "Open intelligence",
  },
  {
    number: "02",
    title: "Network workbench",
    description: "Keep subnet calculations and network utilities within reach.",
    path: "/premium/network-tools",
    action: "Enter workbench",
  },
  {
    number: "03",
    title: "Speed telemetry",
    description: "Run a clean connection check with ping, download, and upload data.",
    path: "/premium/speed-test",
    action: "Run speed test",
  },
  {
    number: "04",
    title: "BDIX route check",
    description: "Measure local route performance through the dedicated test panel.",
    path: "/premium/bdix-speed-test",
    action: "Check BDIX",
  },
];

const PremiumDashboard = () => {
  const { user } = useAuth();
  const displayName = user?.displayName || user?.email?.split("@")[0] || "Network operator";

  return (
    <main className="premium-dashboard">
      <div className="premium-dashboard__grid" aria-hidden="true" />
      <div className="premium-dashboard__container">
        <header className="premium-hero">
          <div>
            <p className="premium-kicker">Private network console / 2026</p>
            <h1>Make the network legible.</h1>
            <p className="premium-hero__copy">
              Welcome back, {displayName}. Your diagnostic workspace is ready for the next signal.
            </p>
          </div>
          <div className="premium-live-status">
            <span className="premium-live-status__dot" />
            <span>Console online</span>
          </div>
        </header>

        <section className="premium-overview" aria-label="Network overview">
          <div className="premium-overview__intro">
            <p className="premium-label">Workspace overview</p>
            <h2>A sharper view of your infrastructure.</h2>
            <p>
              Move from observation to action with tools built for everyday network decisions.
            </p>
          </div>
          <div className="premium-stat premium-stat--accent">
            <span>TOOLS READY</span>
            <strong>04</strong>
            <small>diagnostic surfaces</small>
          </div>
          <div className="premium-stat">
            <span>ACCESS LEVEL</span>
            <strong>PRO</strong>
            <small>authenticated session</small>
          </div>
          <div className="premium-stat">
            <span>SESSION</span>
            <strong>LIVE</strong>
            <small>protected workspace</small>
          </div>
        </section>

        <section className="premium-tools" aria-labelledby="premium-tools-title">
          <div className="premium-section-heading">
            <div>
              <p className="premium-label">Diagnostic suite</p>
              <h2 id="premium-tools-title">Choose your next instrument</h2>
            </div>
            <span className="premium-section-heading__line" />
          </div>

          <div className="premium-tools__list">
            {tools.map((tool) => (
              <Link className="premium-tool" key={tool.path} to={tool.path}>
                <span className="premium-tool__number">{tool.number}</span>
                <span className="premium-tool__content">
                  <span className="premium-tool__title">{tool.title}</span>
                  <span className="premium-tool__description">{tool.description}</span>
                </span>
                <span className="premium-tool__action">{tool.action} <span aria-hidden="true">-&gt;</span></span>
              </Link>
            ))}
          </div>
        </section>

        <footer className="premium-footer-note">
          <span className="premium-footer-note__mark">/</span>
          <span>Built for calm, precise network operations.</span>
          <Link to="/">Return to portfolio</Link>
        </footer>
      </div>
    </main>
  );
};

export default PremiumDashboard;
