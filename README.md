 Car-Rental
🚗 Car Rental Website (MERN Stack)  A full-stack Car Rental Web Application built using the MERN stack with modern UI and complete real-world functionality. The platform supports user authentication, car booking, and a dedicated owner dashboard to manage cars and bookings efficiently.
✨ Features
👤 User Features
User Signup & Login (JWT Authentication)
Browse available cars
View car details
Book cars with real-time availability
View booking history
Secure logout

🧑‍💼 Owner Features
Dedicated Owner Dashboard
Add new cars
Update car availability (Available / Unavailable)
Manage all cars
View booking status
Manage bookings
Owner-only protected routes

🎨 UI / UX

Modern and responsive UI
Clean dashboard layout
Smooth navigation
User-friendly forms
Mobile-friendly design

🛠 Tech Stack
Frontend
React.js
React Router DOM
Context API
Axios
CSS / Tailwind CSS (or your styling choice)
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
Bcrypt.js
Database
MongoDB (Atlas / Compass)

🔐 Authentication & Authorization
JWT-based authentication
Role-based access (User / Owner)
Protected routes
Secure password hashing

📁 Project Structure
CarRental/
│
├── client/                # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── assets/
│   │   └── App.jsx
│
├── server/                # Node + Express Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── .env
├── package.json
└── README.md



🚀 How It Works
Users can register/login
Users browse cars and book available cars
Owners can:
Add cars
Update availability
Manage bookings
All data is stored securely in MongoDB
API communication via Axios

🔒 Security Features
Encrypted passwords using bcrypt
JWT token validation
Protected API routes
Role-based access control

📸 Screens Included
Login & Signup page
Car listing page
Car booking page
Owner dashboard
Add car page
Manage bookings page

🌟 Future Enhancements
Online payment gateway
Admin panel
Reviews & ratings
Email notifications
Advanced filters & search
