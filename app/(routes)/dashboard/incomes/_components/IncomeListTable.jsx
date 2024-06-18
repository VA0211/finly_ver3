import { db } from '@/utils/dbConfig'
import { Expenses, Incomes } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Download, Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import * as XLSX from 'xlsx'

function IncomeListTable({incomeList, refreshData}) {

    const deleteIncome=async(incomes)=>{
        const result=await db.delete(Incomes)
        .where(eq(Incomes.id, incomes.id))
        .returning();
        
        if(result){
            toast('Đã Xóa!!!');
            refreshData()
        }
    }

    const downloadExcel = () => {
        const formattedData = incomeList.map(income => ({
          "Tên Thu Nhập": income.name,
          "Số Tiền": `${parseFloat(income.amount).toLocaleString()} VND`,
          "Ngày": income.createdAt,
        }));
        
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
        XLSX.writeFile(workbook, "thu_nhap.xlsx");
    };

  return (
    <div className='mt-3'>
        <div className='flex justify-between items-center'>
            <h2 className='font-bold text-lg'>Thu Nhập Gần Đây</h2>
            <Button
            onClick={downloadExcel}
            ><Download/> Tải File Excel
            </Button>
        </div>
        <div className='grid grid-cols-4 bg-slate-200 p-2 mt-3'>
            <h2 className='font-bold'>Tên Thu Nhập</h2>
            <h2 className='font-bold'>Số Tiền</h2>
            <h2 className='font-bold'>Ngày</h2>
            <h2 className='font-bold'>Xóa Thu Nhập</h2>
        </div>
        {incomeList.map((incomes, index)=>(
            <div className='grid grid-cols-4 bg-slate-50 p-2'>
                <h2>{incomes.name}</h2>
                <h2>{parseFloat(incomes.amount).toLocaleString()}</h2>
                <h2>{incomes.createdAt}</h2>
                <h2>
                    <Trash className='text-red-600 cursor-pointer'
                    onClick={()=>deleteIncome(incomes)}
                    />
                </h2>
            </div>
        ))}
        {/* <div className='grid grid-cols-4 bg-slate-200 p-2 mt-3'>
            <h2 className='font-bold'>Tổng Thu Nhập</h2>
            <h2 className='font-bold'>{parseFloat(incomeList.totalIncome).toLocaleString()}</h2>
            <h2 className='font-bold'>Ngày</h2>
            <h2 className='font-bold'></h2>
        </div> */}
    </div>
  )
}

export default IncomeListTable