import { Alert,Button, TextInput } from 'flowbite-react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from "flowbite-react";

import React, { useEffect, useRef, useState } from 'react'
import {useSelector} from 'react-redux';
import { updateStart,updateSuccess,updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
 } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import {HiOutlineExclamationCircle} from 'react-icons/hi';
import { Link } from 'react-router-dom';


export default function Dashprofile() {
  const {currentUser,error,loading} = useSelector(state=>state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  const uploadImage = async () =>{
    console.log("for image");
  }
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);


   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };


  const handleSubmit = async(e) =>{
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }
     try {
      dispatch(updateStart());
      const res = await apiFetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  }
  const handleDeleteUser = async () => {
  setShowModal(false);
     console.log('Current user ID:', currentUser._id);
    console.log('Cookies:', document.cookie);
    
  try {
    dispatch(deleteUserStart());
    const res = await apiFetch(`/api/user/delete/${currentUser._id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) {
      dispatch(deleteUserFailure(data.message));
    } else {
      dispatch(deleteUserSuccess(data));
    }
  } catch (error) {
    dispatch(deleteUserFailure(error.message));
  }
};

const handleSignout = async()=>{
   try {
      const res = await apifetch('${import.meta.env.VITE_API_URL || ''}/api/user/signout', {
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
    <div className='max-w-lg mx-auto p-3 w-full'>
     <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
     <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />

      <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
      onClick={()=> filePickerRef.current.click()} 
      >
      <img src={imageFileUrl || currentUser.profilePicture} alt="user" 
      className='rounded-full w-full h-full border-8 border-[lightgray]'/>
      </div>
      <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}     onChange={handleChange}/>
      <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email}             onChange={handleChange}/>
      <TextInput type='password' id='password' placeholder='password' defaultValue={currentUser.password} onChange={handleChange}/>
      <Button type='submit' className="w-full bg-gradient-to-r from-rose-100 to-pink-700 text-white hover:from-rose-300 hover:to-pink-800 transition-all" outline disabled={loading}>
        {loading ? 'Loading...' : 'Update'}</Button>
      {
        currentUser.isAdmin && (
          <Link to={'/createpost'}>
          <Button type='button'
          color='pink'
          className='w-full'>Create a post</Button>
          </Link>
          
        )
      }
     </form>
     <div className='text-red-500 flex justify-between mt-5'>
      <span onClick={()=>setShowModal(true)} className='cursor-pointer'>Delete Account</span>
      <span onClick={handleSignout} className='cursor-pointer'>Sign Out</span>
     </div>
     {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )}
       {error && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
      )}
      <Modal
  show={showModal}
  onClose={() => setShowModal(false)}
  popup
  size="md"
>
  <ModalHeader>
    Delete Account
  </ModalHeader>
  <ModalBody>
    <div className="text-center">
      <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
      <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
        Are you sure you want to delete your account?
      </h3>
    </div>
  </ModalBody>
  <ModalFooter className="flex justify-center">
    <Button color="failure" onClick={handleDeleteUser}>
      Yes, I'm sure
    </Button>
    <Button color="gray" onClick={() => setShowModal(false)}>
      No, cancel
    </Button>
  </ModalFooter>
</Modal>

    </div>
  )
}
