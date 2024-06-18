import React from 'react'
import IncomeList from './_components/IncomeList'

export const metadata = {
  title: 'Finly - Thu Nhập',
  description: 'Finly - Thu Nhập',
}

function IncomesPage() {
  return (
    <div className='p-8'>
        <IncomeList/>
    </div>
  )
}

export default IncomesPage