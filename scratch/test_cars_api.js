const testAPI = async () => {
  try {
    const res = await fetch("https://car-rental-6nge.onrender.com/api/user/cars");
    const data = await res.json();
    console.log("Success:", data.success);
    console.log("Cars length:", data.cars?.length);
    console.log("Cars:", data.cars);
  } catch (error) {
    console.error("API error:", error);
  }
};

testAPI();
