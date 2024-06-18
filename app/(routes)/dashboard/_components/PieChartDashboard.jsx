import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis,
         PieChart, Pie, Sector, Cell
        } from 'recharts'

function PieChartDashboard({incomeList}) {
  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  return (
    <div className='border rounded-lg p-5'>
        <h2 className='font-bold text-lg'>Tổng quan</h2>
        <ResponsiveContainer width={'80%'} height={300}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          
          <Tooltip/>
          <Legend/>
          </PieChart>
        </ResponsiveContainer>
    </div>
  )
}

export default PieChartDashboard