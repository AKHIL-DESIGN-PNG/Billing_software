import { useEffect, useState } from "react";
import api from "../services/api";

export default function Billing() {
    const [search, setSearch] = useState("");
    const [suggestedItems, setSuggestedItems] = useState([]);
    const [billItems, setBillItems] = useState([]);
    const [qtyMap, setQtyMap] = useState({});

    const [editingIndex, setEditingIndex] = useState(null);
    const [editForm, setEditForm] = useState({ price: "", qty: "" });

    /* ================= FETCH ITEMS ================= */

    const fetchAllItems = async () => {
        const res = await api.get("/items");
        setSuggestedItems(Array.isArray(res.data) ? res.data : []);
    };

    useEffect(() => {
        fetchAllItems();
    }, []);

    /* ================= SEARCH ================= */

    const searchItems = async (text) => {
        setSearch(text);

        if (!text) {
            fetchAllItems();
            return;
        }

        const res = await api.get(`/items/search/${text}`);
        setSuggestedItems(Array.isArray(res.data) ? res.data : []);
    };

    /* ================= ADD TO BILL ================= */

    const addToBill = async (item) => {
        const qty = Number(qtyMap[item._id]);

        if (!qty || qty <= 0) return;
        if (qty > item.quantity) return;

        await api.post("/items/deduct", {
            name: item.name,
            quantity: qty
        });

        const existing = billItems.find(b => b.name === item.name);

        if (existing) {
            setBillItems(
                billItems.map(b =>
                    b.name === item.name
                        ? {
                            ...b,
                            qty: b.qty + qty,
                            total: (b.qty + qty) * b.price
                        }
                        : b
                )
            );
        } else {
            setBillItems([
                ...billItems,
                {
                    name: item.name,
                    price: item.price,
                    qty,
                    total: item.price * qty
                }
            ]);
        }

        setQtyMap({ ...qtyMap, [item._id]: "" });
        setSearch("");
        fetchAllItems();
    };

    /* ================= EDIT BILL ITEM ================= */

    const startEdit = (index, item) => {
        setEditingIndex(index);
        setEditForm({ price: item.price, qty: item.qty });
    };

    const saveEdit = (index) => {
        const updated = [...billItems];

        updated[index] = {
            ...updated[index],
            price: Number(editForm.price),
            qty: Number(editForm.qty),
            total: Number(editForm.price) * Number(editForm.qty)
        };

        setBillItems(updated);
        setEditingIndex(null);
    };

    const cancelEdit = () => {
        setEditingIndex(null);
    };

    /* ================= TOTAL ================= */

    const grandTotal = billItems.reduce((sum, i) => sum + i.total, 0);

    /* ================= GENERATE BILL ================= */

    const generateBill = async () => {
        if (billItems.length === 0) return;

        const res = await api.post(
            "/bill/generate",
            {
                items: billItems,
                grandTotal
            },
            { responseType: "blob" }
        );

        const file = new Blob([res.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
    };
    const generateThermalBill = async () => {
        if (billItems.length === 0) return;

        const res = await api.post(
            "/bill/generate-thermal",
            {
                items: billItems,
                grandTotal
            },
            { responseType: "blob" }
        );

        const file = new Blob([res.data], { type: "application/pdf" });
        const url = URL.createObjectURL(file);
        window.open(url);
    };


    /* ================= UI ================= */

    return (
        <>
            <h2>Billing</h2>

            {/* SEARCH */}
            <input
                placeholder="Search item"
                value={search}
                onChange={(e) => searchItems(e.target.value)}
            />

            {/* AVAILABLE ITEMS */}
            <h3>Available Items</h3>
            {suggestedItems.map((item) => (
                <div key={item._id} style={{ marginBottom: "10px" }}>
                    <strong>{item.name}</strong> | ₹{item.price} | Stock: {item.quantity}

                    <input
                        type="number"
                        placeholder="Qty"
                        value={qtyMap[item._id] || ""}
                        onChange={(e) =>
                            setQtyMap({ ...qtyMap, [item._id]: e.target.value })
                        }
                        style={{ marginLeft: "10px", width: "60px" }}
                    />

                    <button
                        style={{ marginLeft: "10px" }}
                        onClick={() => addToBill(item)}
                    >
                        Add
                    </button>
                </div>
            ))}

            {/* BILL TABLE */}
            <h3>Bill Items</h3>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {billItems.map((b, i) => (
                        <tr key={i}>
                            <td>{b.name}</td>

                            <td>
                                {editingIndex === i ? (
                                    <input
                                        type="number"
                                        value={editForm.price}
                                        onChange={(e) =>
                                            setEditForm({ ...editForm, price: e.target.value })
                                        }
                                        style={{ width: "70px" }}
                                    />
                                ) : (
                                    b.price
                                )}
                            </td>

                            <td>
                                {editingIndex === i ? (
                                    <input
                                        type="number"
                                        value={editForm.qty}
                                        onChange={(e) =>
                                            setEditForm({ ...editForm, qty: e.target.value })
                                        }
                                        style={{ width: "60px" }}
                                    />
                                ) : (
                                    b.qty
                                )}
                            </td>

                            <td>{b.total}</td>

                            <td>
                                {editingIndex === i ? (
                                    <>
                                        <button onClick={() => saveEdit(i)}>✔</button><br />
                                        <button onClick={cancelEdit}>✖</button>
                                    </>
                                ) : (
                                    <button onClick={() => startEdit(i, b)}>✏️</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Grand Total: ₹{grandTotal}</h2>

            {/* GENERATE BILL BUTTON */}
            {/* <button
                onClick={generateBill}
                style={{
                    position: "fixed",
                    bottom: "30px",
                    right: "30px",
                    background: "#00e676",
                    color: "#000",
                    padding: "15px 25px",
                    fontSize: "16px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
                }}

            >
                🧾 Generate Bill
            </button>
            <button
                onClick={generateThermalBill}
                style={{
                    position: "fixed",
                    bottom: "30px",
                    right: "200px",
                    background: "#ffd600",
                    color: "#000",
                    padding: "15px 20px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer"
                }}
            >
                🧾 Thermal Print
            </button> */}
            <div className="bill-actions">
                <button
                    className="thermal-btn"
                    onClick={generateThermalBill}
                >
                    🧾 Thermal Print
                </button>

                <button
                    className="generate-btn"
                    onClick={generateBill}
                >
                    📄 Generate Bill
                </button>
            </div>

            <div className="bill-warning">
                ⚠️ Please double-check before generating bill
            </div>

        </>
    );
}
