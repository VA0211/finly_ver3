"use client"
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/dbConfig'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { Incomes } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import CreateIncome from './CreateIncome'
import IncomeListTable from './IncomeListTable'
import IncomeCard from './IncomeCard'

function IncomeList() {
  const {user}=useUser();
  const[incomesList, setIncomesList]=useState([]);

  useEffect(()=>{
    user&&getAllIncomes();
  }, [user])

  /**
   * Used to get all expenses
   */
  const getAllIncomes=async()=>{
    const result=await db.select({
      id:Incomes.id,
      name:Incomes.name,
      amount:Incomes.amount,
      createdAt:Incomes.createdAt,
      // totalIncome: sql `sum(${Incomes.amount})`.mapWith(Number),
      // totalItem: sql `count(${Incomes.id})`.mapWith(Number)
    }).from(Incomes)
    .where(eq(Incomes.createdBy, user?.primaryEmailAddress.emailAddress))
    .orderBy(desc(Incomes.id));

    setIncomesList(result);
  }

  return (
    <div className='mt-7'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          <div className='grid grid-flow-row gap-10'>
            <CreateIncome
            refreshData={()=>getAllIncomes()}/>
            <IncomeCard
            incomeList={incomesList}
            refreshData={()=>getAllIncomes()}/>
          </div>
            <IncomeListTable
              incomeList={incomesList}
              refreshData={()=>getAllIncomes()}
            />
        </div>
    </div>
  )
}

export default IncomeList