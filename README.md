# 🧾 Billing Software (MERN Stack)

A **full-stack billing & inventory management system** designed for small shops (Kirana stores).
Owners can manage items, generate bills, track stock,  — all from a clean dashboard.

---

## 🚀 Features

### 🔐 Authentication

* Owner **Register & Login**
* JWT-based secure authentication
* Protected routes (Dashboard, Items, Billing)

### 🏪 Dashboard

* Shop overview
* Quick actions (Create Bill, Manage Items)
* Low-stock alerts
* Clean sidebar + top navigation

### 📦 Item Management

* Add new items (name, price, quantity, category)
* View all items in table format
* Search items
* Stock auto-updates after billing

### 🧾 Billing System

* Search items
* Enter quantity & add to bill
* Auto total & grand total calculation
* Edit bill items before finalizing
* Prevent billing when stock is zero

### 🖨 Bill Generation

* Generate **PDF bill**
* Generate **Thermal printer format bill**
* Professional bill layout

### 📊 Reports

* Daily sales summary
* Items sold count
* Total revenue
* Top-selling items (UI ready)
* Monthly/GST/Profit reports (planned)

### 🎨 UI/UX

* Modern gradient UI
* Fixed sidebar (static)
* Responsive layout
* Scrollable tables
* Action buttons with animations

---

## 🛠 Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* CSS (custom)

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* PDF generation

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/Billing_software.git
cd Billing_software
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm start
```

Backend runs at:

```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

## 🔐 API Security

* JWT token stored in `localStorage`
* Axios interceptor sends token automatically
* Unauthorized users redirected to login

---

## 🧠 Learning Outcomes

* MERN full-stack architecture
* Secure authentication using JWT
* Inventory + billing logic
* PDF & thermal bill generation
* Dashboard UI design
* Real-world CRUD workflows


---

## 👨‍💻 Author

**Yanamala Akhil Kumar Reddy**
B.Tech CSE (Final Year)
National Winner – CodeCraft Hackathon 🏆
Interested in Full-Stack Development & AI
