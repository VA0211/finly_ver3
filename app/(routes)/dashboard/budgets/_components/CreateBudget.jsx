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
import EmojiPicker from 'emoji-picker-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
  
function CreateBudget({refreshData}) {
    const [emojiIcon, setEmojiIcon]=useState('🌈');
    const [openEmojiPicker, setOpenEmojiPicker]=useState(false);

    const [name, setName]=useState();
    const [amount, setAmount]=useState();

    const {user}=useUser();

    /**
     * Used to create new budgets
     */
    const onCreateBudget=async()=>{
        const result=await db.insert(Budgets)
        .values({
            name:name,
            amount:amount,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            icon:emojiIcon
        }).returning({insertedId:Budgets.id})

        if(result){
            refreshData()
            toast('Đã tạo Budget mới!!!')  
        }

    }

  return (
    <div>
        <Dialog>
            <DialogTrigger asChild>
                <div className='bg-slate-100 p-10 rounded-md items-center flex flex-col 
                border-2 border-dashed cursor-pointer hover:shadow-md'>
                    <h2 className='text-3xl'>+</h2>
                    <h2>Tạo Budget Mới</h2>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Tạo Budget Mới</DialogTitle>
                <DialogDescription>
                    <div className='mt-5'>
                        <Button variant="outline"
                        className="text-lg"
                        onClick={()=>setOpenEmojiPicker(!openEmojiPicker)}
                        >{emojiIcon}</Button>
                        <div className='absolute z-20'>
                            <EmojiPicker
                            open={openEmojiPicker}
                            onEmojiClick={(e)=>{
                                setEmojiIcon(e.emoji)
                                setOpenEmojiPicker(false)
                            }}
                            />
                        </div>
                        <div className='mt-2'>
                            <h2 className='text-black font-medium my-1'>Tên Budget</h2>
                            <Input placeholder="Ví dụ: Chuyến đi Đà Lạt"
                            onChange={(e)=>setName(e.target.value)}
                            />
                        </div>
                        <div className='mt-2'>
                            <h2 className='text-black font-medium my-1'>Tổng Số Tiền</h2>
                            <Input 
                            type="number"
                            placeholder="Ví dụ: 3.000.000 VND"
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
                        onClick={()=>onCreateBudget()}
                        className='mt-5 w-full'
                    >Tạo Budget</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    </div>
  )
}

export default CreateBudget