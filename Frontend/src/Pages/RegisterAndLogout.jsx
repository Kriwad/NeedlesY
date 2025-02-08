import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye , faEyeSlash} from "@fortawesome/free-solid-svg-icons";



export default function RegisterAndLogout(){

  const [data , setData] = useState({
    username : "",
    
    password : "",
  })
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showPassword , setShowPassword] = useState(false)
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
      
      if (error.response && error.response.data) {
       
        setError(error.response.data.message || "Registration failed.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }


  }
  
  
  return(
    <>
      <div className="flex items-center justify-center h-screen bg-white-100 w-screen " >
        <div className="bg-white-200 w-[400px] h-[450px] rounded-lg shadow-2xl"> 
          <h1 className="ml-5 mt-7 mb-[9px] font-bold text-3xl text-black" >Sign Up</h1>

          <form onSubmit={handleSubmit}>

            <div className="flex items-center justify-start flex-col mb-4 " >
              
              <input className="p-3 mt-10 mb-0 w-[80%] border-2 border-solid border-black rounded-md active:bg-slate-100 hover:bg-slate-100" type="text" placeholder="Username"
                value={data.username}
                onChange={(e)=> setData({...data, username: e.target.value})} />
            </div>

            
            
            <div className="flex items-center justify-center flex-col mb-4  ">
              <div className="relative w-[80%]">

                <input className="p-3 mt-4 w-full border-2 border-solid border-black rounded-md active:bg-slate-100 hover:bg-slate-100 pr-14 " type= {showPassword ? "text": "password"} placeholder="Password" 
                value={data.password}
                onChange={(e)=> setData({...data, password: e.target.value})}/>
                <button className="absolute right-3 top-[60%] translate-y-[-50%] text-sm font-semibold bg-transparent text-gray-600" type = "button" onClick={()=> setShowPassword(!showPassword)} >
                  <FontAwesomeIcon icon={showPassword ? faEye :  faEyeSlash } />
                </button>
              </div>      
            </div>
            
            <div>
              {loading && <p className= "text-center mb-[10px] text-blue-500">Processing...</p>}
              {success && <p className="text-center mb-[10px] text-green-500">{success}</p>}
              {error && <p className="text-center mb-[10px] text-red-500">{error}</p>}
            </div>
            
            
            <div  className="flex justify-center mt-[20px] mb-5" >
              
                <button className="rounded-3xl  w-[320px] p-3 bg-blue-500 border-none text-white hover:bg-blue-600 hover:text-white active:bg-blue-700 "  type="submit" >Register</button>
              
              
            </div>

            <div className="flex items-center mt-[27px] justify-center ">
              <h1>Already have an account? </h1>
              <button className="hover:bg-blue-200 p-1 rounded-3xl text-blue-600 hover:text-blue-500 underline font-bold"
                onClick={() => navigate("/login")}
                
              >
                Login here
              </button>
            </div>
          </form>
         

        </div>
        
      </div>
    </>
  )
}
