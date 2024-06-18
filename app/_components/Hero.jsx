import Image from 'next/image'
import React from 'react'

function Hero() {
  return (
    <section className="bg-gray-50 flex items-center flex-col">
      <div className="mx-auto max-w-screen-xl px-4 py-32 
    lg:flex">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl leading-tight">
            Quản lí tài chính cá nhân
          </h1>
          <h1 className="text-3xl font-extrabold sm:text-5xl leading-tight">
            <strong className="font-extrabold text-primary sm:block leading-tight">
              Nhanh - Gọn - Cấp Tốc
            </strong>
          </h1>
          <p className="mt-4 sm:text-xl/relaxed">
            Giao diện vô cùng mới mẻ, dễ sử dụng để theo dõi chi tiêu hàng ngày,
            lập kế hoạch chi tiêu các khoản và tiết kiệm tiền cho các mục tiêu tương lai của bạn.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-primary px-12 py-3 
            text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="/dashboard"
            >
              Nhập hội Finly ngay
            </a>
          </div>
          <Image src={'/dashboard.png'} alt='dashboard'
            width={950}
            height={650}
            className='mt-9 rounded-xl border-2' />
        </div>
      </div>

    </section>
  )
}

export default Hero