import React, { useEffect, useState } from 'react';
import {
  Button,
  Navbar,
  TextInput,
  Avatar,
  NavbarLink,
  NavbarCollapse,
  NavbarToggle
} from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector,useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';

export default function Header() {
  const location = useLocation();
  const path = location.pathname;
  const { currentUser } = useSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { theme } = useSelector((state) => state.theme);

  
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };


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
    <Navbar className='bg-pink-100 border-rose-400 border-b-2'>
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-rose-200 to-pink-900 rounded-lg text-white">
          Manisha's
        </span>{' '}
        Blog
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        </form>

      <Link to='/search'>
          <Button
        className="w-12 h-10 lg:hidden"
        color='gray'
        pill
      >
        <AiOutlineSearch />
      </Button>
      </Link>
      
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
                  to={'/signin'}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleSignout}
                >
                  Sign Out
                </Link>
              </div>
            )}
          </div>
        ) : (
          <Link to='/signin'>
            <Button color='pink' outline>
              Sign In
            </Button>
          </Link>
        )}

        <NavbarToggle />
      </div>

      <NavbarCollapse>
        <NavbarLink className='text-black hover:text-pink-800' as={Link} to="/" active={path === '/'}>
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