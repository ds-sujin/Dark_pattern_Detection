// Donut.jsx
import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import './DonutChart.css';

const Donut = ({ value = 0, label = '' }) => {
  const data = [
    { name: '확률', value: value },
    { name: '나머지', value: 1 - value },
  ];

  const COLORS = ['#0BBBC5', '#e8f8f9']; // 강조색 + 배경 대조색

  return (
    <div className="donut-chart">
      <PieChart width={220} height={220}>
        <Pie
          data={data}
          cx={105}
          cy={110}
          innerRadius={70}
          outerRadius={90}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
          cornerRadius={2} // ⭕

        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <div className="donut-center">
        <div className="percent">{Math.round(value * 100)}%</div>
        <div className="label">{label}</div>
      </div>
    </div>
  );
};

export default Donut;