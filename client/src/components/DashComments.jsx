import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { apiFetch } from '../utils/api';

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user); // ✅ Fixed selector
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState(''); // ✅ Fixed name

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await apiFetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await apiFetch(
        `/api/comment/getcomments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async () => {
    try {
      const res = await apiFetch(`/api/comment/deleteComment/${commentIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-pink-50 lg:bg-pink-50 bg-gradient-to-r from-pink-50 to-rose-200 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser?.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-md w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 dark:bg-gray-700 text-xs uppercase text-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-6 py-3">Date updated</th>
                <th className="px-6 py-3">Comment Content</th>
                <th className="px-6 py-3">Number of Likes</th>
                <th className="px-6 py-3">PostId</th>
                <th className="px-6 py-3">UserId</th>
                <th className="px-6 py-3">Delete</th>
              </tr>
            </thead>
            <tbody>
    {comments.map((comment) => (
      <tr key={comment._id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
        <td className='px-6 py-4'>{new Date(comment.updatedAt).toLocaleDateString()}</td>
        <td className='px-6 py-4'>{comment.content}</td>
        <td className='px-6 py-4'>{comment.numberOfLikes}</td>
        <td className='px-6 py-4'>{comment.postId}</td>
        <td className='px-6 py-4'>{comment.userId}</td>
        <td className='px-6 py-4'>
          <span
            onClick={() => {
              setShowModal(true);
              setCommentIdToDelete(comment._id);
            }}
            className='font-medium text-red-500 hover:underline cursor-pointer'
          >
            Delete
          </span>
        </td>
      </tr>
    ))}
  </tbody>
          </Table>

          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no comments yet!</p>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <ModalHeader>Delete Comment</ModalHeader>
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
          </div>
        </ModalBody>
        <ModalFooter className="flex justify-center">
          <Button color='red' outline onClick={handleDeleteComment}>
            Yes, I'm sure
          </Button>
          <Button className='text-white bg-gray-600 hover:bg-black' outline onClick={() => setShowModal(false)}>
            No, cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
