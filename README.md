# 💰 Expense Tracker Application

## 📌 Project Title & Brief Description

The Expense Tracker is a full-stack web application that allows users to manage their daily expenses efficiently. Users can add, update, delete, and view expenses, along with a summarized overview of their spending patterns. The project demonstrates core backend development concepts such as RESTful API design, CRUD operations, and data handling using a lightweight JSON-based storage system, along with a responsive frontend interface.

---

## 🌐 Live Demo Links

* **Frontend (Deployed):** *Add your frontend deployment link here (e.g., Vercel / Netlify)*
* **Backend API (Deployed):** *Add your backend deployment link here (e.g., Render / Railway)*

---

## ⚙️ Tech Stack

### Frontend:

* **React (Vite):** Used for building a fast and responsive user interface
* **Tailwind CSS:** Utility-first CSS framework for styling and layout

### Backend:

* **Node.js:** JavaScript runtime for server-side development
* **Express.js:** Framework for building RESTful APIs
* **UUID:** For generating unique IDs for each expense
* **CORS:** To allow cross-origin requests between frontend and backend

### Data Storage:

* **JSON File System:** Used as a lightweight database for storing expense data

---

## 🚀 How to Run Locally

### Prerequisites:

* Node.js installed on your system

### Step 1: Clone the Repository

```bash
git clone https://github.com/riddhimapant/expense-tracker
cd expense-tracker
```

### Step 2: Run the Backend Server

```bash
cd server
npm install
npm run dev
```

* Backend runs on: `http://localhost:5000` (or configured port)

### Step 3: Run the Frontend

```bash
cd ../client
npm install
npm run dev
```

* Frontend runs on: `http://localhost:5173`

---

## 📡 API Documentation

### Base URL:

```
/api/expenses
```

---

### ➕ Add Expense

* **Method:** POST
* **Endpoint:** `/`
* **Request Body:**

```json
{
  "note": "Lunch",
  "amount": 200,
  "category": "Food",
  "date": "2025-01-01"
}
```

* **Response:**

```json
{
  "id": "uuid",
  "note": "Lunch",
  "amount": 200,
  "category": "Food",
  "date": "2025-01-01"
}
```

---

### 📄 Get All Expenses

* **Method:** GET

* **Endpoint:** `/`

* **Query Parameters (Optional):**

  * `category`
  * `search`

* **Response:**

```json
[
  {
    "id": "uuid",
    "note": "Lunch",
    "amount": 200,
    "category": "Food"
  }
]
```

---

### 📊 Get Expense Summary

* **Method:** GET

* **Endpoint:** `/summary`

* **Response:**

```json
{
  "total": 1000,
  "highest": 500,
  "categoryMap": {
    "Food": 600,
    "Travel": 400
  }
}
```

---

### ✏️ Update Expense

* **Method:** PUT

* **Endpoint:** `/:id`

* **Request Body:**

```json
{
  "note": "Updated Lunch",
  "amount": 250
}
```

* **Response:**

```json
{
  "id": "uuid",
  "note": "Updated Lunch",
  "amount": 250
}
```

---

### ❌ Delete Expense

* **Method:** DELETE

* **Endpoint:** `/:id`

* **Response:**

```json
{
  "message": "Deleted successfully"
}
```

---

## 📁 Project Structure

```
expense-tracker/
│
├── client/                # Frontend (React + Vite)
│   ├── src/               # Components and UI logic
│   ├── index.html
│   └── package.json
│
├── server/                # Backend (Node + Express)
│   ├── controllers/       # Business logic
│   ├── routes/            # API routes
│   ├── data/              # JSON data storage
│   ├── server.js          # Entry point
│   └── package.json
│
└── README.md
```

---

## 🔮 Next Steps

* Integrate a real database (MongoDB or PostgreSQL) instead of JSON storage
* Implement user authentication (login/signup functionality)
* Add data visualization (charts for expense trends)
* Improve filtering, sorting, and pagination
* Fix minor bugs (e.g., search functionality using correct field names)
* Add automated testing (unit and integration tests)

---
