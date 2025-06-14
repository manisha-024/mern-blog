import React, { useState } from 'react';
import {
  Button,
  Navbar,
  TextInput,
  Avatar,
  NavbarLink,
  NavbarCollapse,
  NavbarToggle
} from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector,useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
export default function Header() {
  const location = useLocation();
  const path = location.pathname;
  const { currentUser } = useSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  
  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-rose-200 to-pink-900 rounded-lg text-white">
          Manisha's
        </span>{' '}
        Blog
      </Link>

      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>

      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>

      <div className="flex gap-2 md:order-2">
        <Button
          className='w-12 h-10 hidden sm:inline'
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>

        {currentUser ? (
          <div className="relative">
            <Avatar
              alt='user'
              img={currentUser.profilePicture}
              rounded
              className="cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border">
                <div className="px-4 py-3 border-b">
                  <span className='block text-sm'>@{currentUser.username}</span>
                  <span className='block text-sm font-medium truncate text-gray-500'>
                    {currentUser.email}
                  </span>
                </div>
                <Link 
                  to={'/dashboard?tab=profile'}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Profile
                </Link>
                <hr />
                <Link 
                  to={'/'}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Sign Out
                </Link>
              </div>
            )}
          </div>
        ) : (
          <Link to='/signin'>
            <Button color='purple' outline>
              Sign In
            </Button>
          </Link>
        )}

        <NavbarToggle />
      </div>

      <NavbarCollapse>
        <NavbarLink as={Link} to="/" active={path === '/'}>
          Home
        </NavbarLink>
        <NavbarLink as={Link} to="/about" active={path === '/about'}>
          About
        </NavbarLink>
        <NavbarLink as={Link} to="/projects" active={path === '/projects'}>
          Projects
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}