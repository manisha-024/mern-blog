import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id, currentUser.isAdmin]);

  return (
    <div className="overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <Table hoverable className="shadow-md w-full">
          <thead>
            <tr>
              <th className="px-6 py-3">Date updated</th>
              <th className="px-6 py-3">Post title</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Delete</th>
              <th className="px-6 py-3">Edit</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {userPosts.map((post) => (
              <tr
                key={post._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <td className="px-6 py-4">{new Date(post.updatedAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <Link
                    className="font-medium text-gray-900 dark:text-white"
                    to={`/post/${post.slug}`}
                  >
                    {post.title}
                  </Link>
                </td>
                <td className="px-6 py-4">{post.category}</td>
                <td className="px-6 py-4">
                  <span className="font-medium text-red-500 hover:underline cursor-pointer">
                    Delete
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link
                    className="text-teal-500 hover:underline"
                    to={`/update-post/${post._id}`}
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-center mt-10">No posts found.</p>
      )}
    </div>
  );
}
