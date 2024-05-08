import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Booking from "./pages/Booking";
import Employees from "./pages/Employees";
import "../public/css/index.css"


function App(){
  return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Dashboard />}>
                <Route index element={<Booking/>}/>
                <Route path="customers" element={<Customers/>}/>
                <Route path="employees" element={<Employees/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  
  )
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
