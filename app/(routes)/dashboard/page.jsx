"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import CardInfo from './_components/CardInfo';
import { db } from '@/utils/dbConfig'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses, Incomes } from '@/utils/schema'
import BarChartDashboard from './_components/BarChartDashboard';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';
import PieChartDashboard from './_components/PieChartDashboard';
import ProgressBar from './_components/ProgressBar';

function Dashboard() {
  const {user}=useUser();
  
  const[budgetList, setBudgetList]=useState([]);
  const[expensesList, setExpensesList]=useState([]);
  const[incomesList, setIncomesList]=useState([]);

  useEffect(()=>{
    user&&getBudgetList();
  }, [user])

  /**
   * Used to get Budgets List
   */
  const getBudgetList=async()=>{
    const result=await db.select({
      ...getTableColumns(Budgets),
      totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql `count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
    .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
    .groupBy(Budgets.id)
    .orderBy(desc(Budgets.id));

    setBudgetList(result);
    getAllExpenses();
    getAllIncomes();
  }

  /**
   * Used to get all income
   */
  const getAllIncomes=async()=>{
    const result=await db.select({
      id:Incomes.id,
      name:Incomes.name,
      amount:Incomes.amount,
      createdAt:Incomes.createdAt,
    }).from(Incomes)
    .where(eq(Incomes.createdBy, user?.primaryEmailAddress.emailAddress))
    .orderBy(desc(Incomes.id));

    setIncomesList(result);
  }

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
      <h2 className='font-bold text-3xl'>Xin chào, {user?.fullName}</h2>
      <p className='text-gray-500'>Hãy cùng Finly quản lí chi tiêu nào ✌️</p>
      <CardInfo budgetList={budgetList}/>
      <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
        <div className='md:col-span-2'>
          <BarChartDashboard
          budgetList={budgetList}/>

          <ExpenseListTable
          expensesList={expensesList}
          refreshData={()=>getBudgetList()}
          />
        </div>
        <div className='grid gap-5'>
          {/* <PieChartDashboard
          incomeList={incomesList}/> */}
          <ProgressBar
          budgetList={budgetList}
          expenseList={expensesList}
          incomeList={incomesList}
          refreshData={()=>getBudgetList()}/>

          <h2 className='font-bold text-lg'>Budgets Gần Đây</h2>
          {budgetList.map((budget,index)=>(
            <BudgetItem budget={budget} key={index}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard