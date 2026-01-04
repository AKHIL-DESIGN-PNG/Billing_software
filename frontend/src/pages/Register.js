import api from "../services/api";
import { useState } from "react";


export default function Register() {
  const [form, setForm] = useState({});

  const submit = async () => {
    if (
      !form.ownerName ||
      !form.shopName ||
      !form.phone ||
      !form.email ||
      !form.password
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await api.post("/auth/register", form);
      alert("Registration successful");
      window.location.href = "/";
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-card">
      <h2>Owner Registration</h2>
      <input placeholder="Owner Name" onChange={e => setForm({ ...form, ownerName: e.target.value })} />
      <input placeholder="Shop Name" onChange={e => setForm({ ...form, shopName: e.target.value })} />
      <input placeholder="Phone" onChange={e => setForm({ ...form, phone: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={submit}>Register</button>
      <p onClick={() => window.location.href = "/"} style={{ cursor: "pointer" }}>
        Already have an account? Login
      </p>


    </div>
  );
}
