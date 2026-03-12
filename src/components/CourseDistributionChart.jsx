import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C'];

const CourseDistributionChart = ({ data }) => {
  if (!data || !data.data || data.data.length === 0) {
    return <p>No distribution data available</p>;
  }

  const chartData = data.data.map((item) => ({
    name: item.course_name || item.department || item.label,
    value: item.total,
  }));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="42%"
          labelLine={false}
          label={false}
          innerRadius={44}
          outerRadius={72}
          paddingAngle={2}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [`${value}`, name]} />
        <Legend
          verticalAlign="bottom"
          align="center"
          iconType="circle"
          wrapperStyle={{ fontSize: '12px', lineHeight: '18px', paddingTop: '8px' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CourseDistributionChart;
