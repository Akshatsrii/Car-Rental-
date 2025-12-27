import React, { useEffect, useState } from "react";
import { Search, Plus, Edit2, Trash2, Eye, EyeOff, X, Check, AlertCircle, Filter, RefreshCw, LayoutDashboard, Car, Calendar, Menu } from "lucide-react";

// Dummy data for demo
const dummyCarData = [
  { id: 1, brand: "Toyota", model: "Fortuner", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400", category: "SUV", pricePerDay: 120, seating_capacity: 7, transmission: "Automatic", isAvailable: true },
  { id: 2, brand: "Honda", model: "City", image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400", category: "Sedan", pricePerDay: 60, seating_capacity: 5, transmission: "Manual", isAvailable: true },
  { id: 3, brand: "Maruti", model: "Swift", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400", category: "Hatchback", pricePerDay: 40, seating_capacity: 5, transmission: "Manual", isAvailable: false },
  { id: 4, brand: "Mercedes", model: "S-Class", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400", category: "Luxury", pricePerDay: 250, seating_capacity: 5, transmission: "Automatic", isAvailable: true },
  { id: 5, brand: "Hyundai", model: "Creta", image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=400", category: "SUV", pricePerDay: 80, seating_capacity: 5, transmission: "Automatic", isAvailable: true },
  { id: 6, brand: "Mahindra", model: "Thar", image: "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=400", category: "SUV", pricePerDay: 100, seating_capacity: 4, transmission: "Manual", isAvailable: true },
  { id: 7, brand: "BMW", model: "7 Series", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400", category: "Luxury", pricePerDay: 300, seating_capacity: 5, transmission: "Automatic", isAvailable: false },
  { id: 8, brand: "Kia", model: "Seltos", image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400", category: "SUV", pricePerDay: 85, seating_capacity: 5, transmission: "Automatic", isAvailable: true },
  { id: 9, brand: "Volkswagen", model: "Polo", image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400", category: "Hatchback", pricePerDay: 50, seating_capacity: 5, transmission: "Manual", isAvailable: true },
];

const storage = {
  async get(key) {
    try {
      if (typeof window !== 'undefined' && window.storage) {
        return await window.storage.get(key);
      }
    } catch (error) {
      console.log('Using in-memory storage');
    }
    return null;
  },
  async set(key, value) {
    try {
      if (typeof window !== 'undefined' && window.storage) {
        return await window.storage.set(key, value);
      }
    } catch (error) {
      console.log('Using in-memory storage');
    }
    return { key, value };
  }
};

const ManageCars = () => {
  const currency = "$";
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [toast, setToast] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    category: "",
    pricePerDay: "",
    seating_capacity: "",
    transmission: "Manual",
    image: "",
    isAvailable: true
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await storage.get('manage-cars-data');
        if (result && result.value) {
          const savedCars = JSON.parse(result.value);
          setCars(savedCars);
          setFilteredCars(savedCars);
        } else {
          setCars(dummyCarData);
          setFilteredCars(dummyCarData);
          await storage.set('manage-cars-data', JSON.stringify(dummyCarData));
        }
      } catch (error) {
        setCars(dummyCarData);
        setFilteredCars(dummyCarData);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (cars.length > 0) {
      storage.set('manage-cars-data', JSON.stringify(cars)).catch(() => {});
    }
  }, [cars]);

  useEffect(() => {
    let result = [...cars];

    if (searchQuery) {
      result = result.filter(car =>
        `${car.brand} ${car.model}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      result = result.filter(car => car.category === categoryFilter);
    }

    if (availabilityFilter === "available") {
      result = result.filter(car => car.isAvailable);
    } else if (availabilityFilter === "unavailable") {
      result = result.filter(car => !car.isAvailable);
    }

    result.sort((a, b) => {
      if (sortBy === "name") {
        return `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`);
      } else if (sortBy === "price-low") {
        return a.pricePerDay - b.pricePerDay;
      } else if (sortBy === "price-high") {
        return b.pricePerDay - a.pricePerDay;
      }
      return 0;
    });

    setFilteredCars(result);
  }, [searchQuery, sortBy, categoryFilter, availabilityFilter, cars]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleCarAvailability = (id) => {
    setCars(prev =>
      prev.map(car =>
        car.id === id ? { ...car, isAvailable: !car.isAvailable } : car
      )
    );
    showToast("Car status updated!");
  };

  const handleDeleteCar = (car) => {
    setSelectedCar(car);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setCars(prev => prev.filter(car => car.id !== selectedCar.id));
    setShowDeleteModal(false);
    setSelectedCar(null);
    showToast("Car deleted successfully!", "success");
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({
      brand: "",
      model: "",
      category: "",
      pricePerDay: "",
      seating_capacity: "",
      transmission: "Manual",
      image: "",
      isAvailable: true
    });
    setFormErrors({});
    setShowAddEditModal(true);
  };

  const openEditModal = (car) => {
    setIsEditMode(true);
    setFormData(car);
    setFormErrors({});
    setShowAddEditModal(true);
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.brand.trim()) errors.brand = "Brand is required";
    if (!formData.model.trim()) errors.model = "Model is required";
    if (!formData.category) errors.category = "Category is required";
    if (!formData.pricePerDay || formData.pricePerDay <= 0) errors.pricePerDay = "Valid price is required";
    if (!formData.seating_capacity || formData.seating_capacity <= 0) errors.seating_capacity = "Valid seating capacity is required";
    if (!formData.image.trim()) errors.image = "Image URL is required";
    else if (!formData.image.match(/^https?:\/\/.+/)) errors.image = "Valid URL is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      showToast("Please fix the errors in the form!", "error");
      return;
    }
    
    if (isEditMode) {
      setCars(prev =>
        prev.map(car => car.id === formData.id ? formData : car)
      );
      showToast("Car updated successfully!");
    } else {
      const newCar = {
        ...formData,
        id: Date.now(),
        pricePerDay: Number(formData.pricePerDay),
        seating_capacity: Number(formData.seating_capacity)
      };
      setCars(prev => [...prev, newCar]);
      showToast("Car added successfully!");
    }
    
    setShowAddEditModal(false);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setAvailabilityFilter("all");
    setSortBy("name");
    showToast("Filters reset!");
  };

  const resetToDefaults = async () => {
    if (window.confirm("Are you sure you want to reset all data to defaults?")) {
      setCars(dummyCarData);
      setFilteredCars(dummyCarData);
      await storage.set('manage-cars-data', JSON.stringify(dummyCarData));
      showToast("Data reset to defaults!");
    }
  };

  const categories = ["all", ...new Set(cars.map(car => car.category))];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* SIDEBAR */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-2 p-6 border-b border-gray-200">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">CarRental</span>
          </div>

          {/* User Profile */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                A
              </div>
              <div>
                <p className="font-semibold text-gray-800">Akshat</p>
                <p className="text-sm text-gray-500">Admin</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <Plus className="w-5 h-5" />
              <span>Add car</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg">
              <Car className="w-5 h-5" />
              <span className="font-medium">Manage Cars</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <Calendar className="w-5 h-5" />
              <span>Manage Bookings</span>
            </a>
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex-1 lg:flex-none">
              <h2 className="text-xl font-semibold text-gray-800">Manage Cars</h2>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <span className="text-gray-600">Welcome, Akshat</span>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* STATS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
              <p className="text-sm opacity-90 mb-1">Total Cars</p>
              <p className="text-3xl font-bold">{cars.length}</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
              <p className="text-sm opacity-90 mb-1">Available</p>
              <p className="text-3xl font-bold">
                {cars.filter(car => car.isAvailable).length}
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
              <p className="text-sm opacity-90 mb-1">Unavailable</p>
              <p className="text-3xl font-bold">
                {cars.filter(car => !car.isAvailable).length}
              </p>
            </div>
          </div>

          {/* CONTROLS BAR */}
          <div className="bg-white rounded-xl p-4 shadow-md mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search cars by name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              
              <div className="flex gap-3 w-full md:w-auto">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-4 py-2.5 border rounded-lg flex items-center gap-2 transition-colors ${
                    showFilters ? "bg-blue-50 border-blue-500 text-blue-700" : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
                
                <button
                  onClick={openAddModal}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-md"
                >
                  <Plus className="w-5 h-5" />
                  Add Car
                </button>
              </div>
            </div>

            {/* FILTER PANEL */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat === "all" ? "All Categories" : cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                  <select
                    value={availabilityFilter}
                    onChange={(e) => setAvailabilityFilter(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="all">All Cars</option>
                    <option value="available">Available Only</option>
                    <option value="unavailable">Unavailable Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={resetFilters}
                    className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RESULTS COUNT */}
          {(searchQuery || categoryFilter !== "all" || availabilityFilter !== "all") && (
            <div className="mb-4 text-sm text-gray-600">
              Showing {filteredCars.length} of {cars.length} cars
            </div>
          )}

          {/* CARS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
            {filteredCars.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <p className="text-gray-500 text-lg mb-2">No cars found</p>
                <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
              </div>
            ) : (
              filteredCars.map((car) => (
                <div
                  key={car.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400";
                      }}
                    />
                    <span
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
                        car.isAvailable
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {car.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {car.brand} {car.model}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {car.category} · {car.seating_capacity} Seats · {car.transmission}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-gray-800">
                          {currency}{car.pricePerDay}
                        </span>
                        <span className="text-gray-500 text-sm">/day</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleCarAvailability(car.id)}
                        className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                        title={car.isAvailable ? "Mark as Unavailable" : "Mark as Available"}
                      >
                        {car.isAvailable ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => openEditModal(car)}
                        className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                        title="Edit car"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCar(car)}
                        className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                        title="Delete car"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* ADD/EDIT MODAL */}
      {showAddEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-800">
                {isEditMode ? "Edit Car" : "Add New Car"}
              </h3>
              <button
                onClick={() => setShowAddEditModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {formData.image && (
                <div className="mb-4">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400";
                    }}
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                      formErrors.brand ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="e.g., Toyota"
                  />
                  {formErrors.brand && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.brand}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Model <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => setFormData({...formData, model: e.target.value})}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                      formErrors.model ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="e.g., Fortuner"
                  />
                  {formErrors.model && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.model}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                      formErrors.category ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select category</option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                  {formErrors.category && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.category}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price/Day ({currency}) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.pricePerDay}
                    onChange={(e) => setFormData({...formData, pricePerDay: e.target.value})}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                      formErrors.pricePerDay ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="60"
                    min="1"
                  />
                  {formErrors.pricePerDay && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.pricePerDay}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seating Capacity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.seating_capacity}
                    onChange={(e) => setFormData({...formData, seating_capacity: e.target.value})}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                      formErrors.seating_capacity ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="5"
                    min="1"
                  />
                  {formErrors.seating_capacity && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.seating_capacity}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transmission <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.transmission}
                    onChange={(e) => setFormData({...formData, transmission: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                    formErrors.image ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="https://example.com/car-image.jpg"
                />
                {formErrors.image && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.image}</p>
                )}
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  id="isAvailable"
                  checked={formData.isAvailable}
                  onChange={(e) => setFormData({...formData, isAvailable: e.target.checked})}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="isAvailable" className="text-sm font-medium text-gray-700">
                  Mark as available for booking
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddEditModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  {isEditMode ? "Update Car" : "Add Car"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Delete Car</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <span className="font-semibold">{selectedCar?.brand} {selectedCar?.model}</span>? This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedCar(null);
                }}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className={`px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}>
            <Check className="w-5 h-4" />
            <p className="font-medium">{toast.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCars;