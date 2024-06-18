import Link from 'next/link'
import React from 'react'

function BudgetItem({ budget }) {
    const calculateProgressPerc = () => {
        const perc = (budget.totalSpend / budget.amount) * 100;
        return perc.toFixed(2);
    }
    return (
        <Link href={'/dashboard/expenses/' + budget?.id}>
            <div className='p-5 border rounded-lg hover:shadow-md cursor-pointer h-[170px]'>
                <div className='flex gap-2 items-center justify-between'>
                    <div className='flex gap-2 items-center'>
                        <h2 className='text-2xl p-3 px-4 bg-slate-100 rounded-full'>
                            {budget?.icon}
                        </h2>
                        <div>
                            <h2 className='font-bold'>{budget.name}</h2>
                            <h2 className='text-sm text-gray-500'>{budget.totalItem} Khoản Chi</h2>
                        </div>
                    </div>
                    <h2 className='font-bold text-primary text-lg'>
                        {parseFloat(budget.amount).toLocaleString()} VND
                    </h2>
                </div>
                <div className='mt-5'>
                    <div className='flex items-center justify-between mb-3'>
                        <h2 className='text-xs text-slate-400'>Đã chi: {parseFloat(budget.totalSpend ? budget.totalSpend : 0).toLocaleString()} VND</h2>
                        <h2 className='text-xs text-slate-400'>Còn dư: {parseFloat(budget.amount - budget.totalSpend).toLocaleString()} VND</h2>
                    </div>
                    <div className='w-full bg-slate-300 h-2 rounded-full'>
                        <div
                            className={`h-2 rounded-full ${calculateProgressPerc() > 80 ? 'bg-red-500' : 'bg-primary'}`}
                            style={{
                                width: `${Math.min(calculateProgressPerc(), 100)}%`,
                            }}
                        />
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default BudgetItem