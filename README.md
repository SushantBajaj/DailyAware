# 📊 MERN Analytics Dashboard

A full-stack MERN (MongoDB, Express.js, React, Node.js) web application that provides interactive analytics charts with secure authentication and data management.

---

## 🚀 Features

### User Authentication
- Custom signup and login system
- Passwords securely hashed using bcrypt
- Users must log in after signup to use app features

### Dynamic Dashboard
- Displays charts and analytics of user data
- Dates sorted in ascending order (left → right)
- Interactive and responsive graph UI

### Error Handling
- Centralized backend error middleware
- Clear frontend error messages for invalid inputs or server issues

### Database
- MongoDB Atlas integration for secure cloud data storage

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React, Recharts, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas |
| **Authentication** | JWT, bcrypt |
| **Deployment (Recommended)** | Frontend → GitHub Pages / Vercel<br>Backend → Render / Railway |

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/SushantBajaj/DailyAware
cd DailyAware
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key
PORT=5000
```

Generate a random JWT secret key using:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Then run:

```bash
npm start
```

You should see:

```
Connected to MongoDB
Server running on port 5000
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

Your frontend should now be live at `http://localhost:3000`



## 🔐 Authentication Flow

1. **Signup**: User registers with name, email, and password.
2. **Login**: User must log in after signup to access dashboard features.
3. **Protected Routes**: Only authenticated users can view analytics and charts.

---

## 🧠 Error Handling Examples

| Type | Example |
|------|---------|
| **Invalid credentials** | Displays message: "Incorrect email or password" |
| **Missing fields** | Displays message: "All fields are required" |
| **Server error** | Displays message: "Something went wrong, please try again later" |

