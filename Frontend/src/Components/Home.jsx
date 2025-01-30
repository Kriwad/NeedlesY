import React, { useEffect } from 'react'

import { useState } from 'react'
import api from '../api'
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { ACCESS_TOKEN } from '../constants';



function Home() {
  
  const [ModalOpen ,setModalOpen] = useState(false)

  const [editModal , setEditModal] = useState(false)
  const [selectTodo , setSelectTodo] = useState(null)
  const [Search , setSearch] = useState("")
  const [title , setTitle] = useState("")
  const [goal , setGoal] = useState("")
  const [todos, setTodos] = useState([])
  const navigate = useNavigate()

  const handleOpenModal = ()=> {
    setModalOpen(true);
  }
  const handleCloseModel = () => {
    setModalOpen(false);
  }

  const handleEditOpenModal = (todo)=> {
    setEditModal(true);
    setSelectTodo(todo);
    setTitle(todo.title)
    setGoal(todo.goal)

  }
  const handleEditCloseModel = () => {
    setEditModal(false);
  }

  const handleSearch= (e)=> {
    setSearch(e.target.value)
  }
  const handleLogout= (e)=> {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    navigate("/login/")
  }
  
  const handleTitle = (e)=> {
    setTitle(e.target.value)
  }
  const handleGoal = (e)=> {
    setGoal(e.target.value)
  }

  const handleSubmit = async (e)=> {
    e.preventDefault();
    try{
      await api.post("/api/user/todo/" , {title , goal});
      await fetchTodos()
    } catch(error){
        console.log("error")
    } 
    setModalOpen(false)
    setTitle("")
    setGoal("")
  }

  const handleEdit= async (e)=>{
    try{
      await api.put(`/api/user/todo/edit/${selectTodo.id}` , {title , goal});
      await fetchTodos()
    }catch(error){
      console.log("error")
    }
    
  }

  useEffect(()=> {
    fetchTodos();
  }, [])
  
  const fetchTodos= async (e)=> {
    
    try{
      const response = await api.get("/api/user/todo/list/");
      setTodos(response.data)
    }catch(error){
      console.log("Problem fetching your data:" ,error)
    }
  }

  const Modal = ({isOpen , isClosed , onSubmit , title: modalTitle, submitText})=>{
    if (!isOpen) return null
    return (
     
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{modalTitle}</h2>
              <button
                onClick={isClosed}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={onSubmit}>
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
                  
                  className="block text-sm font-medium text-gray-700"
                >
                  Goals
                </label>
                <textarea
                  id="postToDo"
                  value={goal}
                  onChange={handleGoal}
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
                  {submitText}
                </button>
              </div>
            </form>
          
          </div>
        </div>
    )
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
          

        </div>

        {/*Logout Button */}
        <div>
          <button onClick={handleLogout} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>
        </div>
      </div>
    </nav>
    
    
    {/* Todo List Display */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {todos.length === 0 ? (
            <p className="text-center text-gray-500">No todos found. Add one!</p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="bg-white p-6 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow">
                  
                <div className="flex items-start">
                  {/* User Profile Picture */}
                  <img
                    src={todo.user.profile_picture || 'https://via.placeholder.com/40'}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div className="flex-1">

                    {/* User Name and Timestamp */}
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{todo.user.username}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(todo.created_at).toLocaleString()}
                        <button
                          onClick={handleEditOpenModal}
                          className=" ml-10 text-gray-500 hover:text-gray-700"
                        >
                          <FontAwesomeIcon icon={faEllipsisV} />
                        </button>
                      </span>                    
                    </div>

                    {/* Todo Title and Goal */}
                    <h3 className="text-lg font-semibold mt-2">{todo.title}</h3>
                    <p className="text-gray-600 whitespace-pre-wrap mt-1">{todo.goal}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Modal 
        isOpen={ModalOpen}
        isClosed={handleCloseModel}
        onSubmit={handleSubmit}
        title="Create a New Todo"
        submitText="Add Todo"
      />

      <Modal 
        isOpen={editModal}
        isClosed={handleEditCloseModel}
        onSubmit={handleEdit}
        title="Edit Todo"
        submitText="Update Todo"
      />
  </>
    
  )
}

export default Home