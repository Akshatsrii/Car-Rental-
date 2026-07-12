# 🚗 CarDekho Cabs — Premium MERN Cab Booking Platform

<div align="center">

![MERN](https://img.shields.io/badge/Stack-MERN-00d084?style=for-the-badge)
![Node](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-RealTime-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini_2.5_Flash-AI-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Deployed](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**An enterprise-grade, production-ready ride-hailing platform with real-time tracking, AI-powered assistance, and full admin/driver command centers.**

### 🔗 [**Live Demo →**](https://car-rental-omega-sage.vercel.app/)

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_App-00d084?style=for-the-badge&logo=vercel&logoColor=white)](https://car-rental-omega-sage.vercel.app/)

[Features](#-key-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [API Reference](#-api-reference) • [Architecture](#-system-architecture) • [Roadmap](#-roadmap)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Codebase Folder Structure](#-codebase-folder-structure)
- [Environment Configuration](#️-environment-configuration)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [User Roles & Permissions](#-user-roles--permissions)
- [Security & Enterprise Practices](#️-security--enterprise-practices)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🧭 Overview

CarDekho Cabs is a full-stack MERN (MongoDB, Express, React, Node.js) application built to simulate a real-world ride-hailing ecosystem — think Ola/Uber-style booking, dispatch, and live tracking — wrapped in a bilingual AI assistant, real-time Socket.IO event pipeline, and a data-driven admin control board.

It's designed to be a strong **portfolio-grade** and **learning-grade** project: the codebase demonstrates authentication & RBAC, real-time systems, third-party AI integration, Dockerized deployment, and enterprise logging/audit practices — all in one repository.

---

## 🚀 Live Demo

The app is deployed and publicly accessible: **[car-rental-omega-sage.vercel.app](https://car-rental-omega-sage.vercel.app/)**

> ⚠️ Note: The live deployment hosts the frontend only (or a demo-mode backend). Some features that require persistent infrastructure — Socket.IO real-time events, Redis-backed rate limiting, SOS dispatch, and scheduled cron jobs — behave best when the full stack (server + MongoDB + Redis) is self-hosted via Docker Compose per the [Getting Started](#-getting-started) section below.

### Demo Credentials *(suggested — wire these up in your seed script)*

| Role | Email | Password |
|---|---|---|
| Customer | `customer@demo.com` | `Demo@123` |
| Driver | `driver@demo.com` | `Demo@123` |
| Admin | `admin@demo.com` | `Demo@123` |

### 📸 Screenshots *(placeholder — add real captures from the live app)*

| Customer Booking | Live Tracking | Admin Dashboard |
|---|---|---|
| ![Booking](https://via.placeholder.com/280x180?text=Booking+Screen) | ![Tracking](https://via.placeholder.com/280x180?text=Live+Tracking) | ![Admin](https://via.placeholder.com/280x180?text=Admin+Dashboard) |

---

## 🌟 Key Features

### 1. 🤖 Advanced AI Integrations
- **AI Chatbot (Gemini 2.5 Flash)** — Interactive assistant answering booking, pricing, and tracking questions in English and Hindi.
- **Voice Capabilities** — Native Web Speech API integration for Speech-to-Text (voice input) and Text-to-Speech (mute/unmute readout).
- **AI Demand Prediction** — Next-24h demand forecasting panel in the Admin board, predicting peak hours, target routes, and driver supply guidelines.
- **AI Fraud Detection Engine** — Rule-based transaction integrity checks (identical locations, excessive routes, suspiciously high fares).

### 2. ⚡ Real-Time Operations
- **GPS Map Tracking** — Free, keyless Google Maps dynamic iframe integration that updates automatically with the customer's pickup address.
- **Socket.IO Event Stream** — Instant backend status changes pushed to the customer dashboard without page reloads.
- **Safety OTP & Lock** — Date comparison algorithms unlock safety OTP codes, vehicle numbers, and driver contacts only on the booking day.
- **Scan-to-Start QR Code** — Scannable check-in tickets generated via the public `qrserver` API for driver verification.

### 3. 💳 Billing & Premium Extras
- **Wallet & Referral Systems** — Mock wallet balances with add-cash flow, plus click-to-copy referral invitations with reward tracking.
- **Invoice PDF Generator** — Direct print layout via `window.print()` to save/print completed ride receipts.
- **Panic/Emergency SOS** — Pulsating SOS button broadcasting immediate alerts to admin portals and (simulated) local dispatch.

### 4. 📈 Admin & Driver Panels
- **Admin Dashboard** — Dynamic weekly revenue bar chart, booking dispatch chart, live driver counts (available/busy), interactive tooltips.
- **Driver Console** — Live dispatch list, customer contact numbers, estimated earnings, trip acceptance toggles.
- **Role-Based Auth** — Secure authorization tiers (Customer, Driver, Admin) with secret-code guards for privileged registration.

### 5. 🆕 Suggested Enhancements *(new additions for this iteration)*
- **Ratings & Reviews** — Post-ride 5-star rating + comment system feeding into driver performance scores.
- **Surge Pricing Engine** — Dynamic fare multiplier based on live demand-to-driver ratio per zone.
- **Multi-language i18n** — Full UI translation layer beyond the chatbot (English/Hindi toggle sitewide).
- **Ride History & Analytics** — Customer-facing trip history with spend analytics and CO₂/distance stats.
- **Push Notifications (Web Push)** — Browser-native notifications for dispatch updates even when the tab is backgrounded.
- **Dark/Light Theme Toggle** — Persisted theme preference across the customer, driver, and admin apps.
- **Rate Limiting & Abuse Guard** — `express-rate-limit` + Redis-backed throttling on booking and OTP endpoints.
- **Automated Email Receipts** — Nodemailer-triggered ride summary emails post-completion.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React (Vite), React Router, Context API / Redux Toolkit, Chart.js or Recharts |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB + Mongoose ODM |
| **Real-Time** | Socket.IO |
| **Caching/Queue** | Redis |
| **AI** | Google Gemini 2.5 Flash API |
| **Auth** | JWT + bcrypt, role-based middleware |
| **Logging** | Winston (console + file transports) |
| **Containerization** | Docker, Docker Compose |
| **Mail** | Nodemailer (Gmail App Password) |
| **QR Codes** | qrserver public API |
| **Maps** | Google Maps iframe embed (keyless) |

---

## 🏗️ System Architecture

```
┌──────────────┐        WebSocket / REST        ┌──────────────────┐
│   React SPA  │ ───────────────────────────────▶│   Express API    │
│ (Vite Client)│ ◀───────────────────────────────│   (Node.js)      │
└──────┬───────┘                                  └────────┬─────────┘
       │                                                    │
       │ Gemini API (chat/voice)                            │ Mongoose ODM
       ▼                                                    ▼
┌──────────────┐                                  ┌──────────────────┐
│ Google Gemini│                                  │     MongoDB      │
│  2.5 Flash   │                                  └──────────────────┘
└──────────────┘                                            │
                                                             ▼
                                                   ┌──────────────────┐
                                                   │  Redis (cache /  │
                                                   │  rate limiting)  │
                                                   └──────────────────┘
```

Socket.IO runs alongside the Express HTTP server, broadcasting booking status, dispatch, and SOS events to connected clients scoped by user role (customer/driver/admin rooms).

---

## 📂 Codebase Folder Structure

```
├── server/
│   ├── config/             # DB & Gemini API service layers
│   ├── controllers/        # Business logic controllers
│   ├── middleware/         # Auth verification and file upload setups
│   ├── models/             # Schema definitions (Users, Bookings, Payments, AuditLogs)
│   ├── routes/             # API Router endpoints
│   ├── utils/              # Nodemailer services and Winston logger
│   ├── sockets/            # Socket.IO event handlers & room management
│   └── Dockerfile          # Multi-stage Backend Docker image
│
├── client/ (Vite React)
│   ├── src/
│   │   ├── components/     # Reusable cards, titles, headers, floating chatbot
│   │   ├── pages/          # Booking console, admin charts, driver dashboards
│   │   ├── hooks/          # Custom hooks (useSocket, useAuth, useVoice)
│   │   ├── context/        # Global auth/theme/wallet state
│   │   └── App.jsx         # Routing mapping
│   └── Dockerfile          # Vite Frontend Docker image
│
└── docker-compose.yml      # Orchestrates MERN, Redis, and MongoDB containers
```

> **Note:** Renamed `cilent/` → `client/` (typo fix) for consistency across scripts and Docker configs.

---

## ⚙️ Environment Configuration

Create a `.env` file inside the `server/` directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/carrental
JWT_SECRET=your_jwt_secret_token
JWT_EXPIRES_IN=7d

GEMINI_API_KEY=your_google_ai_studio_gemini_api_key
ADMIN_SECRET_CODE=your_secret_admin_registration_code

REDIS_URL=redis://localhost:6379

# Mail Transporter (Optional for Welcome/Receipt Emails)
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password

# Client origin (CORS)
CLIENT_URL=http://localhost:5173
```

Create a `.env` file inside the `client/` directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Redis (local or hosted)
- A Google AI Studio Gemini API key

### Method 1: Local Development Setup

1. **Start MongoDB and Redis** local instances.
2. **Setup Backend**:
   ```bash
   cd server
   npm install
   npm run dev
   ```
3. **Setup Frontend**:
   ```bash
   cd client
   npm install
   npm run dev
   ```

### Method 2: Containerized Boot (Docker Compose)

Launch the entire system in isolated containers:
```bash
docker-compose up -d --build
```
- **Frontend URL**: `http://localhost:5173`
- **Backend URL**: `http://localhost:3000`

### Seeding Demo Data *(suggested addition)*
```bash
cd server
npm run seed
```
Populates demo customers, drivers, and an admin account for quick testing.

---

## 📡 API Reference

A high-level summary of core endpoints (see `/server/routes` for full detail):

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register customer/driver/admin | Public |
| `POST` | `/api/auth/login` | Login, returns JWT | Public |
| `POST` | `/api/bookings` | Create a new ride booking | Customer |
| `GET` | `/api/bookings/:id` | Fetch booking details + OTP (day-of only) | Customer/Driver |
| `PATCH` | `/api/bookings/:id/status` | Update dispatch status | Driver/Admin |
| `POST` | `/api/bookings/:id/sos` | Trigger emergency SOS | Customer |
| `GET` | `/api/admin/analytics` | Weekly revenue & dispatch chart data | Admin |
| `GET` | `/api/admin/demand-forecast` | AI-generated 24h demand prediction | Admin |
| `POST` | `/api/chatbot/message` | Send message to Gemini-powered assistant | Customer |
| `GET` | `/api/wallet` | Fetch wallet balance & referral code | Customer |

---

## 👥 User Roles & Permissions

| Role | Capabilities |
|---|---|
| **Customer** | Book rides, track live status, use chatbot, manage wallet, trigger SOS, rate drivers |
| **Driver** | View/accept dispatches, update trip status, view earnings, scan QR check-in |
| **Admin** | View analytics & demand forecasts, manage drivers, review audit logs, moderate fraud flags |

Admin and Driver registration require a secret code (`ADMIN_SECRET_CODE`) or driver-verification flow to prevent unauthorized privilege escalation.

---

## 🛡️ Security & Enterprise Practices

- **Winston Logger** — Logs separated into console output and structured files (`logs/error.log` / `combined.log`).
- **Admin Audit Logs** — Tracks database changes regarding driver dispatches, configuration edits, and role escalations.
- **Input Sanitization & CORS** — Strict request validation on route layers preventing injection attacks.
- **Rate Limiting** *(suggested)* — Redis-backed throttling on auth, booking, and OTP-sensitive routes.
- **Helmet.js** *(suggested)* — HTTP header hardening against common web vulnerabilities.
- **Password Hashing** — bcrypt with salt rounds for all stored credentials.
- **JWT Expiry & Refresh** *(suggested)* — Short-lived access tokens with refresh token rotation.

---

## 🧪 Testing

*(Suggested additions to round out production-readiness)*

```bash
# Backend unit/integration tests
cd server
npm run test

# Frontend component tests
cd client
npm run test
```

Recommended stack: **Jest** + **Supertest** (API), **React Testing Library** (components), **Cypress** (E2E booking flow).

---

## 📦 Deployment

- **Backend**: Render, Railway, or a VPS running the provided Dockerfile.
- **Frontend**: Vercel or Netlify (static Vite build), or served via the Docker Compose stack.
- **Database**: MongoDB Atlas for managed, production-grade persistence.
- **Redis**: Upstash or Redis Cloud for managed caching in production.

CI/CD *(suggested)*: GitHub Actions workflow to lint, test, build Docker images, and push to a container registry on merge to `main`.

---

## 🗺️ Roadmap

- [ ] Ratings & reviews system
- [ ] Surge pricing engine
- [ ] Full sitewide i18n (English/Hindi)
- [ ] Web Push notifications
- [ ] Ride history & analytics dashboard for customers
- [ ] Automated CI/CD pipeline
- [ ] Native mobile app (React Native) sharing the same API

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add: your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please follow the existing code style and include tests for new functionality where applicable.

---

## 📄 License

This project is licensed under the **MIT License** — see the `LICENSE` file for details.

---

## 📬 Contact

Built by **Akshatsrii**. For questions, issues, or feature requests, please open a GitHub issue.
