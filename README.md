# 🚗 CarRental Cabs - Premium MERN Cab Booking Platform

CarRental Cabs is an enterprise-grade, production-ready MERN (MongoDB, Express, React, Node.js) application designed for high-performance ride hailing, driver assignment, live status updates, and interactive AI-driven passenger assistance.

---

## 🌟 Key Features

### 1. 🤖 Advanced AI Integrations
- **AI Chatbot (Gemini 2.5 Flash)**: Interactive chatbot answering booking, pricing, and tracking questions in English and Hindi.
- **Voice Capabilities**: Native Web Speech API integration supporting Speech-to-Text (Voice input) and Text-to-Speech (Mute/Unmute toggle readout).
- **AI Demand Prediction**: Next-24h demand forecasting panel inside the Admin control board predicting peak hours, target routes, and driver supply guidelines.
- **AI Fraud Detection Engine**: Rule-based transaction integrity checks (identical locations, excessive routes, suspiciously high fares).

### 2. ⚡ Real-Time Operations
- **GPS Map Tracking**: Free, keyless Google Maps dynamic iframe integration updating automatically to the customer's pickup address input.
- **Socket.IO Event Stream**: Instant backend status changes push notifications to the customer's dashboard without page reloads.
- **Safety OTP & Lock**: Date comparison algorithms unlocking safety OTP codes, vehicle numbers, and driver contacts only on the booking day.
- **Scan-to-Start QR Code**: Scanable check-in tickets generated using public qrserver API for driver verification.

### 3. 💳 Billing & Extra Premium Features
- **Wallet & Referral Systems**: Mock Wallet balances with add cash options, plus click-to-copy referral invitation rewards.
- **Invoice PDF Generator**: Direct print layout triggering browser print sheets (`window.print()`) to save or print completed ride receipts.
- **Panic/Emergency SOS**: Pulsating button broadcasting immediate security triggers to administrative portals and local dispatches.

### 4. 📈 Admin & Driver Panels
- **Admin Dashboard**: Dynamic Weekly Revenue Bar Chart, Booking Dispatch Chart, live driver counts (available/busy), and interactive tooltips.
- **Driver Console**: Dynamic list of dispatches, customer contact numbers, estimated earnings, and trip acceptance toggles.
- **Role-Based Auth**: Secure authorization tiers (Customer, Driver, Admin) with secret code guards for registration.

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
│   └── Dockerfile          # Multi-stage Backend Docker image
│
├── cilent/ (Vite React)
│   ├── src/
│   │   ├── components/     # Reusable cards, titles, headers, floating chatbot
│   │   ├── pages/          # Booking console, admin charts, driver dashboards
│   │   └── App.jsx         # Routing mapping
│   └── Dockerfile          # Vite Frontend Docker image
│
└── docker-compose.yml      # Orchestrates MERN, Redis, and MongoDB containers
```

---

## ⚙️ Environment Configurations

Create a `.env` file inside the `server/` directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/carrental
JWT_SECRET=your_jwt_secret_token
GEMINI_API_KEY=your_google_ai_studio_gemini_api_key
ADMIN_SECRET_CODE=your_secret_admin_registration_code

# Mail Transporter (Optional for Welcome Emails)
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
```

---

## 🚀 Getting Started

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
   cd cilent
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

---

## 🛡️ Enterprise Best Practices
- **Winston Logger**: Logs separated into console output and structured files (`logs/error.log` / `combined.log`).
- **Admin Audit Logs**: Tracks database changes regarding driver dispatches, configuration edits, and role escalations.
- **Input Sanitization & CORS**: Strict request validations on route layers preventing scripting injections.
