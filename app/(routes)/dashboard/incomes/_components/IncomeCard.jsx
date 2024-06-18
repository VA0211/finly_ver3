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
    <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {[1].map((item, index)=>(
            <div className='h-[120px] w-full bg-slate-200 animate-pulse rounded-lg'></div>
        ))}
    </div>
    }
    </div>
  )
}

export default IncomeCard