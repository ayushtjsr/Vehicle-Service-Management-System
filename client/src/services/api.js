import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; // Backend URL

// COMPONENTS MANAGEMENT
// Fetch all components
export const fetchComponents = async () => {
  return await axios.get(`${API_BASE_URL}/api/components/list-components`);
};

// Add a new component
export const addComponent = async (data) => {
  return await axios.post(
    `${API_BASE_URL}/api/components/register-component/`,
    data
  );
};

// Update an existing component
export const updateComponent = async (component_id, data) => {
  return await axios.patch(
    `${API_BASE_URL}/api/components/update-component/?component_id=${component_id}`,
    data
  );
};

// Delete a component
export const deleteComponent = async (component_id) => {
  return await axios.delete(
    `${API_BASE_URL}/api/components/delete-component/?component_id=${component_id}`
  );
};

// VEHICLES MANAGEMENT
// Fetch all vehicles
export const fetchVehicles = async () => {
  return await axios.get(`${API_BASE_URL}/api/vehicles/list/`);
};

// Add a new vehicle
export const addVehicle = async (data) => {
  return await axios.post(`${API_BASE_URL}/api/vehicles/add/`, data);
};

// Update vehicle status
export const updateVehicleStatus = async (vehicle_id, data) => {
  return await axios.put(
    `${API_BASE_URL}/api/vehicles/update-status/?vehicle_id=${vehicle_id}`,
    data
  );
};

// Delete a vehicle
export const deleteVehicle = async (vehicle_id) => {
  return await axios.delete(
    `${API_BASE_URL}/api/vehicles/delete/?vehicle_id=${vehicle_id}`
  );
};

// REPAIR MANAGEMENT
// Fetch all repairs for a specific vehicle
export const fetchRepairs = async (vehicleId) => {
  return await axios.get(`${API_BASE_URL}/api/repairs/list-issues`, {
    params: { vehicle_id: vehicleId },
  });
};

// Add a new repair
export const addRepair = async (data) => {
  return await axios.post(`${API_BASE_URL}/api/repairs/add-issue/`, data);
};

// Delete a repair
export const deleteRepair = async (id) => {
  return await axios.delete(
    `${API_BASE_URL}/api/repairs/delete-issue/?repair_id=${id}`
  );
};

// VISULIZATION MANAGEMENT
// Fetch daily revenue
export const fetchDailyRevenue = async () => {
  return await axios.get(`${API_BASE_URL}/api/revenues/daily/`);
};

// Fetch monthly revenue
export const fetchMonthlyRevenue = async () => {
  return await axios.get(`${API_BASE_URL}/api/revenues/monthly/`);
};

// Fetch yearly revenue
export const fetchYearlyRevenue = async () => {
  return await axios.get(`${API_BASE_URL}/api/revenues/yearly/`);
};

//PAYMENT MODULE
// Calculate total price for repairs of a specific vehicle
export const calculatePrice = async (vehicleId) => {
  return await axios.get(
    `${API_BASE_URL}/api/payments/calculate-price?vehicle_id=${vehicleId}`
  );
};

// Simulate a payment for a repair
export const simulatePayment = async (data) => {
  return await axios.post(
    `${API_BASE_URL}/api/payments/simulate-payment/`,
    data
  );
};
