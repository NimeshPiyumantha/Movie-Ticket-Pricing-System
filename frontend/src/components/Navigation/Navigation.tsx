import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Movies from "../../pages/Movies/Movies";
import Employee from "../../pages/Employee/Employee";
import { DASHBOARD, EMPLOYEE, MOVIES } from "../../util/routesUtil";

const Navigation = () => {
  return (
    <Routes>
      <Route path={DASHBOARD} element={<Home />} />
      <Route path={MOVIES} element={<Movies />} />
      <Route path={EMPLOYEE} element={<Employee />} />
    </Routes>
  );
};

export default Navigation;
