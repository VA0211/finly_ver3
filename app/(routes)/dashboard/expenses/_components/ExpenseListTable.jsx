import { db } from '@/utils/dbConfig'
import { Expenses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Download, Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import * as XLSX from 'xlsx'

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

    const downloadExcel = () => {
        const formattedData = expensesList.map(expense => ({
          "Tên Chi Tiêu": expense.name,
          "Tổng Số Tiền": `${parseFloat(expense.amount).toLocaleString()} VND`,
          "Ngày": expense.createdAt,
        }));
        
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
        XLSX.writeFile(workbook, "chi_tieu.xlsx");
    };

  return (
    <div className='mt-3'>
        <div className='flex justify-between items-center'>
            <h2 className='font-bold text-lg'>Chi Tiêu Gần Đây</h2>
            <Button
            onClick={downloadExcel}
            ><Download/> Tải File Excel
            </Button>
        </div>
        <div className='grid grid-cols-5 bg-slate-200 p-2 mt-3'>
            <h2 className='font-bold'>Tên Chi Tiêu</h2>
            <h2 className='font-bold'>Số Tiền</h2>
            <h2 className='font-bold'>Danh Mục</h2>
            <h2 className='font-bold'>Ngày</h2>
            <h2 className='font-bold'>Xóa Chi Tiêu</h2>
        </div>
        {expensesList.map((expenses, index)=>(
            <div className='grid grid-cols-5 bg-slate-50 p-2'>
                <h2>{expenses.name}</h2>
                <h2>{parseFloat(expenses.amount).toLocaleString()}</h2>
                <h2>{expenses.budgetName}</h2>
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