import React from 'react'

import { useState } from 'react'
import api from '../api'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPlus } from '@fortawesome/free-solid-svg-icons'



function Home() {
  
  const [ModalOpen ,setModalOpen] = useState(false)
  const [Search , setSearch] = useState("")
  const [title , setTitle] = useState("")
  const [goal , setGoal] = useState("")

  const handleOpenModal = ()=> {
    setModalOpen(true);
  }
  const handleCloseModel = () => {
    setModalOpen(false);
  }

  const handleSearch= (e)=> {
    setSearch(e.target.value)
  }
  
  const handleTitle = (e)=> {
    setTitle(e.target.value)
  }

  const handleTodo= (e) => {
  setGoal(e.target.value)
}
  const handleSubmit = async (e)=> {
    e.preventDefault();
    try{
      const res = await api.post("/api/user/todo/" , {title , goal})
      console.log(res)
    } catch(error){
        console.log("error")
    } 
    setModalOpen(false)
    setTitle("")
    setTodo("")
   }
  return (
    
  <>
    <nav className="flex-1 bg-slate-400 py-4">
      <div className="flex items-center justify-between mx-6 ">
        {/* Left Side: ToDoList Text */}
        <div className="flex-shrink-0">
          <span className="text-xl font-semibold">ToDoList</span>
        </div>

        {/* Center: Input Field */}
        <div className="flex-1 ml-20 mr-10">
          <input
            type="text"
            placeholder="Search User"
            value={Search}
            onChange={handleSearch}
            className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />


        </div>

        {/* Right Side: Add Button */}
        <div className="flex-shrink-0 mr-10">
          <button className="w-10 h-10 bg-blue-500 text-white rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleOpenModal}
          >
            <FontAwesomeIcon icon={faPlus} size="1.5x" />
          </button>
          {ModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Create a New ToDo</h2>
                  <button
                    onClick={handleCloseModel}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                </div>

                {/* Modal Form */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="postTitle"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="postTitle"
                      value={title}
                      onChange={handleTitle}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="postContent"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Content
                    </label>
                    <textarea
                      id="postToDo"
                      value={goal}
                      onChange={handleTodo}
                      rows="4"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"

                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              
              </div>
            </div>)}

        </div>
      </div>
    </nav>
    
  </>
    
  )
}

export default Home