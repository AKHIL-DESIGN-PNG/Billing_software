import { useEffect, useState } from "react";
import api from "../services/api";

export default function Items() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    category: ""
  });

  const fetchItems = async () => {
    const res = await api.get("/items");
    setItems(res.data);
  };

  const addItem = async () => {
    if (!form.name || !form.price || !form.quantity) {
      alert("Fill all fields");
      return;
    }

    await api.post("/items", form);
    setForm({ name: "", price: "", quantity: "", category: "" });
    fetchItems();
  };


  useEffect(() => {
    fetchItems();
  }, []);

  // 🔍 SEARCH FILTER
  const filteredItems = items
    .filter(i =>
      i.name.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 10); // ✅ ONLY 10 ITEMS SHOWN

  return (    
    <div className="page-content">
  <div className="card add-item-card">
  <h2>📦 Add Item</h2>

  <div className="add-item-row">
    <input
      className="form-input"
      placeholder="Item Name"
      value={form.name}
      onChange={(e) => setForm({ ...form, name: e.target.value })}
    />

    <input
      className="form-input"
      type="number"
      placeholder="Price"
      value={form.price}
      onChange={(e) => setForm({ ...form, price: e.target.value })}
    />

    <input
      className="form-input"
      type="number"
      placeholder="Quantity"
      value={form.quantity}
      onChange={(e) => setForm({ ...form, quantity: e.target.value })}
    />

    <input
      className="form-input"
      placeholder="Category"
      value={form.category}
      onChange={(e) => setForm({ ...form, category: e.target.value })}
    />

    <button className="primary-btn add-btn" onClick={addItem}>
      ➕ Add
    </button>
  </div>
</div>


      <h2 style={{ marginTop: "30px" }}>📋 Items List</h2>

      {/* 🔍 SEARCH BAR */}
      <input
        placeholder="Search item..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", width: "250px" }}
      />

      {/* 📊 TABLE WITH SCROLL */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No items found
                </td>
              </tr>
            ) : (
              filteredItems.map((i) => (
                <tr key={i._id}>
                  <td>{i.name}</td>
                  <td>₹{i.price}</td>
                  <td>{i.quantity}</td>
                  <td>{i.category}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
