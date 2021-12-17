import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Calendar from "./views/CalendarView";
import Dashboard from "./views/Dashboard";
import User from "./views/User";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Calendar />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mis-citas" element={<User />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
