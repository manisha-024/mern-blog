import React, { useState, useEffect } from 'react';
import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup
} from 'flowbite-react';
import { HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiUser,HiAnnotation,HiChartPie } from 'react-icons/hi';
import { useNavigate, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function DashSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState('');
    const dispatch = useDispatch();
  const {currentUser} = useSelector(state=>state.user);
  useEffect(() => {
  const urlParams = new URLSearchParams(location.search);
  const tabFromUrl = urlParams.get('tab');
  if (!tabFromUrl) {
    navigate('/dashboard?tab=dash', { replace: true });
  } else {
    setTab(tabFromUrl);
  }
}, [location.search]);

  const handleSignout = async()=>{
     try {
        const res = await fetch('${import.meta.env.VITE_API_URL || ''}/api/user/signout', {
          method: 'POST',
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          dispatch(signoutSuccess());
        }
      } catch (error) {
        console.log(error.message);
      }
  }
  return (
    <div className='bg-pink-50 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900'>
    <Sidebar className='w-full md:w-56'>
      <SidebarItemGroup className='flex flex-col gap-1'>
        {currentUser && currentUser.isAdmin && (
  <SidebarItem
    active={tab === 'dash' || !tab}
    icon={HiChartPie}
    onClick={() => navigate('/dashboard?tab=dash')}
    className='cursor-pointer'
  >
    Dashboard
  </SidebarItem>
)}

        <SidebarItem
          active={tab === 'profile'}
          icon={HiUser}
          label={currentUser.isAdmin ? 'Admin' :'User'}
          labelColor='dark'
          onClick={() => navigate('/dashboard?tab=profile')}
          className='cursor-pointer'
        >
          Profile
        </SidebarItem>
        {currentUser.isAdmin &&(
            <SidebarItem
             active={tab === 'posts'}
                icon={HiDocumentText}
                onClick={()=>navigate('/dashboard?tab=posts')}
                as='div'
              >
                Posts
        </SidebarItem>
        )}
        {currentUser.isAdmin &&(
        <SidebarItem
             active={tab === 'users'}
                icon={HiOutlineUserGroup}
                onClick={()=>navigate('/dashboard?tab=users')}
                as='div'
              >
                Users
        </SidebarItem>
        )}
        {currentUser.isAdmin &&(
        <SidebarItem
             active={tab === 'comments'}
                icon={HiAnnotation}
                onClick={()=>navigate('/dashboard?tab=comments')}
                as='div'
              >
                Comments
        </SidebarItem>
        )}
        <SidebarItem
          icon={HiArrowSmRight}
          className='cursor-pointer'
          onClick={handleSignout}
        >
          Sign Out
        </SidebarItem>
      </SidebarItemGroup>
    </Sidebar>
    </div>
  );
}
