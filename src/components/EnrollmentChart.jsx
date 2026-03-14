import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EnrollmentChart = ({ data }) => {
  console.log('EnrollmentChart received data:', data);

  if (!data) {
    return <p>No data provided to enrollment chart</p>;
  }

  // Handle both { data: [...] } and direct array formats
  const chartData = Array.isArray(data) ? data : (data.data || data);

  if (!Array.isArray(chartData) || chartData.length === 0) {
    return <p>No enrollment data available</p>;
  }

  // Normalize data to match expected format (month/date as label, total/value as number)
  const normalizedData = chartData.map((item) => {
    // Handle various possible field names from API
    const label = item.month || item.date || item.label || item.period || Object.keys(item)[0];
    const value = item.total || item.count || item.value || item.enrollments || (typeof item === 'object' ? Object.values(item)[1] : item);
    
    return {
      month: label,
      total: typeof value === 'number' ? value : 0,
      ...item // Preserve all original fields
    };
  });

  console.log('Normalized enrollment data:', normalizedData);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={normalizedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#8884d8" name="New Enrollments" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EnrollmentChart;
