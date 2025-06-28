import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import Dashprofile from '../components/Dashprofile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashboardComp from '../components/DashboardComp';

export default function Dashboard() {
    const location = useLocation();
    const [tab,setTab] = useState('');
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl){
          setTab(tabFromUrl);
        }
    }, [location.search]);
    return(
      <div className='min-h-screen flex felx-col md:flex-row bg-pink-50 lg:bg-pink-50 bg-gradient-to-r from-pink-50 to-rose-200 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900'>
        <div className='md:w-56'>
        <DashSidebar/>
        </div>
         {tab === 'profile' && <Dashprofile />}      {/* posts... */}
      {tab === 'posts' && <DashPosts />}
      {tab === 'users' && <DashUsers/>}
      {tab === 'comments' && <DashComments/>}
      {tab === 'dash' && <DashboardComp/>}
      </div>
     
    )
  }
