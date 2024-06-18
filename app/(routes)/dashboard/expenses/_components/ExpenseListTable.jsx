import { db } from '@/utils/dbConfig'
import { Expenses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

function ExpenseListTable({expensesList, refreshData}) {

    const deleteExpense=async(expenses)=>{
        const result=await db.delete(Expenses)
        .where(eq(Expenses.id, expenses.id))
        .returning();
        
        if(result){
            toast('Đã Xóa!!!');
            refreshData()
        }
    }

  return (
    <div className='mt-3'>
        <h2 className='font-bold text-lg'>Chi Tiêu Gần Đây</h2>  
        <div className='grid grid-cols-4 bg-slate-200 p-2 mt-3'>
            <h2 className='font-bold'>Tên Chi Tiêu</h2>
            <h2 className='font-bold'>Tổng Số Tiền</h2>
            <h2 className='font-bold'>Ngày</h2>
            <h2 className='font-bold'>Xóa Chi Tiêu</h2>
        </div>
        {expensesList.map((expenses, index)=>(
            <div className='grid grid-cols-4 bg-slate-50 p-2'>
                <h2>{expenses.name}</h2>
                <h2>{parseFloat(expenses.amount).toLocaleString()}</h2>
                <h2>{expenses.createdAt}</h2>
                <h2>
                    <Trash className='text-red-600 cursor-pointer'
                    onClick={()=>deleteExpense(expenses)}
                    />
                </h2>
            </div>
        ))}
    </div>
  )
}

export default ExpenseListTable