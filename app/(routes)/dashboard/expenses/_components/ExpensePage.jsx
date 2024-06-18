"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/dbConfig'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import ExpenseListTable from './ExpenseListTable'

function ExpensePage() {
  const {user}=useUser();
  const[expensesList, setExpensesList]=useState([]);

  useEffect(()=>{
    user&&getAllExpenses();
  }, [user])

  /**
   * Used to get all expenses
   */
  const getAllExpenses=async()=>{
    const result=await db.select({
      id:Expenses.id,
      name:Expenses.name,
      amount:Expenses.amount,
      createdAt:Expenses.createdAt
    }).from(Budgets)
    .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
    .orderBy(desc(Expenses.id));

    setExpensesList(result);
  }

  return (
    <div className='p-8'>
      {/* <h2 className='font-bold text-3xl'>Xin chào, {user?.fullName}</h2>
      <p className='text-gray-500'>Đây là những chi tiêu gần đây của {user?.fullName} ✌️</p> */}
        <ExpenseListTable
        expensesList={expensesList}
        refreshData={()=>getAllExpenses()}
        />
    </div>
  )
}

export default ExpensePage