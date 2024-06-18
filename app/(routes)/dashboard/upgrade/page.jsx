import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Đăng Ký Premium',
  description: 'Đăng Ký Premium',
}

function Upgrade() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className='text-lg font-bold mb-4'>Bạn hãy ghi lời nhắn là Email dùng để đăng nhập vào Finly nha</h2>
      <h2>Bạn có thể nhấp vào  
      <Link href={'https://me.momo.vn/1MIKuNIyUBTpImiBC9FK/4QbY7Y1J1MKAezq'}
      className="text-blue-500 underline hover:text-blue-700"> đây </Link>
       để hoàn tất thanh toán hoặc quét mã QR phía bên dưới</h2>
      <Image
        src="/qr.jpg"
        alt="QR Code"
        width={350}
        height={350}
        className="object-contain"
      />
    </div>
  );
}

export default Upgrade