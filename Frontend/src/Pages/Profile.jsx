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
import Navbar from "../Modals/Navbar";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";

import { Heart, MessageCircle, Briefcase, MapPin } from "lucide-react";
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
  const [formData, setFormData] = useState({
    title: "",
    goal: "",
    image: null,
    video: null,
  });
  const [modal, setModal] = useState(false);
  const [selectTodo, setSelectTodo] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const resetForm = () => {
    setFormData({
      title: "",
      goal: "",
      image: null,
      video: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Handles Posting modal
  const handleModalOpen = () => {
    resetForm();
    setModal(true);
  };
  const handleCloseModal = () => {
    setModal(false);
    resetForm();
  };

  // handles edit modal
  const handleEditOpenModal = (todo) => {
    setEditModal(true);
    setSelectTodo(todo);

    setFormData({
      title: todo.title,
      goal: todo.goal,
    });
  };
  const handleDeleteOpenModal = (todo) => {
    resetForm();
    setDeleteModal(true);
    setSelectTodo(todo);
    setFormData({
      title: todo.title,
      goal: todo.goal,
    });
  };
  const handleDeleteCloseModal = () => {
    setDeleteModal(false);
    resetForm();
  };
  const handleEditCloseModal = () => {
    setEditModal(false);
    resetForm();
  };
  // handles edit
  const handleEdit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("goal", formData.goal);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }
    if (formData.video) {
      formDataToSend.append("video", formData.video);
    }

    try {
      await api.put(`/api/user/todo/edit/${selectTodo.id}/`, formDataToSend);
      await fetchtodos();
      handleEditCloseModal();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await api.delete(`/api/user/todo/edit/${selectTodo.id}/`, formData);
      await fetchtodos();
      handleDeleteCloseModal();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // fetches user
  const fetchUser = async () => {
    try {
      const response = await api.get(`api/user/profile/${userId}`);
      console.log(response.data);

      setUser(response.data);
    } catch (error) {
      console.log("error:", error);
    }
  };

  // fetch todos
  const fetchtodos = async () => {
    try {
      const response = await api.get(`api/user/profile/todos/${userId}`);
      console.log(response.data);
      setTodos(response.data);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("goal", formData.goal);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }
    if (formDataToSend.video) {
      formDataToSend.append("video", formData.video);
    }

    try {
      await api.post(`api/user/todo/`, formDataToSend);
      await fetchtodos();
      handleCloseModal();
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
  console.log(user, userId);

  return (
    <>
      <div className="w-1vh h-1vh bg-zinc-200">
        <Navbar onOpenModal={handleModalOpen} />
        {/* Profile Header */}
        <div className="container mx-auto mb-5 ">
          <Card className="w-full border-solid border-2  max-w-4xl mx-auto rounded-md mb-0 overflow-hidden">
            <div className="relative h-48 bg-gradient-to-r from-slate-300 to-slate-300">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                <Avatar className="w-32 h-32 border-4 border-white">
                  <AvatarImage
                    src={user?.image || "/placeholder.svg?height=128&width=128"}
                    alt={user?.username}
                  />
                  <AvatarFallback>
                    {user?.username?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            <CardContent className="pt-20 pb-8 px-8">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold">
                  {user?.fullName || user?.username}
                </h1>
                <p className="text-gray-600">
                  {user?.headline || "No headline provided"}
                </p>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-gray-500" />
                  <span>{user?.jobTitle || "No job title provided"}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                  <span>{user?.location || "No location provided"}</span>
                </div>
              </div>
              <p className="text-center max-w-2xl mx-auto">
                {user?.bio || "No bio provided"}
              </p>
              {user &&
                user.id &&
                user.id.toString() === localStorage.getItem("user_id") && (
                  <div className="mt-6 text-center">
                    <Button
                      onClick={() => {
                        /* Add functionality to edit profile */
                      }}
                      className="bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                    >
                      Edit Profile
                    </Button>
                  </div>
                )}
            </CardContent>
          </Card>
        </div>

        <div className="container mx-auto  ">
          {todos.length === 0 ? (
            <p className="text-center text-gray-500">No todos found.</p>
          ) : (
            todos.map((todo) => (
              <div key={todo.id} className=" rounded-lg  transition-shadow">
                <div className="container flex justify-center  border-solid mx-auto">
                  <Card
                    key={todo.id}
                    className="w-full border-solid border-2  max-w-4xl mx-auto rounded-md overflow-hidden mb-2 "
                  >
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
                          <AvatarFallback>
                            {todo.user.username[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <p className="text-sm p-0 font-bold ">
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
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="mr-2"
                              />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </CardHeader>
                    <CardContent className="pb-4">
                      <h3 className="text-lg font-semibold mt-2">
                        {todo.title}
                      </h3>
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
          isClosed={handleCloseModal}
          onSubmit={handleSubmit}
          title="Create a New Needle"
          submitText="Upload"
          formData={formData}
          handleInputChange={handleInputChange}
          modalType="submit"
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

        <Modal
          isOpen={deleteModal}
          onSubmit={handleDelete}
          isClosed={handleDeleteCloseModal}
          title="Delete Needle"
          submitText="Discard"
          formData={formData}
          handleInputChange={handleInputChange}
          readOnly={true}
          modalType="delete"
        />
      </div>
    </>
  );
}

export default Profile;
