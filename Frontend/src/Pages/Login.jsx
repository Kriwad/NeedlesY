import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye , faEyeSlash} from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/api/token/", { username, password });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

      const useRes = await api.get(`api/user/current/` , {headers: {Authorization: `Bearer ${res.data.access}`}} )
      localStorage.setItem("user_id" ,useRes.data.id )
      localStorage.setItem("username" ,useRes.data.username )
      navigate("/");
    } catch (error) {
      if (error.response && error.status === 401) {
        setError("Invalid Username or password, Please try again");
      } else if (error.response && error.status === 400) {
        setError("Please enter a valid Username and password");
      } else {
        setError("Something went wrong , Please try again later");
      }
      alert("login failed. Please check your credentials. ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-white-100 w-screen ">
        <div className="  bg-white-200 w-[400px] h-[470px] rounded-lg shadow-2xl ">
          <h1 className="ml-5 mt-7 mb-[9px] font-bold text-3xl text-black">
            Sign in{" "}
          </h1>
          <span className="ml-5 m-0  font-medium ">To the Point</span>

          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-start flex-col mb-4">
              <input
                className="p-3 mt-10 mb-0 w-[80%] border-2 border-solid border-black rounded-md active:bg-slate-100 hover:bg-slate-100 "
                type="text"
                placeholder="Username or Phone"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            {error && (
              <div className=" ml-10 mb-2 text-red-600 font-bold">{error}</div>
            )}

            <div className="flex items-center justify-center flex-col mb-4">
              <div className="relative w-[80%]">
                <input
                  className="p-3 mt-4 w-full border-2 border-solid border-black rounded-md active:bg-slate-100 hover:bg-slate-100 pr-14"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[60%] translate-y-[-50%] text-sm font-semibold bg-transparent text-gray-600"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye :faEyeSlash} size="m"/>
                </button>
              </div>
              </div>

            <div className="flex justify-center mt-[40px] ">
              <button
                className=" rounded-3xl  w-[320px] p-3 bg-blue-500 border-none text-white hover:bg-blue-600 hover:text-white active:bg-blue-700 "
                type="submit"
              >
                Login
              </button>
            </div>

            <div className=" flex  mt-[20px] justify-center items-center  ">
              <h1>New to Needles?</h1>
              <Link
                className="underline font-bold text-blue-600 hover:text-blue-500"
                to="/register"
              >
                <button className="hover:bg-blue-200 p-1 rounded-3xl">
                  Join now
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
