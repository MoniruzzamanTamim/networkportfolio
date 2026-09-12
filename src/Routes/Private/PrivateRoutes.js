import React from "react";
import { Route } from "react-router-dom";

import ProtectedRoute from "../../Auth/ProtectedRoute";
import PremiumDashboard from "../../Pages/Premium/PremiumDashboard";
import ISPInformationPage from "../../components/Services/NetworkTools/ISPINFORMATION/ISPINFORMATION";
import NetworkToolsPage from "../../components/Services/Services";
import SpeedTestPage from "../../components/Services/SpeedTest/SpeedTest";
import BDIXSpeedTestPage from "../../components/Services/SpeedTest/WithBackendServer";
import SNMPPage from "../../Premium-Component/SNMPServer/SNMPServer";
import CactiPage from "../../Premium-Component/CactiInstallation/CactiInstallation";

const ProtectedPage = ({ children }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

const PrivateRoutes = () => (
  <>
    <Route
      path="/premium"
      element={
        <ProtectedPage>
          <PremiumDashboard />
        </ProtectedPage>
      }
    />
    <Route
      path="/premium/isp-information"
      element={
        <ProtectedPage>
          <ISPInformationPage />
        </ProtectedPage>
      }
    />
    <Route
      path="/premium/network-tools"
      element={
        <ProtectedPage>
          <NetworkToolsPage />
        </ProtectedPage>
      }
    />
    <Route
      path="/premium/speed-test"
      element={
        <ProtectedPage>
          <SpeedTestPage />
        </ProtectedPage>
      }
    />
    <Route
      path="/premium/bdix-speed-test"
      element={
        <ProtectedPage>
          <BDIXSpeedTestPage />
        </ProtectedPage>
      }
    />
    <Route
      path="/premium/snmp"
      element={
        <ProtectedPage>
          <SNMPPage />
        </ProtectedPage>
      }
    />
    <Route
      path="/premium/cacti"
      element={
        <ProtectedPage>
          <CactiPage />
        </ProtectedPage>
      }
    />
  </>
);

export default PrivateRoutes;
