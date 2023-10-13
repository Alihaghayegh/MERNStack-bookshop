import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSnackBar } from 'notistack';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

function DeleteBook() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const { enqueueSnackBar } = useSnackBar()

  const handDeleteBook = () => {
    setLoading(true)
    axios
    .delete(`http://localhost:5555/books/${id}`)
    .then(() => {
      setLoading(false)
      enqueueSnackBar("Book Deleted Successfully", {variant: 'success'})
      navigate('/')
    }).catch((error) => {
      console.log(error)
      setLoading(false)
      enqueueSnackBar("Error", {variant: "error"})
      // alert('An error happened, Please check console')
    })
  }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
        <button
        className='p-4 bg-red-600 text-white m-8 w-full'
        onClick={handDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteBook