import Image from 'next/image'
import React, { useEffect } from 'react'
import {LayoutGrid, PiggyBank, ReceiptText, ShieldCheck, HandCoins} from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function SideNav() {
    const menuList=[
        {
            id:1,
            name:'Dashboard',
            icon:LayoutGrid,
            path:'/dashboard'
        },
        {
            id:2,
            name:'Budgets',
            icon:PiggyBank,
            path:'/dashboard/budgets'
        },
        {
            id:3,
            name:'Thu Nhập',
            icon:HandCoins,
            path:'/dashboard/incomes'
        },
        {
            id:4,
            name:'Chi tiêu',
            icon:ReceiptText,
            path:'/dashboard/expenses'
        },
        {
            id:5,
            name:'Đăng ký Premium',
            icon:ShieldCheck,
            path:'/dashboard/upgrade'
        }
    ]

    const path=usePathname();

    useEffect(()=>{
        console.log(path)
    }, [path])

  return (
    <div className='h-screen p-5 border shadow-sm'>
        <Link href={'/'}>
            <Image src={'/finly.svg'}
            alt='logo'
            width={200}
            height={100}/>
        </Link>
        <div className='mt-5'>
            {menuList.map((menu, index)=>(
                <Link href={menu.path}>
                    <h2 className={`flex gap-2 items-center font-medium mb-2 p-5
                    cursor-pointer rounded-md hover:text-primary hover:bg-blue-100
                    ${path==menu.path&&'text-primary bg-blue-100'}`}>
                        <menu.icon/>
                        {menu.name}
                    </h2>
                </Link>
            ))}
        </div>
        <div className='fixed bottom-10 p-5 flex gap-2 items-center'>
            <UserButton/>
            Profile
        </div>
    </div>
  )
}

export default SideNav