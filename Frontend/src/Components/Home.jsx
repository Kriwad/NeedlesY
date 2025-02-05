import React, { useEffect } from 'react'

import { useState } from 'react'
import api from '../api'
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modals/Modal';

import { formatDistanceToNow, set } from 'date-fns';
import { ACCESS_TOKEN } from '../constants';



function Home() {
  
  const [ModalOpen ,setModalOpen] = useState(false)
  const [user , setUser] = useState(null)
  const [editModal , setEditModal] = useState(false)
  const [deleteModal , setDeleteModal] = useState(false)
  const [selectTodo , setSelectTodo] = useState(null)
  const [Search , setSearch] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    goal : ""
  })
  const [openMenuId, setOpenMenuId] = useState(null)
  const [todos, setTodos] = useState([])
  const navigate = useNavigate()

  const resetForm = () => {
    setFormData({
      title: "",
      goal : ""
    })
    setSelectTodo(null)
  }

  const handleOpenUd = (todoId)=> {
    setOpenMenuId(prevId => prevId === todoId ? null : todoId)
    
  }
  const handleCloseUd = (e)=> {
    setOpenMenuId(null)

  }
  const handleOpenModal = ()=> {
    resetForm()
    setModalOpen(true);
  }
  const handleCloseModel = () => {
    resetForm()
    setModalOpen(false);
  }

  const handleEditOpenModal = (todo)=> {
    
    setEditModal(true);
    setOpenMenuId(null)
    setSelectTodo(todo);
    setFormData({
      title : todo.title,
      goal : todo.goal
    })

  }
  const handleEditCloseModel = () => {
    resetForm()
    setEditModal(false);
  }

  const handleDeleteOpenModal = (todo)=>{
    setDeleteModal(true)
    setOpenMenuId(null)
    setSelectTodo(todo);
    setFormData({
      title : todo.title,
      goal : todo.goal
    })

  }

  const handleDeleteCloseModal = () => {
    setDeleteModal(false)
  }
    


  const handleSearch= (e)=> {
    setSearch(e.target.value)
  }
  const handleLogout= (e)=> {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    navigate("/login/")
  }
  
  // needs to be explained
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  

  const handleSubmit = async (e)=> {
    e.preventDefault();
    try{
      await api.post("/api/user/todo/" ,formData);
      await fetchTodos()
      handleCloseModel()
    } catch(error){
        console.log("error")
    } 
  }

  const handleEdit= async (e)=>{
    if (!selectTodo) return
    e.preventDefault();
    try{
      await api.put(`/api/user/todo/edit/${selectTodo.id}/` , formData);
      await fetchTodos()
      handleEditCloseModel()
    }catch(error){
      console.log("error")
    }
    
  }

  const handleDelete = async (e)=>{
    if (!selectTodo) return 
    e.preventDefault()
    try{
      await api.delete(`/api/user/todo/edit/${selectTodo.id}/` , formData);
      await fetchTodos()
      handleDeleteCloseModal()
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=> {
    fetchTodos();
    fetchUser();
  }, [])

  const fetchUser= async (e)=>{
    try {
      const user = await api.get("/api/user/current/")
      setUser(user.data)
      console.log(user.data)
    }catch(error){
      console.log(error)
    }
   
    
  }
  
  const fetchTodos= async (e)=> {
    
    try{
      const response = await api.get("/api/user/todo/list/");
      setTodos(response.data)
      console.log(response.data)
    }catch(error){
      console.log("Problem fetching your data:" ,error)
    }
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
            <FontAwesomeIcon icon={faPlus} size="m" />
          </button>
          

        </div>

        <div>
          {user ? <button className=" mr-10 underline text-m font-thin " onClick={()=> navigate(`profile/${user.id}`)} >Welcome,{user.username}</button> :  <span className="mr-10 text-sm font-thin ">Welcome, user</span> }
        </div>
        

        {/*Logout Button */}
        <div>
          <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>
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
                    src={todo.user.image || 'https://via.placeholder.com/40'}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div className="flex-1">

                    {/* User Name and Timestamp */}
                    <div className="flex items-center justify-between">
                      <button className="font-semibold" onClick={()=> navigate(`profile/${todo.user.id}`)} >
                        
                          {todo.user.username}
                      </button>
                      <span className="flex text-sm text-gray-500z">

                        {todo.created_at && formatDistanceToNow(new Date(todo.created_at), { addSuffix: true })}
                        {
                          (user && user.username === todo.user.username) ? (
                            <>  
                              <div className = " flex relative ml-2 ">
                                <button onClick={() => handleOpenUd(todo.id)}  className=" ml-10 text-gray-500 hover:text-gray-700">
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </button>

                                {openMenuId === todo.id && (
                                  <div className=' absolute ml-12 mt-8 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10' >

                                    <button onClick={()=>{
                                      handleEditOpenModal(todo);

                                      handleCloseUd();}} 
                                      className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center">
                                        <FontAwesomeIcon icon={faEdit} className="mr-2" />
                                        Edit
                                    </button>

                                    <button onClick={()=> {
                                      handleDeleteOpenModal(todo);
                                      handleCloseUd()}}
                                      className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 rounded-lg">
                                        <FontAwesomeIcon icon={faTrash} className="mr-2" />
                                        Delete
                                    </button>
                                  </div>
                              )}

                              </div>           
                            </>
                            ) : null                                   
                        }
                        
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
        formData={formData}
        handleInputChange={handleInputChange}
        modalType="edit" 
        
      />

      
      <Modal 
        isOpen={editModal}
        isClosed={handleEditCloseModel}
        onSubmit={handleEdit}
        title="Edit Todo"
        submitText="Update Todo"
        formData={formData}
        handleInputChange={handleInputChange}
        modalType="edit" 
      />

      <Modal 
        isOpen={deleteModal}
        isClosed={handleDeleteCloseModal}
        onSubmit={handleDelete}
        title="Delete Todo"
        submitText="Remove Todo"
        formData={formData}
        handleInputChange={handleInputChange}
        readOnly = {true}
        modalType="delete" 
      />
  </>
    
  )
}

export default Home