import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider, createBrowserRouter, createRoutesFromElements , Route, Navigate} from 'react-router-dom'

import Login from './Components/Login.jsx'
import RegisterAndLogout from './Components/RegisterAndLogout.jsx'
import ProtectedRoute from './Components/ProtectedRoutes.jsx'
import Home from './Components/Home.jsx'

function Logout(){
  localStorage.clear()
  return <Navigate to = "/login/"  />
 }


const router = createBrowserRouter(
  createRoutesFromElements(
   <>
  
   <Route path = "/" element = {<ProtectedRoute>
       <Home />
    </ProtectedRoute>}/>
    
    <Route path="login/" element={<Login />} /> 
    <Route path="logout/" element={<Logout />} /> 
    <Route path="register/" element={<RegisterAndLogout />} />
    
    
    
   </> 
    
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
