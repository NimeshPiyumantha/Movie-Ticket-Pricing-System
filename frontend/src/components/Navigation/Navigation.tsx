import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Movies from "../../pages/Movies/Movies";
import Employee from "../../pages/Employee/Employee";
import { DASHBOARD, EMPLOYEE, MOVIES, PREDICT_TICKET } from "../../util/routesUtil";
import PredictTicket from "../../pages/PredictTicket/PredictTicket";

const Navigation = () => {
  return (
    <Routes>
      <Route path={DASHBOARD} element={<Home />} />
      <Route path={MOVIES} element={<Movies />} />
      <Route path={EMPLOYEE} element={<Employee />} />
      <Route path={PREDICT_TICKET} element={<PredictTicket />} />
    </Routes>
  );
};

export default Navigation;
