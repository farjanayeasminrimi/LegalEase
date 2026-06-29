# LegalEase

LegalEase is a full-stack MERN application that modernizes the process of hiring legal professionals. The platform allows clients to find and hire verified lawyers, enables lawyers to manage their professional services, and provides administrators with tools to oversee users, transactions, and platform performance through a centralized dashboard.

---

## Live Demo

https://legal-ease-mauve.vercel.app
---

## Overview

LegalEase is built to simplify access to legal services by creating a digital marketplace where clients and lawyers can connect efficiently. The application provides a secure hiring workflow, role-based access control, online payment integration, and separate dashboards tailored to different types of users.

---

## Key Features

### Authentication

- Email and password authentication
- Google Sign-In
- JWT-based authentication
- Protected routes
- Role-based authorization

### Lawyer Marketplace

- Browse lawyers without logging in
- Search lawyers by name
- Filter lawyers by specialization, consultation fee, and availability
- View detailed lawyer profiles
- Submit hiring requests

### Payment System

- Secure Stripe payment integration
- Payment after lawyer approval
- Transaction history
- Payment status tracking

### Review System

- Only hired clients can submit reviews
- Edit existing reviews
- Delete reviews
- Backend validation for secure access

---

## User Roles

### Client

Clients can:

- Browse available lawyers
- Search and filter legal professionals
- Send hiring requests
- Complete payments
- View hiring history
- Update profile information
- Manage personal reviews

### Lawyer

Lawyers can:

- Manage their professional profile
- Upload profile images using imgBB
- Accept or reject hiring requests
- View hiring history
- Update legal service information

### Administrator

Administrators can:

- Manage users
- Change user roles
- Remove user accounts
- Monitor transactions
- View revenue reports
- Access platform analytics

---

## Application Workflow

```text
Register or Login
        │
        ▼
Browse Lawyers
        │
        ▼
View Lawyer Profile
        │
        ▼
Submit Hiring Request
        │
        ▼
Lawyer Reviews Request
        │
   ┌────┴────┐
   │         │
Reject    Accept
   │         │
   ▼         ▼
 End    Complete Payment
             │
             ▼
      Hiring Completed
             │
             ▼
      Submit a Review
```

---

## Pages

### Home

- Hero banner
- Featured lawyers
- Legal categories
- Top professionals
- Smooth animations

### Browse Lawyers

- Public access
- Search functionality
- Advanced filtering
- Pagination
- Responsive layout

### Lawyer Details

- Professional profile
- Biography
- Consultation fee
- Hire option
- Review section

### Dashboard

Each authenticated user is provided with a dedicated dashboard based on their assigned role.

**Client Dashboard**

- Hiring history
- Payment records
- Pending requests
- Profile management
- Review management

**Lawyer Dashboard**

- Hiring requests
- Client history
- Profile management
- Service management

**Admin Dashboard**

- User management
- Transaction management
- Revenue overview
- Platform statistics

---

## Technology Stack

### Frontend

- React.js
- Tailwind CSS
- React Router
- Axios
- Framer Motion

### Backend

- Node.js
- Express.js
- MongoDB

### Authentication

- Firebase Authentication
- Google OAuth
- JSON Web Token (JWT)

### Payment

- Stripe

### Cloud Storage

- imgBB API

---

## Security

- JWT authentication
- Protected API routes
- Role-based authorization
- Backend request validation
- Secure payment workflow
- Environment variable protection

---

## Responsive Design

The application is optimized for:

- Desktop
- Laptop
- Tablet
- Mobile devices
