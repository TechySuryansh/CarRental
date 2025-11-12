# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# 🚗 Car Rental System

A full-stack **Car Rental Management Application** built to streamline the process of renting cars.  
It allows users to browse available cars, book rentals, manage bookings, and view their rental history — all through a clean, responsive UI.

---

## 🧩 Features

### 🔐 Authentication
- User registration and login with JWT-based authentication
- Secure password hashing using bcrypt
- Role-based access control (Admin, User)

### 🚙 Car Management
- Add, edit, delete car listings (Admin only)
- View available cars with filters (by brand, type, price, etc.)
- Upload car images using Multer

### 📅 Booking System
- Rent a car for a custom duration
- Check car availability in real-time
- View all active and past bookings

### 💳 Payments (Optional Integration)
- Mock or real payment gateway integration (Stripe / Razorpay)
- Booking confirmation after successful payment

### ⚙️ Admin Dashboard
- Manage cars, users, and bookings
- View business analytics and total rentals

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React.js / Next.js, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Authentication | JWT (JSON Web Token) |
| File Uploads | Multer |
| Hosting | Render / Vercel / MongoDB Atlas |
