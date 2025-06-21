import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import Dashprofile from '../components/Dashprofile';
import DashPosts from '../components/DashPosts';

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
      <div className='min-h-screen flex felx-col md:flex-row'>
        <div className='md:w-56'>
        <DashSidebar/>
        </div>
         {tab === 'profile' && <Dashprofile />}      {/* posts... */}
      {tab === 'posts' && <DashPosts />}
      </div>
     
    )
  }
