import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function DashboardHeader() {
  return (
    <div className='p-5 flex justify-between items-center border shadow-sm'>
      <div className='flex space-x-4 items-center ml-auto'>
        <div>
          <Link href={'https://www.facebook.com/profile.php?id=61559605455726&mibextid=ZbWKwL'}>
            <Button>Phản Hồi/Đánh Giá</Button>
          </Link>
        </div>
        <div>
          <Link href={'https://www.facebook.com/profile.php?id=61559605455726&mibextid=ZbWKwL'}>
            <Button>Liên Hệ</Button>
          </Link>
        </div>
        <div>
          <UserButton />
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader