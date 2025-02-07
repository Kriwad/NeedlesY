import React from 'react'
import { useState, useEffect } from 'react'
import api from '../api'
import { useParams, useNavigate } from 'react-router-dom'
import { parseISO } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modals/Modal';

import { formatDistanceToNow, set } from 'date-fns';

function Profile() {

  const { userId } = useParams()
  const [user , setUser] = useState(null)
  const [todo , setTodos] = useState(null)
  const [Search, setSearch] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e)=>[
    pass
  ]

  const handleOpenModal = (e)=>{
    pass
  }

  const handleLogout = (e)=>{
    pass
  }


  const fetchUser = async (e)=>{
    try{
      const response = await api.get(`api/user/profile/${userId}/`)
      console.log(response.data)
      console.log(response.data[0])
      setUser(response.data[0])
      
      
      

      
    }catch(error){
      console.log("error:" , error)
    }
  }

  const fetchtodos = async (e)=>{

    try{
      const response = await api.get(`api/user/profile/${userId}/`)
      
     
      setTodos(response.data)
      
    }catch(error){
      console.log("error: ",error)}
  }

  useEffect(()=>{
    fetchtodos()
    fetchUser()
  },[userId])

  return (
    <div>
      <>
        <nav className="flex-1 bg-slate-400 py-4">
              
              <div className="flex items-center justify-between mx-6 ">
                {/* Left Side: ToDoList Text */}
                <div className="flex-shrink-0">
                  <button className="text-xl cursor font-semibold" onClick={()=> navigate("/")} >ToDoList</button>
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
                    <FontAwesomeIcon icon={faPlus} size="sm" />
                  </button>
                  
        
                </div>
        
                <div>
                  {user ? <span className=" mr-10  text-m font-thin " >{user.user.username}</span> :  <span className="mr-10 text-sm font-thin ">Welcome, user</span> }
                </div>
                
        
                {/*Logout Button */}
                <div>
                  <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>
                </div>
              </div>
            </nav>
      
      </>
    </div>
  )
}

export default Profile