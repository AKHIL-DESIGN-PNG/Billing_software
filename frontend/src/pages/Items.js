import { useEffect, useState } from "react";
import api from "../services/api";

export default function Items() {
  const [items, setItems] = useState([]);
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

  return (
    <>
      <h2>Add Item</h2>

      <input
        placeholder="Item Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Price"
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <input
        placeholder="Quantity"
        type="number"
        value={form.quantity}
        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
      />

      <input
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      <button onClick={addItem}>Add Item</button>

      <h2>Items List</h2>

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
          {items.map((i) => (
            <tr key={i._id}>
              <td>{i.name}</td>
              <td>{i.price}</td>
              <td>{i.quantity}</td>
              <td>{i.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
