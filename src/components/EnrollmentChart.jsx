import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EnrollmentChart = ({ data }) => {
  if (!data || !data.data || data.data.length === 0) {
    return <p>No enrollment data available</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data.data}>
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
