import React, { useState, useEffect } from "react";
import {
  fetchDailyRevenue,
  fetchMonthlyRevenue,
  fetchYearlyRevenue,
} from "../services/api";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Revenue = () => {
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [yearlyRevenue, setYearlyRevenue] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRevenueData();
  }, []);

  const loadRevenueData = async () => {
    setLoading(true);
    try {
      const [dailyRes, monthlyRes, yearlyRes] = await Promise.all([
        fetchDailyRevenue(),
        fetchMonthlyRevenue(),
        fetchYearlyRevenue(),
      ]);

      setDailyRevenue(dailyRes.data);
      setMonthlyRevenue(monthlyRes.data);
      setYearlyRevenue(yearlyRes.data);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Revenue Visualization</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Daily Revenue */}
          <div style={styles.chartContainer}>
            <h2>Daily Revenue</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyRevenue}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="daily_revenue"
                  stroke="#8884d8"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Revenue */}
          <div style={styles.chartContainer}>
            <h2>Monthly Revenue</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenue}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="monthly_revenue"
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Yearly Revenue */}
          <div style={styles.chartContainer}>
            <h2>Yearly Revenue</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={yearlyRevenue}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="yearly_revenue"
                  stroke="red"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "'Courier New', monospace",
    
  },
  chartContainer: {
    marginBottom: "2rem",
    
  },
};

export default Revenue;
