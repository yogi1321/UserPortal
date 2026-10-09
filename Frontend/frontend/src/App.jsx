import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Login from './components/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserTable from './components/UserTable'

import RegisterForm from './components/RegisterForm'
import ProtectedRoute from './components/ProtectedRoute'

function App() {


  return (
    <>



        <BrowserRouter>

            <Routes>

               
                <Route path="/" element={<Login />} />

               
                <Route
                    path="/register"
                    element={<RegisterForm />}
                />

             
                <Route
                    path="/user"  element={
                        <ProtectedRoute>
                            <UserTable />
                        </ProtectedRoute>
                    }
                /> 
               

            </Routes>

        </BrowserRouter>




 
    </>
  )
}

export default App
