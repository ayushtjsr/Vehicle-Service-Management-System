import React, { useState, useEffect } from "react";
import {
  fetchVehicles,
  addVehicle,
  updateVehicleStatus,
  deleteVehicle,
} from "../services/api";
import { toast } from "react-toastify";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    vehicle_id: "",
    owner_name: "",
    issue_description: "",
  });
  const [loading, setLoading] = useState(false);

  // Load vehicles on page load
  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    setLoading(true);
    try {
      const response = await fetchVehicles();
      setVehicles(response.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (
      !newVehicle.vehicle_id ||
      !newVehicle.owner_name ||
      !newVehicle.issue_description
    ) {
      alert("Please fill out all fields.");
      return;
    }
    try {
      await addVehicle(newVehicle);
      setNewVehicle({ vehicle_id: "", owner_name: "", issue_description: "" });
      toast.success("Vehicle added successfully!");
      loadVehicles();
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await updateVehicleStatus(id, { status: newStatus });
      toast.success("Vehicle status updated successfully!");
      loadVehicles();
    } catch (error) {
      console.error("Error updating vehicle status:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteVehicle(id);
      toast.success("Vehicle deleted successfully!");
      loadVehicles();
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Vehicle Management</h1>

      {/* Add New Vehicle */}
      <div style={styles.form}>
        <h2>Add Vehicle</h2>
        <input
          type="text"
          placeholder="Vehicle ID"
          value={newVehicle.vehicle_id}
          onChange={(e) =>
            setNewVehicle({ ...newVehicle, vehicle_id: e.target.value })
          }
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Owner Name"
          value={newVehicle.owner_name}
          onChange={(e) =>
            setNewVehicle({ ...newVehicle, owner_name: e.target.value })
          }
          style={styles.input}
        />
        <textarea
          placeholder="Issue Description"
          value={newVehicle.issue_description}
          onChange={(e) =>
            setNewVehicle({ ...newVehicle, issue_description: e.target.value })
          }
          style={{ ...styles.input, height: "40px",  display: "flex"}}
        />
        <button onClick={handleAdd} style={styles.button}>
          Add Vehicle
        </button>
      </div>

      {/* List of Vehicles */}
      <div style={styles.list}>
        <h2>All Vehicles</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th>Vehicle ID</th>
                <th>Owner Name</th>
                <th>Issue Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} style={styles.tableCell}>
                  <td>{vehicle.vehicle_id}</td>
                  <td>{vehicle.owner_name}</td>
                  <td>{vehicle.issue_description}</td>
                  <td>{vehicle.status}</td>
                  <td>
                    <select
                      value={vehicle.status}
                      onChange={(e) =>
                        handleUpdateStatus(vehicle.id, e.target.value)
                      }
                      style={styles.select}
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                    <button
                      onClick={() => handleDelete(vehicle.id)}
                      style={styles.buttonDelete}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    backgroundColor:"#D2691E",
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
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "lime",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "0.5rem",
  },
  buttonDelete: {
    padding: "0.5rem 1rem",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  select: {
    marginRight: "1rem",
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
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
    backgroundColor: "red",
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  tableCell: {
    border: "1px solid #ddd",
    padding: "0.5rem",
  },
};

export default Vehicles;
