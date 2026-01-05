import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Items from "./pages/Items";
import Billing from "./pages/Billing";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
}

export default function App() {
  const token = localStorage.getItem("token");
  

  return (
    <Router>
      <Routes>
        {/* PUBLIC */}
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route path="/register" element={<Register />} />
      
        {/* PRIVATE DASHBOARD LAYOUT */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<p>Manage your shop billing here</p>} />
          <Route path="items" element={<Items />} />
          <Route path="billing" element={<Billing />} />
    
        </Route>
      </Routes>
    </Router>
    
  );
}
