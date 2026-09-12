import React from "react";
import { Route } from "react-router-dom";

import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";

const PublicRoutes = () => (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
  </>
);

export default PublicRoutes;
