import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const Login = ()=> {
  const [username , setUserName] = useState("")
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error , setError] = useState()

  const handleSubmit= async (e) => {
    e.preventDefault();
    setLoading(true)
    setError("");
    try{
      const res = await api.post("/api/token/" , {username , password})
      localStorage.setItem(ACCESS_TOKEN , res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      navigate("/")
    } catch(error){
      if (error.response && error.status === 401){
        setError("Invalid Username or password, Please try again")
      }else if (error.response && error.status === 400){
        setError("Please enter a valid Username and password")
      }else{
        setError("Something went wrong , Please try again later")
      }
      alert("login failed. Please check your credentials. ")
    } finally{
      setLoading(false)
    }
   


  };

  return (
    <>
    <div className="flex items-center justify-center h-screen bg-gray-100 w-screen " >

      <div className="bg-red-200 w-96 p-8 border-2 border-black rounded-lg shadow-lg">
        <h2 className="p-5 text-x underline text-teal-600" >Please Login!</h2>

        
           
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 text-red-600 font-bold">{error}</div>
            )}
            <div className="flex items-center justify-start flex-col mb-4" >
  
              <label className="w-full font-bold" >
                Username
              </label>
              <input  className="rounded-md ml-2 w-48 p-1 " type="text" 
                value={username}
                onChange={(e)=> setUserName(e.target.value)}
                />
            </div>

            <div className="flex items-center justify-center flex-col mb-4" >
              <label className="w-full font-bold" >
                Password
              </label>
              <input className="rounded-md ml-2 w-48 p-1" type="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value) } />
            </div>

            <div className="flex justify-center mt-6 mb-5" >
                <button className="rounded-md py-1 px-3 border-solid border-black border-2 hover:bg-black hover:text-white hover:border-white-500" type="submit" 
                disabled = {loading}>
                  {loading ? 'Logging in..' : "Login"}
                </button>
            </div>

            <div>
              Don't have an account?
              <Link className="underline font-bold text-blue-600 hover:text-blue-500" to="/register" >
                Register here
              </Link>
            </div>
          </form>
        
      </div>
    </div>
    </>
  )
}
export default Login;