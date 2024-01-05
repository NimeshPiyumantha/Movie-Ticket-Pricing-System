import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Movies from "../../pages/Movies/Movies";
import Employee from "../../pages/Employee/Employee";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/employee" element={<Employee />} />
    </Routes>
  );
};

export default Navigation;
