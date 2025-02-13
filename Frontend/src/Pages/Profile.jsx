import React from "react";
import { useState, useEffect } from "react";
import api from "../api";
import { useParams, useNavigate, Form } from "react-router-dom";
import { parseISO } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";

import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown";
import Modal from "../Modals/Modal";

import { formatDistanceToNow, set } from "date-fns";

function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  
  const [todos, setTodos] = useState([]);
  const [formData , setFormData] = useState({
    title : "",
    goal : "",
    image : null,
    video : null
  })
  const [modal , setModal] = useState(false)
  const [selectTodo , setSelectTodo] = useState("")
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const resetForm = (e) => {
    setFormData({
      title : "",
      goal : "",
      image : null,
      video : null
    })
  }

  const handleInputChange = (e)=> {
    const { name , value , type , files } = e.target;
    if (type === "file") {
      setFormData((prev)=> ({
        ...prev , 
        [name] : files[0],
      }))
    }else{
      setFormData((prev)=> ({
        ...prev , 
        [name] : value
      }))
    }
  }

  const handleSearch = (e) => {
   setSearch(e.target.value)
  };

// Handles Posting modal
  const handleModalOpen = (e) => {
    resetForm()
    setModal(true)
  };
  const handleCloseModal = (e)=> {
    setModal(false)
    resetForm()
  }

  // handles edit modal 
  const handleEditOpenModal = (todo)=> {
    
    setEditModal(true)
    setSelectTodo(todo)
    setFormData({
      title : todo.title,
      goal : todo.goal
    })
  }
  const handleEditCloseModal = (todo)=> {
    setEditModal(false)
    resetForm()
  }
  // handles edit
  const handleEdit= async (e)=>{
    
    e.preventDefault()
    const formDataToSend = new FormData();
    formDataToSend.append("title" , formData.title)
    formDataToSend.append("goal" , formData.goal)
    if (formData.image ) {
      formDataToSend.append("image", formData.image)
    }
    if (formData.video) {
      formDataToSend.append("video" , formData.video)
    }

    try {
      await api.put(`/api/user/todo/edit/${selectTodo.id}/`, formDataToSend)
      await fetchtodos()
      handleEditCloseModal()
    }catch(error){
      console.log("error: " , error)
    }
  }

  // handles logout
  const handleLogout = (e) => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };


// fetches user
  const fetchUser = async (e) => {
    try {
      const response = await api.get(`api/user/current/`);
      console.log(response.data);

      setUser(response.data);
    } catch (error) {
      console.log("error:", error);
    }
  };

  // fetch todos
  const fetchtodos = async (e) => {
    try {
      const response = await api.get(`api/user/profile/todos/${userId}`);
      console.log(response.data);
      setTodos(response.data);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    fetchtodos();
    fetchUser();
    console.log("user", user);
    console.log("userId from URL", userId);
  }, [userId]);
  console.log(user , userId)


  return (
    <>
      <nav className=" mb-0 bg-black  py-4 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span
                onClick={() => {
                  navigate("/");
                }}
                className="text-2xl font-bold text-white hover:cursor-pointer"
              >
                NeedlesY
              </span>
            </div>

            {/* Search Bar */}
            <div className="flex-grow mx-8 max-w-xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={search}
                  onChange={handleSearch}
                  className="w-full px-4 py-2 rounded-full bg-white bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:bg-opacity-30 transition duration-300"
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white opacity-70"
                />
              </div>
            </div>
            
            {/* User Actions */}
            
              
            
            <div className="flex items-center  space-x-6">
              {/* Add Button */}
              {user && user.id && user.id.toString() === userId && (
                <button onClick={()=> handleModalOpen()} className="w-10 h-10 bg-white bg-opacity-20 text-white rounded-full hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-white transition duration-300 transform hover:scale-110">
                <FontAwesomeIcon icon={faPlus} size="lg" />
                </button>
                )}
                
            
          
            

              {/* User Profile */}
              {user ? (
                <div className="flex items-center space-x-1">
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage
                      src={user || "/placeholder.svg?height=32&width=32"}
                      alt={user.username}
                    />
                    <AvatarFallback>{user.username[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-white hover:underline cursor-pointer">
                    {user.username}
                  </span>
                </div>
              ) : (
                <span className="text-white opacity-70">Guest</span>
              )}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-white text-black font-semibold py-2 px-4 rounded-full hover:bg-blue-100 transition duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container border-solid border-2 mx-auto max-w-2xl my-auto ">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No todos found.</p>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className=" rounded-lg  transition-shadow">
              <div className="container flex justify-center  border-solid mx-auto">
                <Card key={todo.id} className="mb-1 mt-0 w-full max-w-[90vw]">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center gap-2 ">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={
                            todo.user.image ||
                            "/placeholder.svg? height=40&width=40"
                          }
                          alt={todo.user.username}
                        />
                        <AvatarFallback>{todo.user.username[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p
                          className="text-sm p-0 font-bold "
                          
                        >
                          {todo.user.username}
                        </p>
                        <p className="text-xs text-center font-extralight text-muted-foreground">
                          {todo.created_at &&
                            formatDistanceToNow(new Date(todo.created_at), {
                              addSuffix: true,
                            })}
                        </p>
                      </div>
                    </div>
                    {user && user.username === todo.user.username && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="h-8 w-8">
                            <FontAwesomeIcon
                              icon={faEllipsisV}
                              className="h-4 w-4"
                            />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleEditOpenModal(todo)}
                          >
                            <FontAwesomeIcon icon={faEdit} className="mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteOpenModal(todo)}
                            className="text-red-600"
                          >
                            <FontAwesomeIcon icon={faTrash} className="mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </CardHeader>
                  <CardContent className="pb-4">
                    <h3 className="text-lg font-semibold mt-2">{todo.title}</h3>
                    <p className="text-sm w-[95%] text-muted-foreground whitespace-pre-wrap mt-1 break-words">
                      {todo.goal}
                    </p>
                    {todo.image && (
                      <img
                        src={todo.image}
                        onClick={() => handleImageClick(todo.image)}
                        className="mt-2 w-full rounded-lg"
                        alt=""
                      />
                    )}
                    {todo.video && (
                      <video controls className="mt-2 w-full rounded-lg">
                        <source src={todo.video} type="video/mp4" />
                        Your browser does not support the video tag
                      </video>
                    )}
                    <div className="mt-4 flex justify-end gap-2">
                      <button className="text-primary">
                        <Heart className="mr-5 h-4 w-4" />
                      </button>
                      <button
                        variant="ghost"
                        size="sm"
                        className="text-primary"
                      >
                        <MessageCircle className="mr-5 h-4 w-4" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))
        )}
      </div>


      <Modal
          isOpen={modal}
          // isClosed={handleCloseModel}
          // onSubmit={handleSubmit}
          title="Create a New Needle"
          submitText="Upload"
          formData={formData}
          handleInputChange={handleInputChange}
          modalType="edit"
        />

        <Modal
          isOpen={editModal}
          isClosed={handleEditCloseModal}
          onSubmit={handleEdit}
          title="Edit Needle"
          submitText="Update"
          formData={formData}
          handleInputChange={handleInputChange}
          modalType="edit"
        />

        {/* <Modal
          isOpen={deleteModal}
          onSubmit={handleDelete}
          isClosed={handleDeleteCloseModal}
          title="Delete Needle"
          submitText="Discard"
          formData={formData}
          handleInputChange={handleInputChange}
          readOnly={true}
          modalType="delete"
        /> */}
    </>
  );
}

export default Profile;
