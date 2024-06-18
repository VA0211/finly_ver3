"use client";

import React, { useEffect, useState } from 'react';
import SideNav from './_components/SideNav';
import DashboardHeader from './_components/DashboardHeader';
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { create } from 'domain';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation';

function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const {user}=useUser();
  const router=useRouter();

  useEffect(()=>{
    user&&checkUserBudgets();
  }, [user])

  const checkUserBudgets=async() =>{
    const result=await db.select()
    .from(Budgets)
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
    console.log(result);
    if(result?.length==0)
    {
      router.replace('/dashboard/budgets')
    }
  };

  return (
    <div className="relative flex">
      {/* Hamburger Icon for Small Screens */}
      {!isSidebarOpen && (
        <div className="md:hidden flex-0 top-2 left-2 z-50">
            <button onClick={toggleSidebar} className="text-black p-2 rounded">
            &#9776; {/* Replace with your preferred hamburger icon */}
            </button>
        </div>
        )}

      {/* Full-screen Sidebar for Small Screens */}
      <div
        className={`fixed top-0 left-0 w-full h-full z-40 transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 md:w-64 md:block`}
      >
        <div className="relative h-full">
          {/* Close Button for Small Screens */}
          {isSidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="absolute top-2 right-2 text-black bg-white rounded-full p-1 md:hidden"
            >
              &times; {/* Close (X) icon */}
            </button>
          )}
          <SideNav />
        </div>
      </div>

      {/* Dashboard */}
      <div className={`flex-1 ${isSidebarOpen ? 'blur-sm md:blur-0' : ''} transition-all duration-300`}>
        <DashboardHeader/>
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
