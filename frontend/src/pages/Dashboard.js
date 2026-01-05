import { useState, useEffect } from "react";
import Items from "./Items";
import Billing from "./Billing";
import TopBar from "../components/TopBar";
import api from "../services/api";

export default function Dashboard() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [lowStock, setLowStock] = useState([]);

  // Fetch low stock items
  useEffect(() => {
    if (activePage === "Dashboard") {
      fetchLowStock();
    }
  }, [activePage]);

  const fetchLowStock = async () => {
    try {
      const res = await api.get("/items");
      const low = res.data.filter(item => item.quantity <= 5);
      setLowStock(low);
    } catch (err) {
      console.error("Low stock fetch failed", err);
    }
  };

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>Billing App</h2>

        <ul>
          <li onClick={() => setActivePage("Dashboard")}>Dashboard</li>
          <li onClick={() => setActivePage("Items")}>Items</li>
          <li onClick={() => setActivePage("Billing")}>Billing</li>
        </ul>
      </aside>

      {/* MAIN AREA */}
      <div className="main-area">
        {/* TOP BAR */}
        <TopBar title={activePage} />

        {/* PAGE CONTENT */}
        <div className="page-content">
          
          {/* DASHBOARD HOME */}
          {activePage === "Dashboard" && (
            <>
              {/* INFO */}
              <div className="card">
                <h2>📊 Dashboard</h2>
                <p>Manage your shop billing here</p>
              </div>

              {/* QUICK ACTIONS */}
              <div className="card">
                <h2>⚡ Quick Actions</h2>

                <button
                  onClick={() => setActivePage("Billing")}
                  style={{ marginRight: "10px" }}
                >
                  🧾 Create New Bill
                </button>

                <button onClick={() => setActivePage("Items")}>
                  ➕ Add / Manage Items
                </button>
              </div>

              {/* STOCK ALERTS */}
              <div className="card">
                <h2>⚠️ Stock Alerts</h2>

                {lowStock.length === 0 ? (
                  <p>All items are sufficiently stocked ✅</p>
                ) : (
                  <ul>
                    {lowStock.map(item => (
                      <li key={item._id}>
                        {item.name} — Stock: {item.quantity}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}

          {/* ITEMS PAGE */}
          {activePage === "Items" && <Items />}

          {/* BILLING PAGE */}
          {activePage === "Billing" && <Billing />}
        </div>
      </div>
    </div>
  );
}
