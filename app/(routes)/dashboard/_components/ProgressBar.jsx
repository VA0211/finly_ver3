import Link from 'next/link'
import React, { useState, useEffect } from 'react'

function ProgressBar({ budgetList, incomeList, expenseList }) {
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalBudget, setTotalBudget] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);

    useEffect(() => {
        incomeList && CalculateTotalIncome();
    }, [incomeList])

    const CalculateTotalIncome = () => {
        // console.log(budgetList);
        let totalIncome_ = 0;
        incomeList.forEach(element => {
            totalIncome_ = totalIncome_ + Number(element.amount)
        });
        setTotalIncome(totalIncome_);
        CalculateTotalBudget();
        CalculateTotalExpense();
    }

    const CalculateTotalBudget = () => {
        let totalBudget_ = 0;
        budgetList.forEach(element => {
            totalBudget_ = totalBudget_ + Number(element.amount)
        });
        setTotalBudget(totalBudget_);
    }

    const CalculateTotalExpense = () => {
        let totalExpense_ = 0;
        expenseList.forEach(element => {
            totalExpense_ = totalExpense_ + Number(element.amount)
        });
        setTotalExpense(totalExpense_);
    }

    const calculateBudgetPerc = () => {
        const budgetPerc = (totalBudget / totalIncome) * 100;
        return budgetPerc.toFixed(2);
    }

    const calculateExpensePerc = () => {
        const expensePerc = (totalExpense / totalIncome) * 100;
        return expensePerc.toFixed(2);
    }

    return (
        <div className='p-5 border rounded-lg hover:shadow-md cursor-pointer h-[230px]'>
            <div className='flex gap-2 items-center justify-between'>
                <div className='grid gap-2 items-center'>
                    <h2 className='font-bold text-lg'>Tổng Thu Nhập</h2>
                    <h2 className='text-sm text-gray-500'>100 Khoản Chi</h2>
                </div>
                <h2 className='font-bold text-primary text-lg'>
                    {parseFloat(totalIncome).toLocaleString()} VND
                </h2>
            </div>
            <div className='mt-5'>
                <div className='flex items-center justify-between mb-3'>
                    <h2 className='text-xs text-slate-400'>Đã chi: {parseFloat(totalExpense ? totalExpense : 0).toLocaleString()} VND</h2>
                    <h2 className='text-xs text-slate-400'>Còn dư: {parseFloat(totalIncome - totalExpense).toLocaleString()} VND</h2>
                </div>
                <div className='w-full bg-slate-300 h-2 rounded-full'>
                    <div
                        className="h-2 rounded-full"
                        style={{
                            width: `${Math.min(calculateExpensePerc(), 100)}%`,
                            backgroundColor: calculateExpensePerc() > 80 ? 'red' : 'primary',
                        }}
                    />
                </div>
            </div>
            <div className='mt-5'>
                <div className='flex items-center justify-between mb-3'>
                    <h2 className='text-xs text-slate-400'>Đã lên budget: {parseFloat(totalBudget ? totalBudget : 0).toLocaleString()} VND</h2>
                    <h2 className='text-xs text-slate-400'>Còn dư: {parseFloat(totalIncome - totalExpense).toLocaleString()} VND</h2>
                </div>
                <div className='w-full bg-slate-300 h-2 rounded-full'>
                    <div
                        className="h-2 rounded-full"
                        style={{
                            width: `${Math.min(calculateBudgetPerc(), 100)}%`,
                            backgroundColor: calculateBudgetPerc() > 80 ? 'red' : 'primary',
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProgressBar