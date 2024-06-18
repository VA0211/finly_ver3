import React from 'react'
import BudgetList from './_components/BudgetList'

export const metadata = {
  title: 'Finly - Budget',
  description: 'Finly - Budget',
}

function Budget() {
  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl'>Budgets</h2>
      <BudgetList/>
    </div>
  )
}

export default Budget