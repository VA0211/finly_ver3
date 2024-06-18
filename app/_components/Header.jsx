"use client"
import { Button } from '../../components/ui/button'
import Image from 'next/image'
import { UserButton, useUser } from '@clerk/nextjs'
import React from 'react'
import Link from 'next/link'

function Header() {
  const {user, isSignedIn} = useUser();
  return (
    <div className='p-5 flex justify-between items-center border shadow-sm'>
        <Image src={'./finly.svg'}
        alt='logo'
        width={200}
        height={100}
        />
        <div className='flex space-x-4 items-center'>
          <Link href={'https://finly.hashnode.dev/'}>
            <Button>Blog</Button>
          </Link>
          {isSignedIn?
            <Link href={'/dashboard'}>
              <Button>Vào Finly</Button>
            </Link> :   
            <Link href={'/sign-in'}>
              <Button>Vào Finly</Button>
            </Link>
          }
          {isSignedIn?
            <UserButton/> : 
            <Link href={'/sign-in'}>
              <Button>Đăng Ký / Đăng Nhập</Button>
            </Link>
          }
        </div>
    </div>
  )
}

export default Header