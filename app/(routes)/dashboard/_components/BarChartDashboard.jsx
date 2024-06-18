import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartDashboard({budgetList}) {
  return (
    <div className='border rounded-lg p-5'>
        <h2 className='font-bold text-lg'>Tổng quan</h2>
        <ResponsiveContainer width={'80%'} height={300}>
          <BarChart data={budgetList}
          margin={{top:7, left:60}}>
              <XAxis dataKey='name'/>
              <YAxis/>
              <Tooltip/>
              <Legend/>
              <Bar dataKey='totalSpend' stackId="a" name={'Chi Tiêu'} fill='#4845d2'/>
              <Bar dataKey='amount' stackId="a" name={'Budget'} fill='#C2C3FF'/>
          </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default BarChartDashboard