import { Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function IncomeCard({incomeList}) {

    const [totalIncome, setTotalIncome]=useState(0);

    useEffect(()=>{
        incomeList&&CalculateCardInfo();
    }, [incomeList])

    const CalculateCardInfo=()=>{
        console.log(incomeList);
        let totalIncome_=0;
        incomeList.forEach(element => {
            totalIncome_=totalIncome_+Number(element.amount)
        });
        setTotalIncome(totalIncome_);
        console.log(totalIncome_,)
    }

  return (
    <div>
    {incomeList?.length>0?
    <div className='mt-7 gap-5'>
        <div className='p-7 border rounded-lg flex items-center justify-between'>
            <div>
                <h2 className='text-sm'>Tổng Thu Nhập</h2>
                <h2 className='font-bold text-2xl'>
                    {parseFloat(totalIncome).toLocaleString()} VND
                </h2>
            </div>
            <Wallet className='bg-primary p-3 h-12 w-12 rounded-full text-white'/>
        </div>
    </div>
    :
    <div className='mt-7 grid'>
        {[1].map((item, index)=>(
            <div className='h-[150px] w-full bg-slate-200 animate-pulse rounded-lg flex items-center justify-center'>
                <h2>Hãy thêm thu nhập để hiển thị tổng thu nhập</h2>
            </div>
        ))}
    </div>
    }
    </div>
  )
}

export default IncomeCard