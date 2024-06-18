"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig'
import { Budgets, Incomes } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import moment from 'moment'
  
function CreateIncome({refreshData}) {

    const [name, setName]=useState();
    const [amount, setAmount]=useState();

    const {user}=useUser();

    /**
     * Used to create new budgets
     */
    const onCreateIncomes=async()=>{
        const result=await db.insert(Incomes)
        .values({
            name:name,
            amount:amount,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format('DD/MM/yyyy')
        }).returning({insertedId:Incomes.id})

        if(result){
            refreshData()
            toast('Đã thêm thu nhập mới!!!')  
        }

    }

  return (
    <div>
        <Dialog>
            <DialogTrigger asChild>
                <div className='bg-slate-100 p-10 rounded-md items-center flex flex-col 
                border-2 border-dashed cursor-pointer hover:shadow-md'>
                    <h2 className='text-3xl'>+</h2>
                    <h2>Thêm Thu Nhập Mới</h2>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Thêm Thu Nhập Mới</DialogTitle>
                <DialogDescription>
                    <div className='mt-5'>
                        <div className='mt-2'>
                            <h2 className='text-black font-medium my-1'>Tên Thu Nhập</h2>
                            <Input placeholder="Ví dụ: Tiền lương tháng 6"
                            onChange={(e)=>setName(e.target.value)}
                            />
                        </div>
                        <div className='mt-2'>
                            <h2 className='text-black font-medium my-1'>Tổng Số Tiền</h2>
                            <Input 
                            type="number"
                            placeholder="Ví dụ: 8.000.000 VND"
                            onChange={(e)=>setAmount(e.target.value)}
                            />
                        </div>
                    </div>
                </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                    <Button 
                        disabled={!(name&&amount)}
                        onClick={()=>onCreateIncomes()}
                        className='mt-5 w-full'
                    >Thêm Thu Nhập</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    </div>
  )
}

export default CreateIncome