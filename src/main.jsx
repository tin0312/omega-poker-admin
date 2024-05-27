import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Booking from "./pages/Booking";
import Employees from "./pages/Employees";
import { AuthProvider } from "./context/AuthProvider";
import SignInSide from "./Authentication/SignInSide";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<Dashboard />}>
              <Route index element={<Booking />} />
              <Route path="customers" element={<Customers />} />
              <Route path="employees" element={<Employees />} />
            </Route>
          </Route>
          <Route path="/sign-in" element={<SignInSide />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
  </>
);
