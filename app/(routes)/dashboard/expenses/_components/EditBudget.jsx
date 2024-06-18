"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { ArrowLeft, Pen, PenBox, Trash } from 'lucide-react';
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
import EmojiPicker from 'emoji-picker-react';
import { Input } from '@/components/ui/input';
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';

function EditBudget({budgetInfo, refreashData}) {
    const [emojiIcon, setEmojiIcon]=useState(budgetInfo?.icon);
    const [openEmojiPicker, setOpenEmojiPicker]=useState(false);

    const [name, setName]=useState();
    const [amount, setAmount]=useState();

    const {user}=useUser();

    useEffect(()=>{
        if(budgetInfo){
            setName(budgetInfo?.name)
            setAmount(budgetInfo.amount)
            setEmojiIcon(budgetInfo.icon)
        }
    }, [budgetInfo])

    const onUpdateBudget=async()=>{
        const result=await db.update(Budgets).set({
            name:name,
            amount:amount,
            icon:emojiIcon,
        }).where(eq(Budgets.id, budgetInfo.id))
        .returning();

        if(result){
            refreashData()
            toast('Đã cập nhật Budget!!!')
        }
    }

  return (
    <div>
        <Dialog>
            <DialogTrigger asChild>
                <Button className='flex gap-2'> <PenBox/> Sửa Budget</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Cập Nhật Budget</DialogTitle>
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
                            <Input defaultValue={budgetInfo?.name}
                            onChange={(e)=>setName(e.target.value)}
                            />
                        </div>
                        <div className='mt-2'>
                            <h2 className='text-black font-medium my-1'>Tổng Số Tiền</h2>
                            <Input 
                            type="number"
                            defaultValue={budgetInfo?.amount}
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
                        onClick={()=>onUpdateBudget()}
                        className='mt-5 w-full'
                    >Cập Nhật Budget</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default EditBudget