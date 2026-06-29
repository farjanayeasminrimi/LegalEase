# ⚖️ LegalEase – Online Lawyer Hiring Platform

A full-stack MERN-based marketplace platform that connects clients, lawyers, and administrators in a seamless legal service ecosystem. Users can hire lawyers, lawyers can manage their services, and admins can control the entire system with analytics and role-based access.

---

## 🚀 Live Demo
> Add your live link here  
`https://lawyer-10.vercel.app`

---

## 📌 Project Purpose

LegalEase aims to modernize legal service accessibility by removing traditional barriers in hiring lawyers. It enables:

- Clients to easily find and hire legal experts
- Lawyers to publish and manage services after verification
- Admins to manage users, transactions, and platform analytics

---

## 🧠 Key Features

### 👤 Authentication System
- Email & Password login
- Google OAuth login
- Role-based access (User / Lawyer / Admin)
- JWT-based authentication (7-day expiry)

### ⚖️ Lawyer Marketplace
- Browse lawyers publicly
- Search & filter by specialization, fee, availability
- View detailed lawyer profiles
- Hire lawyers with confirmation modal

### 💳 Payment System
- Stripe integration for hiring payments
- Transaction tracking for all roles
- Paid / Pending status system

### 💬 Comment System
- Only hired users can comment
- Edit & delete comments
- Secure API validation

### 📊 Dashboards (Role-based)

#### 👤 User Dashboard
- Hiring history (Pending / Accepted / Rejected)
- Payment after lawyer approval
- Profile update
- Comment management

#### 👨‍⚖️ Lawyer Dashboard
- Manage hiring requests (Accept / Reject)
- Manage legal profile/services
- Upload image via imgBB
- View hiring history

#### 🛡️ Admin Dashboard
- Manage users (role change / delete)
- View all transactions
- Platform analytics (users, lawyers, revenue, hires)

---

## 🏗️ Tech Stack

### Frontend
- ⚛️ React / Next.js → :contentReference[oaicite:0]{index=0}  
- 🎨 Tailwind CSS  
- 🎞️ Framer Motion (animations)  
- 🧩 Component-based UI

### Backend
- 🟢 Node.js  
- 🚂 Express.js  
- 🍃 MongoDB → :contentReference[oaicite:1]{index=1}  
- 🔐 JWT Authentication  
- ☁️ imgBB API (image upload)

### Payment
- 💳 Stripe → :contentReference[oaicite:2]{index=2}  

### Authentication
- 🔑 BetterAuth / OAuth  
- 🔐 JWT Token System

---

## 📁 Main Pages

### 🏠 Home Page
- Hero banner with CTA
- Featured lawyers (auto-refresh)
- Top legal experts
- Legal categories grid
- Framer Motion animations

### 🔎 Browse Lawyers
- Public access
- Search, filter, pagination
- Responsive grid layout
- Lawyer cards with details

### 👨‍⚖️ Lawyer Details
- Full profile view
- Hire modal (login required)
- Comment section (restricted access)

---

## 📊 Dashboard Routes

### 👤 User
- `/dashboard/user/hiring-history`
- `/dashboard/user/update-profile`
- `/dashboard/user/comments`

### ⚖️ Lawyer
- `/dashboard/lawyer/hiring-history`
- `/dashboard/lawyer/manage-legal-profile`

### 🛡️ Admin
- `/dashboard/admin/manage-users`
- `/dashboard/admin/all-transactions`
- `/dashboard/admin/analytics`

---

## 🔐 Security Features
- JWT protected APIs
- Role-based route protection
- Secure environment variables
- MongoDB credentials hidden in `.env`

---

## 📦 Installation
