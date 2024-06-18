import React from 'react';
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';

function BarChartDashboard({ budgetList }) {
  const processedData = preprocessData(budgetList);

  return (
    <div className='border rounded-lg p-5'>
      <h2 className='font-bold text-lg'>Tổng quan</h2>
      <ResponsiveContainer width={'80%'} height={300}>
        <BarChart barGap={-30} data={processedData} margin={{ top: 7, left: 60}}>
          <XAxis dataKey='name' xAxisId={0} />
          <XAxis dataKey='name' xAxisId={1} hide />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip formatter={(value) => `${parseFloat(value).toLocaleString()} VND`}/>
          <Legend />
          <Bar dataKey='amount' xAxisId={1} barSize={40}  name={'Budget'} fill='#BBA1ED' fillOpacity={0.9}/>
          <Bar dataKey='adjustedSpend' xAxisId={0} barSize={30}  name={'Đã Chi'} fill='#4845d2' fillOpacity={0.7} />
          {/* <Bar dataKey='excessSpend' stackId="a" barSize={40} fill='#FF0000' /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Preprocess the data
const preprocessData = (budgetList) => {
  return budgetList.map(item => {
    const excessSpend = item.totalSpend > item.amount ? item.totalSpend - item.amount : 0;
    return {
      ...item,
      excessSpend,
      adjustedSpend: item.totalSpend,
    };
  });
};

export default BarChartDashboard;
