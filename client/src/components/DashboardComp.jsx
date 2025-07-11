import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';


export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/user/getusers?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/post/getposts?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/comment/getcomments?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  return (
    <div className='p-3 md:mx-auto'>
      <div className='flex-wrap flex gap-4 justify-center'>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
              <p className='text-2xl'>{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className='bg-teal-600  text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex  gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>
                Total Comments
              </h3>
              <p className='text-2xl'>{totalComments}</p>
            </div>
            <HiAnnotation className='bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex  gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>Total Posts</h3>
              <p className='text-2xl'>{totalPosts}</p>
            </div>
            <HiDocumentText className='bg-lime-600  text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex  gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div>
      </div>

      <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
        {/* Users + Comments */}
        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>

          <div className='flex flex-col md:flex-row gap-4'>
            {/* Users Table */}
            <div className='flex flex-col w-full md:w-1/2 shadow-md p-2 rounded-md dark:bg-gray-800'>
              <div className='flex justify-between p-3 text-sm font-semibold'>
                <h1 className='text-center p-2'>Recent users</h1>
                <Button outline color='pink'>
                  <Link to={'/dashboard?tab=users'}>See all</Link>
                </Button>
              </div>
              <Table hoverable>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th className='px-6 py-3'>User image</th>
                    <th className='px-6 py-3'>Username</th>
                  </tr>
                </thead>
                <tbody className='divide-y'>
                  {users &&
                    users.map((user) => (
                      <tr key={user._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                        <td className='px-6 py-4'>
                          <img
                            src={user.profilePicture}
                            alt='user'
                            className='w-10 h-10 rounded-full bg-gray-500'
                          />
                        </td>
                        <td className='px-6 py-4'>{user.username}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>

            {/* Comments Table */}
            <div className='flex flex-col w-full md:w-1/2 shadow-md p-2 rounded-md dark:bg-gray-800'>
              <div className='flex justify-between p-3 text-sm font-semibold'>
                <h1 className='text-center p-2'>Recent comments</h1>
                <Button outline color='pink'>
                  <Link to={'/dashboard?tab=comments'}>See all</Link>
                </Button>
              </div>
              <Table hoverable>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th className='px-6 py-3'>Comment content</th>
                    <th className='px-6 py-3'>Likes</th>
                  </tr>
                </thead>
                <tbody className='divide-y'>
                  {comments &&
                    comments.map((comment) => (
                      <tr key={comment._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                        <td className='px-6 py-4 w-96'>
                          <p className='line-clamp-2'>{comment.content}</p>
                        </td>
                        <td className='px-6 py-4'>{comment.numberOfLikes}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>

        {/* Posts Table */}
        <div className='flex lg:w-[480px] flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Recent posts</h1>
            <Button outline color='pink'>
              <Link to={'/dashboard?tab=posts'}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th className='px-6 py-3'>Post image</th>
                <th className='px-6 py-3'>Post Title</th>
                <th className='px-6 py-3'>Category</th>
              </tr>
            </thead>
            <tbody className='divide-y'>
              {posts &&
                posts.map((post) => (
                  <tr key={post._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <td className='px-6 py-4'>
                      <img
                        src={post.image}
                        alt='post'
                        className='w-14 h-10 rounded-md bg-gray-500'
                      />
                    </td>
                    <td className='px-6 py-4 w-96'>{post.title}</td>
                    <td className='px-6 py-4 w-5'>{post.category}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
