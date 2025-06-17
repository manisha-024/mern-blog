import React, { useState, useEffect } from 'react';
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup
} from 'flowbite-react';
import { HiArrowSmRight, HiUser } from 'react-icons/hi';
import { useNavigate, useLocation } from 'react-router-dom';

export default function DashSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <Sidebar className='w-full md:w-56'>
      <SidebarItemGroup>
        <SidebarItem
          active={tab === 'profile'}
          icon={HiUser}
          label={'User'}
          labelColor='dark'
          onClick={() => navigate('/dashboard?tab=profile')}
          className='cursor-pointer'
        >
          Profile
        </SidebarItem>
        <SidebarItem
          icon={HiArrowSmRight}
          className='cursor-pointer'
          onClick={() => {
            // Add sign out logic here
            console.log('Sign out clicked');
          }}
        >
          Sign Out
        </SidebarItem>
      </SidebarItemGroup>
    </Sidebar>
  );
}
