import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { toast } from 'sonner';
import moment from 'moment';
import { Loader } from 'lucide-react';

function AddExpenses({budgetId, user, refreshData}) {
    const [name,setName]=useState();
    const [amount,setAmount]=useState();
    const [loading, setLoading]=useState(false);
    /**
     * Use to add new expense
     */

    const addNewExpense=async()=>{
        setLoading(true)
        const result=await db.insert(Expenses)
        .values({
            name:name,
            amount:amount,
            budgetId:budgetId,
            createdAt:moment().format('DD/MM/yyyy')
        }).returning({insertedID:Budgets.id});
        
        setAmount('')
        setName('')
        // console.log(result);
        if(result){
            setLoading(false)
            refreshData()
            toast('Đã thêm Chi Tiêu!!!')
        }
        setLoading(false)
    }

    return (
        <div className='border p-5 rounded-lg'>
            <h2 className='font-bold text-lg'>Nhập Chi Tiêu</h2>
            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Tên Chi Tiêu</h2>
                <Input placeholder="Ví dụ: Mua đồ đi Đà Lạt"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Tổng Số Tiền</h2>
                <Input
                    type="number"
                    placeholder="Ví dụ: 1.000.000 VND"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <Button disabled={!(name&&amount)} 
            onClick={()=>addNewExpense()}
            className='mt-3 w-full'>
                {loading?
                <Loader className='animate-spin'/>:"Thêm Chi Tiêu"
                }
            </Button>
        </div>
    )
}

export default AddExpenses