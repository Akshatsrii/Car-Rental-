import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";

import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import MyBookings from "./pages/MyBookings";

// OWNER PAGES
import Layout from "./pages/owner/Layout";
import Dashboard from "./pages/owner/Dashboard";
import AddCar from "./pages/owner/AddCar";
import ManageCars from "./pages/owner/ManageCars";
import ManageBookings from "./pages/owner/ManageBookings";

import { useAppContext } from "./components/context/AppContext";

const App = () => {
  const { showLogin } = useAppContext();
  const location = useLocation();

  const isOwnerPath = location.pathname.startsWith("/owner");

  return (
    <>
      <Toaster />

      {/* LOGIN MODAL */}
      {showLogin && <Login />}

      {/* USER NAVBAR */}
      {!isOwnerPath && <Navbar />}

      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/mybookings" element={<MyBookings />} />

        {/* OWNER ROUTES */}
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>
      </Routes>

      {/* USER FOOTER */}
      {!isOwnerPath && <Footer />}
    </>
  );
};

export default App;
