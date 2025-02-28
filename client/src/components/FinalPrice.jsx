import React, { useState, useEffect } from "react";
import { calculatePrice } from "../services/api";

const FinalPrice = ({ vehicleId, repairsUpdated }) => {
  const [totalCost, setTotalCost] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (vehicleId) {
      fetchFinalPrice(vehicleId);
    }
  }, [vehicleId, repairsUpdated]);

  const fetchFinalPrice = async (id) => {
    setLoading(true);
    try {
      const response = await calculatePrice(id);
      setTotalCost(response.data.total_cost);
    } catch (error) {
      console.error("Error calculating final price:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Calculating...</p>
      ) : (
        <p>
          <strong>Total Cost:</strong> ${totalCost || "N/A"}
        </p>
      )}
    </div>
  );
};

export default FinalPrice;
