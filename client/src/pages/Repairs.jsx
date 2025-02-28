import React, { useState, useEffect } from "react";
import {
  fetchRepairs,
  addRepair,
  deleteRepair,
  fetchComponents,
} from "../services/api";
import { fetchVehicles } from "../services/api"; // To get the list of vehicles
import FinalPrice from "../components/FinalPrice";
import SimulatePayment from "../components/SimulatePayment";

const Repairs = () => {
  const [repairs, setRepairs] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [components, setComponents] = useState([]);
  const [repairsUpdated, setRepairsUpdated] = useState(0);

  const [newRepair, setNewRepair] = useState({
    component_id: "",
    repair_type: "",
    labor_cost: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadVehicles();
    loadComponents();
  }, []);

  const loadVehicles = async () => {
    try {
      const response = await fetchVehicles();
      setVehicles(response.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  const loadComponents = async () => {
    try {
      const response = await fetchComponents();
      setComponents(response.data);
    } catch (error) {
      console.error("Error fetching components:", error);
    }
  };

  const loadRepairs = async (vehicleId) => {
    setLoading(true);
    try {
      const response = await fetchRepairs(vehicleId);
      setRepairs(response.data);
    } catch (error) {
      console.error("Error fetching repairs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRepair = async () => {
    if (
      !selectedVehicleId ||
      !newRepair.component_id ||
      !newRepair.repair_type ||
      !newRepair.labor_cost
    ) {
      alert("Please fill out all fields.");
      return;
    }
    try {
      await addRepair({
        vehicle_id: selectedVehicleId,
        ...newRepair,
      });
      setNewRepair({ component_id: "", repair_type: "", labor_cost: "" });
      loadRepairs(selectedVehicleId);
      setRepairsUpdated((prev) => prev + 1);
    } catch (error) {
      console.error("Error adding repair:", error);
    }
  };

  const handleDeleteRepair = async (id) => {
    try {
      await deleteRepair(id);
      loadRepairs(selectedVehicleId);
      setRepairsUpdated((prev) => prev + 1);
    } catch (error) {
      console.error("Error deleting repair:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Repair Management</h1>

      {/* Select Vehicle */}
<div style={styles.form}>
  <h2>Select Vehicle</h2>
  <select
    value={selectedVehicleId}
    onChange={(e) => {
      setSelectedVehicleId(e.target.value);
      loadRepairs(e.target.value);
    }}
    style={styles.select}
  >
    <option value="">Select a Vehicle</option>
    
    {/* Static Vehicle Categories */}
    <option value="two_wheeler_without_gear">Two Wheeler Without Gear</option>
    <option value="two_wheeler_with_gear">Two Wheeler With Gear</option>
    <option value="three_wheeler_without_gear">Three Wheeler Without Gear</option>
    <option value="three_wheeler_with_gear">Three Wheeler With Gear</option>
    <option value="four_wheeler_without_gear">Four Wheeler Without Gear</option>
    <option value="four_wheeler_with_gear">Four Wheeler With Gear</option>

    {/* Dynamically Fetched Vehicles */}
    {vehicles.map((vehicle) => (
      <option key={vehicle.id} value={vehicle.id}>
        {vehicle.make} {vehicle.model} ({vehicle.licensePlate})
      </option>
    ))}
  </select>
</div>

      {/* Add New Repair */}
      {selectedVehicleId && (
        <div style={styles.form}>
          <h2>Add Repair</h2>
          <select
            value={newRepair.component_id}
            onChange={(e) =>
              setNewRepair({ ...newRepair, component_id: e.target.value })
            }
            style={styles.select}
          >
            <option value="">-- Select Component --</option>
            {/* Static Components */}
  <option value="batteries">Batteries</option>
  <option value="alternators">Alternators</option>
  <option value="timing-belts">Timing Belts</option>
  <option value="fuel-pumps">Fuel Pumps</option>
  <option value="brake-pads">Brake Pads</option>
  <option value="shock-absorbers">Shock Absorbers</option>
  <option value="tires">Tires</option>
  <option value="wipers">Wipers</option>
  <option value="air-filters">Air Filters</option>
  <option value="oil-filters">Oil Filters</option>
  <option value="headlights">Headlights</option>
  <option value="spark-plugs">Spark Plugs</option>

  {/* Dynamically Fetched Components */}
  {components.map((component) => (
    <option key={component.id} value={component.id}>
      {component.name}
    </option>
  ))}
</select>
          <select
            value={newRepair.repair_type}
            onChange={(e) =>
              setNewRepair({ ...newRepair, repair_type: e.target.value })
            }
            style={styles.select}
          >
            <option value="">-- Repair Type --</option>
            <option value="new">New</option>
            <option value="repair">Repair</option>
          </select>
          <input
            type="number"
            placeholder="Labor Cost"
            value={newRepair.labor_cost}
            onChange={(e) =>
              setNewRepair({ ...newRepair, labor_cost: e.target.value })
            }
            style={styles.input}
          />
          <button onClick={handleAddRepair} style={styles.button}>
            Add Repair
          </button>
        </div>
      )}

      {/* List of Repairs */}
      <div style={styles.list}>
        <h2>All Repairs</h2>
        {loading ? (
          <p>Loading...</p>
        ) : repairs.length > 0 ? (
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th>Component ID</th>
                <th>Repair Type</th>
                <th>Labor Cost</th>
                <th>Total Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {repairs.map((repair) => (
                <tr key={repair.id} style={styles.tableCell}>
                  <td>{repair.component_name}</td>
                  <td>{repair.repair_type}</td>
                  <td>{repair.labor_cost}</td>
                  <td>{repair.total_price}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteRepair(repair.id)}
                      style={styles.buttonDelete}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No repairs found for the selected vehicle.</p>
        )}
      </div>
      {/* Add Final Price and Simulate Payment */}
      {selectedVehicleId && (
        <div style={styles.feeCalc}>
          <FinalPrice
            vehicleId={selectedVehicleId}
            repairsUpdated={repairsUpdated}
          />
          <SimulatePayment
            vehicleId={selectedVehicleId}
            repairsUpdated={repairsUpdated}
            onPaymentSuccess={() => {
              // Refresh repairs or update UI
              alert("Payment successful!");
            }}
          />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    backgroundColor:"skyblue",
  },
  form: {
    marginBottom: "2rem",
  },
  input: {
    marginRight: "1rem",
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  select: {
    marginRight: "1rem",
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  buttonDelete: {
    padding: "0.5rem 1rem",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },

  list: {
    marginTop: "2rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center",
  },
  tableHeader: {
    backgroundColor: "#c7c4c4",
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  tableCell: {
    border: "1px solid #ddd",
    padding: "0.5rem",
  },
  feeCalc: {
    marginTop: "2rem",
    display: "flex",
    gap: "1rem",
    flexDirection: "column",
  },
};

export default Repairs;
