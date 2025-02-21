'use client';

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocation } from 'react-router-dom';

const Navbar = ({ onOpenModal }) => {
  const { userId } = useParams()
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation()
  const isProfilePage =  userId ? location.pathname === `/profile/${userId}` : false;

  const handleSearch = (e) => {
    setSearch(e.target.value);
   
  };
  const [userData , setUserData] = useState({
    username:"",
    fullname : "",
    id : "" , 
 
  })
  
  useEffect(()=> {
    const storedFullname = localStorage.getItem("fullname")
    const storedUsername = localStorage.getItem("username")
    const storedID = localStorage.getItem("user_id")
   
    if (storedFullname && storedID && storedUsername){
      setUserData({fullname : storedFullname , id: storedID  , username : storedUsername})
    

  }},[])

  useEffect(() => {
    console.log("Updated userData:", userData);
  }, [userData]);
  
  const handleLogout = (e) => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
    localStorage.removeItem("fullname");
    localStorage.removeItem("user_id");
    navigate("/login/");
  };

  return (
    <nav className=" mb-0 bg-black  py-4 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span onClick={()=>navigate('/')} className="text-2xl font-bold text-white">NeedlesY</span>
            
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
              <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white opacity-70" />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center  space-x-6">
            {/* Add Button */}
            <button
              onClick={onOpenModal}
              className="w-10 h-10 bg-white bg-opacity-20 text-white rounded-full hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-white transition duration-300 transform hover:scale-110"
            >
              <FontAwesomeIcon icon={faPlus} size="lg" />
            </button>

            {/* User Profile */}
            {userData ? (
              <div className="flex items-center space-x-1">
                <Avatar className="h-8 w-8 cursor-pointer" onClick={() =>  {if (!isProfilePage) {navigate(`profile/${userData.id}`)}}}>
                  <AvatarImage src={userData.image || "/placeholder.svg?height=32&width=32"} alt={userData.fullname} />
                  <AvatarFallback>{userData.fullname[0]}</AvatarFallback>
                </Avatar>
                <span className="text-white hover:underline cursor-pointer" onClick={() => {if (!isProfilePage) {navigate(`profile/${userData.id}`)}}}>
                  {userData.username}
                </span>
              </div>
            ) : (
              <span className="text-white opacity-70"></span>
            )}

            {/* Logout Button */}
            <button
              onClick={()=> handleLogout()}
              className="bg-white text-black font-semibold py-2 px-4 rounded-full hover:bg-blue-100 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
