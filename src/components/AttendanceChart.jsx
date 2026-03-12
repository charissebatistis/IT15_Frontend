import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AttendanceChart = ({ data }) => {
  if (!data || !data.data || data.data.length === 0) {
    return <p>No attendance data available</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="percentage" 
          stroke="#82ca9d" 
          name="Attendance %" 
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AttendanceChart;
