import React from "react";
import { Routes } from "react-router-dom";

import PrivateRoutes from "./Private/PrivateRoutes";
import PublicRoutes from "./Public/PublicRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      {PublicRoutes()}
      {PrivateRoutes()}
    </Routes>
  );
};

export default AppRoutes;
