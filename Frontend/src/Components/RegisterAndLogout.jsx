import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";




export default function RegisterAndLogout(){

  const [data , setData] = useState({
    username : "",
    
    password : "",
  })
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  

  const handleSubmit = async (e)=> {
    e.preventDefault()
    setLoading(true);
    setError("")
    setSuccess("")
    try{
      console.log("Sending data to API:", data);
      await api.post('api/user/register/' , {username : data.username ,
      password : data.password,})

     
      setSuccess("Registration successful! Please proceed to login.");
      setTimeout(() => navigate("/login"), 2000);

    }catch (error) {
      
      if (err.response && err.response.data) {
       
        setError(err.response.data.message || "Registration failed.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }


  }
  
  
  return(
    <>
      <div className="flex items-center flex-col justify-center absolute h-screen w-screen top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold " >

        <h1 className="mb-7 font-bold underline" >Please Register Here</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>

          <div className="flex flex-col mb-4 " >
            <label >
              Username
            </label>
            <input className="border-solid border-black border-2 p-1 rounded-md " type="text" placeholder="Username"
              value={data.username}
              onChange={(e)=> setData({...data, username: e.target.value})} />
          </div>

          
          
          <div className="flex flex-col mb-4 ">
            <label >
              Password : 
              
            </label>
            <input className="border-solid border-black border-2 p-1 rounded-md " type="password" placeholder="Password" 
              value={data.Password}
              onChange={(e)=> setData({...data, password: e.target.value})}/>
          </div>
          
          {loading && <p className="text-blue-500">Processing...</p>}
          {success && <p className="text-green-500">{success}</p>}
          {error && <p className="text-red-500">{error}</p>}
          
          <div>
            
              <button className="rounded-md py-1 px-3 border-solid border-black border-2 hover:bg-black hover:text-white hover:border-white-500"  type="submit" >Register</button>
            
            
          </div>
          
        </form>
        <p className="mt-4">
        Already have an account?{" "}
        <button
          onClick={() => navigate("/login")}
          className="underline text-blue-600 hover:text-blue-500"
        >
          Login here
        </button>
      </p>
      </div>
    </>
  )
}
