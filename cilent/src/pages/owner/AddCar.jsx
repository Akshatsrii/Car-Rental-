import React, { useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/owner/Title";

const AddCar = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    dailyPrice: "",
    category: "",
    transmission: "",
    fuelType: "",
    seatingCapacity: "",
    location: "",
    description: "",
  });

  const categoryOptions = ["Sedan", "SUV", "Hatchback", "Coupe", "Convertible", "Van", "Truck", "Luxury"];
  const transmissionOptions = ["Automatic", "Manual", "Semi-Automatic"];
  const fuelTypeOptions = ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"];

  const validateForm = () => {
    const newErrors = {};
    const currentYear = new Date().getFullYear();

    if (!image) {
      newErrors.image = "Please upload a car image";
    }

    if (formData.year < 1900 || formData.year > currentYear + 1) {
      newErrors.year = `Year must be between 1900 and ${currentYear + 1}`;
    }

    if (formData.dailyPrice <= 0) {
      newErrors.dailyPrice = "Daily price must be greater than 0";
    }

    if (formData.seatingCapacity < 1 || formData.seatingCapacity > 50) {
      newErrors.seatingCapacity = "Seating capacity must be between 1 and 50";
    }

    if (formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, image: "Please upload an image file" }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: "Image size must be less than 5MB" }));
        return;
      }

      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus({ type: "error", message: "Please fix the errors before submitting" });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      console.log("Form Data:", formData);
      console.log("Image:", image);

      setSubmitStatus({ 
        type: "success", 
        message: "Car added successfully! Redirecting..." 
      });

      // Reset form after successful submission
      setTimeout(() => {
        resetForm();
      }, 2000);

    } catch (Error) {
      setSubmitStatus({ 
        type: "error", 
        message: "Failed to add car. Please try again." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      brand: "",
      model: "",
      year: "",
      dailyPrice: "",
      category: "",
      transmission: "",
      fuelType: "",
      seatingCapacity: "",
      location: "",
      description: "",
    });
    setImage(null);
    setImagePreview(null);
    setErrors({});
    setSubmitStatus(null);
  };

  return (
    <div className="ml-0 md:ml-64 lg:ml-72 px-4 pt-10 md:px-10 min-h-screen bg-gray-50">
      <div className="max-w-6xl">
        {/* TITLE */}
        <Title
          title="Add New Car"
          subTitle="Fill in details to list your car for booking, including pricing, availability, and car specifications."
        />

        {/* STATUS MESSAGE */}
        {submitStatus && (
          <div
            className={`mt-6 p-4 rounded-md border ${
              submitStatus.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            <div className="flex items-center gap-2">
              {submitStatus.type === "success" ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              <p className="text-sm font-medium">{submitStatus.message}</p>
            </div>
          </div>
        )}

        <form
          onSubmit={onSubmitHandler}
          className="mt-8 bg-white border border-gray-200 rounded-lg shadow-sm p-6 md:p-8"
        >
          {/* IMAGE UPLOAD */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Car Image *
            </label>
            <label
              htmlFor="image"
              className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
                errors.image ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
            >
              {imagePreview ? (
                <div className="relative w-full h-full p-2">
                  <img
                    src={imagePreview}
                    alt="Car preview"
                    className="w-full h-full object-contain rounded"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setImage(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <img
                    src={assets.uploadIcon}
                    alt="Upload"
                    className="w-12 h-12 mb-3 opacity-40"
                  />
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 5MB)</p>
                </div>
              )}
              <input
                type="file"
                id="image"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
            {errors.image && (
              <p className="mt-2 text-sm text-red-600">{errors.image}</p>
            )}
          </div>

          {/* FORM GRID - 2 COLUMNS */}
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            {/* Brand */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand *
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={onChangeHandler}
                placeholder="e.g., Toyota"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                required
              />
            </div>

            {/* Model */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Model *
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={onChangeHandler}
                placeholder="e.g., Camry"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                required
              />
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year *
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={onChangeHandler}
                placeholder={new Date().getFullYear().toString()}
                min="1900"
                max={new Date().getFullYear() + 1}
                className={`w-full px-4 py-2.5 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm ${
                  errors.year ? "border-red-300" : "border-gray-300"
                }`}
                required
              />
              {errors.year && (
                <p className="mt-1 text-xs text-red-600">{errors.year}</p>
              )}
            </div>

            {/* Daily Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Price ($) *
              </label>
              <input
                type="number"
                name="dailyPrice"
                value={formData.dailyPrice}
                onChange={onChangeHandler}
                placeholder="e.g., 50"
                min="1"
                step="0.01"
                className={`w-full px-4 py-2.5 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm ${
                  errors.dailyPrice ? "border-red-300" : "border-gray-300"
                }`}
                required
              />
              {errors.dailyPrice && (
                <p className="mt-1 text-xs text-red-600">{errors.dailyPrice}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={onChangeHandler}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm bg-white"
                required
              >
                <option value="">Select category</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transmission *
              </label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={onChangeHandler}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm bg-white"
                required
              >
                <option value="">Select transmission</option>
                {transmissionOptions.map((trans) => (
                  <option key={trans} value={trans}>
                    {trans}
                  </option>
                ))}
              </select>
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fuel Type *
              </label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={onChangeHandler}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm bg-white"
                required
              >
                <option value="">Select fuel type</option>
                {fuelTypeOptions.map((fuel) => (
                  <option key={fuel} value={fuel}>
                    {fuel}
                  </option>
                ))}
              </select>
            </div>

            {/* Seating Capacity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seating Capacity *
              </label>
              <input
                type="number"
                name="seatingCapacity"
                value={formData.seatingCapacity}
                onChange={onChangeHandler}
                placeholder="e.g., 5"
                min="1"
                max="50"
                className={`w-full px-4 py-2.5 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm ${
                  errors.seatingCapacity ? "border-red-300" : "border-gray-300"
                }`}
                required
              />
              {errors.seatingCapacity && (
                <p className="mt-1 text-xs text-red-600">{errors.seatingCapacity}</p>
              )}
            </div>

            {/* Location */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={onChangeHandler}
                placeholder="e.g., New York, NY"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                required
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onChangeHandler}
              placeholder="Describe your car's features, condition, any additional amenities, and availability details..."
              rows="5"
              className={`w-full px-4 py-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm resize-none ${
                errors.description ? "border-red-300" : "border-gray-300"
              }`}
              required
            ></textarea>
            <div className="flex justify-between items-center mt-2">
              {errors.description ? (
                <p className="text-xs text-red-600">{errors.description}</p>
              ) : (
                <div></div>
              )}
              <p className="text-xs text-gray-500">
                {formData.description.length} characters (minimum 20)
              </p>
            </div>
          </div>

          {/* SUBMIT BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-10 py-3 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding Car...
                </>
              ) : (
                "Add Car"
              )}
            </button>

            <button
              type="button"
              onClick={resetForm}
              disabled={isSubmitting}
              className="px-10 py-3 border border-gray-300 bg-white text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCar;