import React, { useEffect, useState } from "react";
import {
  fetchComponents,
  addComponent,
  updateComponent,
  deleteComponent,
} from "../services/api";
import { toast } from "react-toastify";

const Componenets = () => {
  const [components, setComponents] = useState([]);
  const [newComponent, setNewComponent] = useState({
    name: "",
    type: "",
    price: "",
  });
  const [editComponent, setEditComponent] = useState(null); // For editing existing component
  const [loading, setLoading] = useState(false);

  // Fetch components on page load
  useEffect(() => {
    loadComponents();
  }, []);

  const loadComponents = async () => {
    setLoading(true);
    try {
      const response = await fetchComponents();
      setComponents(response.data);
    } catch (error) {
      console.error("Error fetching components:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!newComponent.name || !newComponent.type || !newComponent.price) {
      alert("Please fill out all fields.");
      return;
    }
    try {
      await addComponent(newComponent);
      setNewComponent({ name: "", type: "", price: "" });
      toast.success("Component added successfully!");
      loadComponents();
    } catch (error) {
      console.error("Error adding component:", error);
    }
  };

  const handleUpdate = async (id) => {
    if (!editComponent.name || !editComponent.type || !editComponent.price) {
      alert("Please fill out all fields.");
      return;
    }
    try {
      await updateComponent(id, editComponent);
      setEditComponent(null);
      toast.success("Component updated successfully!");
      loadComponents();
    } catch (error) {
      console.error("Error updating component:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteComponent(id);
      loadComponents();
      toast.success("Component deleted successfully!");
    } catch (error) {
      console.error("Error deleting component:", error);
    }
  };

  return (
    <div style={{ ...styles.container, fontFamily: "'Courier New', monospace",color: 'white'}}>
      <h1>Component Management</h1>

      {/* Add New Component */}
      <div style={styles.form}>
        <h2>Add Component</h2>
        <input
          type="text"
          placeholder="Name"
          value={newComponent.name}
          onChange={(e) =>
            setNewComponent({ ...newComponent, name: e.target.value })
          }
          style={styles.input}
        />
        <select
          value={newComponent.type}
          onChange={(e) =>
            setNewComponent({ ...newComponent, type: e.target.value })
          }
          style={styles.input}
        >
          <option value="">Type</option>
          <option value="repair">Repair</option>
          <option value="purchase">Purchase</option>
        </select>
        <input
          type="number"
          placeholder="Price"
          value={newComponent.price}
          onChange={(e) =>
            setNewComponent({ ...newComponent, price: e.target.value })
          }
          style={styles.input}
        />
        <button onClick={handleAdd} style={styles.button}>
          Add Component
        </button>
      </div>

      {/* List Components */}
      <div style={styles.list}>
        <h2>All Components</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {components.map((component) => (
                <tr key={component.id} style={styles.tableCell}>
                  <td>
                    {editComponent?.id === component.id ? (
                      <input
                        type="text"
                        value={editComponent.name}
                        onChange={(e) =>
                          setEditComponent({
                            ...editComponent,
                            name: e.target.value,
                          })
                        }
                        style={styles.input}
                      />
                    ) : (
                      component.name
                    )}
                  </td>
                  <td>
                    {editComponent?.id === component.id ? (
                      <select
                        value={editComponent.type}
                        onChange={(e) =>
                          setEditComponent({
                            ...editComponent,
                            type: e.target.value,
                          })
                        }
                        style={styles.input}
                      >
                        <option value="repair">Repair</option>
                        <option value="purchase">Purchase</option>
                      </select>
                    ) : (
                      component.type
                    )}
                  </td>
                  <td>
                    {editComponent?.id === component.id ? (
                      <input
                        type="number"
                        value={editComponent.price}
                        onChange={(e) =>
                          setEditComponent({
                            ...editComponent,
                            price: e.target.value,
                          })
                        }
                        style={styles.input}
                      />
                    ) : (
                      component.price
                    )}
                  </td>
                  <td>
                    {editComponent?.id === component.id ? (
                      <button
                        onClick={() => handleUpdate(component.id)}
                        style={styles.button}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditComponent(component)}
                        style={styles.button}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(component.id)}
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
    backgroundColor: "#008B8B",
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
    backgroundColor: "#007bff",
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
};

export default Componenets;
